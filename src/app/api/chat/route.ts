import { auth } from '@/lib/auth';
import { createConversation, saveMessages } from '@/lib/db';
import { openai } from '@ai-sdk/openai';
import { createDataStreamResponse, streamText } from 'ai';

export const maxDuration = 600;

export async function POST(req: Request) {
  // eslint-disable-next-line prefer-const
  let { messages, conversationId, modelSettings } = await req.json();
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
        // TODO: Implement settings in api call

        messages,
        // Beware: Abort signals don't triggert onFinish
        abortSignal: req.signal,
        onFinish({ text, usage }) {
          dataStream.writeMessageAnnotation({
            conversationId,
          });
          saveMessages({
            conversationId,
            userMessage: messages.pop().content,
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
