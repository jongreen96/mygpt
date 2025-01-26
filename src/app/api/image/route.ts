import { auth } from '@/lib/auth';
import { createConversation, saveMessages } from '@/lib/db';
import { openai } from '@ai-sdk/openai';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { experimental_generateImage } from 'ai';
import { nanoid } from 'nanoid';

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
  const session = await auth();
  if (typeof session?.user?.id === 'undefined') return;

  // eslint-disable-next-line prefer-const
  let { prompt, conversationId, modelSettings } = await req.json();

  if (!conversationId)
    conversationId = await createConversation({
      userId: session?.user?.id,
      messages: [prompt],
      modelSettings,
    });

  const { image } = await experimental_generateImage({
    model: openai.image(modelSettings.model),
    prompt: prompt.content,
  });

  const Key = `ai-images/${conversationId}/${nanoid()}`;
  const command = new PutObjectCommand({
    Bucket: process.env.CLOUDFLARE_BUCKET_NAME!,
    Key,
    ContentType: 'image/png',
    Body: Buffer.from(image.base64, 'base64'),
  });

  await client.send(command);

  const responseMessage = {
    content: undefined,
    experimental_attachments: [
      {
        name: Key.split('/').pop(),
        contentType: 'image/png',
        url: `${process.env.CLOUDFLARE_DEV_URL!}/${Key}`,
      },
    ],
  };

  saveMessages({
    conversationId,
    userMessage: prompt,
    assistantMessage: responseMessage,
    usage: {
      promptTokens: 0,
      completionTokens: 1000,
      totalTokens: 1000,
    },
  });

  return Response.json({
    conversationId,
    message: responseMessage,
  });
}
