import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 600;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages,
    onFinish({ text, finishReason, usage }) {
      console.log('text: ', text);
      console.log('finishReason: ', finishReason);
      console.log('usage: ', usage);
      console.log(messages.pop());
    },
  });

  return result.toDataStreamResponse();
}
