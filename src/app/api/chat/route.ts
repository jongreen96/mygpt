import { auth } from '@/lib/auth';
import { saveMessages } from '@/lib/db';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 600;

export const POST = auth(async function POST(req: Request) {
  const { messages, conversationId } = await req.json();

  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages,
    onFinish({ text, usage }) {
      saveMessages({
        // @ts-expect-error - Auth not on Request type
        userId: req.auth.userId,
        conversationId,
        userMessage: messages.pop().content,
        assistantMessage: text,
        usage,
      });
    },
  });

  return result.toDataStreamResponse();
});
