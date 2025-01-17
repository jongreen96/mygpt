import { ModelSettingsType } from '@/lib/ai-models';
import { auth } from '@/lib/auth';
import { createConversation, saveMessages } from '@/lib/db';
import { openai } from '@ai-sdk/openai';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { createDataStreamResponse, Message, streamText } from 'ai';

export const maxDuration = 600;

const client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID!}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_KEY!,
  },
  requestChecksumCalculation: 'WHEN_REQUIRED',
});

export async function POST(req: Request) {
  // eslint-disable-next-line prefer-const
  let { messages, conversationId, modelSettings } = (await req.json()) as {
    messages: Message[];
    conversationId: string;
    modelSettings: ModelSettingsType;
  };

  const session = await auth();
  if (typeof session?.user?.id === 'undefined') return;

  if (!conversationId)
    conversationId = await createConversation({
      userId: session?.user?.id,
      messages,
      modelSettings,
    });

  // Save attachments to Cloudflare
  const lastMessage = messages[messages.length - 1];
  if (lastMessage?.experimental_attachments) {
    for (const [
      index,
      attachment,
    ] of lastMessage.experimental_attachments.entries()) {
      const command = new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_BUCKET_NAME!,
        Key: `${conversationId}/${attachment.name}`,
        ContentType: attachment.contentType,
        Body: Buffer.from(attachment.url.split(',')[1], 'base64'),
      });

      await client.send(command);

      messages[messages.length - 1].experimental_attachments![index].url =
        `${process.env.CLOUDFLARE_DEV_URL!}/${conversationId}/${attachment.name}`;
    }
  }

  return createDataStreamResponse({
    execute: (dataStream) => {
      const result = streamText({
        model: openai(modelSettings.model) || openai('gpt-4o-mini'),
        maxTokens: modelSettings.maxTokens || undefined,
        temperature: Math.max(0, Math.min(2, modelSettings.temperature)) || 1,
        topP: Math.max(0, Math.min(1, modelSettings.topP)) || 0,
        presencePenalty:
          Math.max(-2, Math.min(2, modelSettings.presencePenalty)) || 0,
        frequencyPenalty:
          Math.max(-2, Math.min(2, modelSettings.frequencyPenalty)) || 0,

        messages,
        onFinish({ text, usage }) {
          dataStream.writeMessageAnnotation({
            conversationId,
          });

          saveMessages({
            conversationId,
            userMessage: messages[messages.length - 1],
            assistantMessage: text,
            usage,
          });
        },
      });

      result.mergeIntoDataStream(dataStream);
    },
    onError: (error) => {
      return error instanceof Error ? error.message : String(error);
    },
  });
}
