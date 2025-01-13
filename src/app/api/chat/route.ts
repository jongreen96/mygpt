import { ModelSettingsType } from '@/lib/ai-models';
import { auth } from '@/lib/auth';
import { createConversation, saveMessages } from '@/lib/db';
import { openai } from '@ai-sdk/openai';
import { createDataStreamResponse, Message, streamText } from 'ai';

export const maxDuration = 600;

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

  return createDataStreamResponse({
    execute: (dataStream) => {
      const result = streamText({
        model: openai(modelSettings.model),
        maxTokens: modelSettings.maxTokens || undefined,
        temperature: Math.max(0, Math.min(2, modelSettings.temperature)),
        topP: Math.max(0, Math.min(1, modelSettings.topP)),
        presencePenalty: Math.max(
          -2,
          Math.min(2, modelSettings.presencePenalty),
        ),
        frequencyPenalty: Math.max(
          -2,
          Math.min(2, modelSettings.frequencyPenalty),
        ),

        messages,
        onFinish({ text, usage }) {
          dataStream.writeMessageAnnotation({
            conversationId,
          });
          saveMessages({
            conversationId,
            userMessage: messages.pop()?.content || '',
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
