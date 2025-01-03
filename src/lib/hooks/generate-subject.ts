import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export default async function generateSubject(
  initialMessage: { role: string; content: string }[],
) {
  const result = await generateText({
    model: openai('gpt-4o-mini'),
    system:
      "You are a bot who's sole purpose is to create concise subject titles for chatbot conversations using what information you can get from a snippet. SUBJECT TITLE MUST NOT EXCEED 5 WORDS. DON'T RETURN ANYTHING OTHER THAN THE SUBJECT TITLE.",
    prompt: JSON.stringify(initialMessage),
  });

  return result.text;
}
