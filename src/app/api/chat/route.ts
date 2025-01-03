import { auth } from '@/lib/auth';
import { createConversation, saveMessages } from '@/lib/db';
import { openai } from '@ai-sdk/openai';
import { createDataStreamResponse, streamText } from 'ai';

export const maxDuration = 600;

export const POST = auth(async function POST(req: Request) {
  // eslint-disable-next-line prefer-const
  let { messages, conversationId } = await req.json();

  if (!conversationId)
    conversationId = await createConversation({
      // @ts-expect-error - Auth not on Request type
      userId: req.auth.userId,
      messages,
    });

  return createDataStreamResponse({
    execute: (dataStream) => {
      const result = streamText({
        model: openai('gpt-4o-mini'),
        messages,
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
});
