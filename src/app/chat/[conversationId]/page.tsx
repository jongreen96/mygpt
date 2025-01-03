import Chat from '@/components/chat';
import { getMessages } from '@/lib/db';
import { redirect } from 'next/navigation';

async function fetchMessagesWithRetry(
  conversationId: string,
  retries: number = 3,
  delay: number = 100,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any[]> {
  for (let i = 0; i < retries; i++) {
    const messages = await getMessages(conversationId);
    if (messages.length > 0) {
      return messages;
    }

    await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)));
  }
  return [];
}

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) {
  const conversationId = (await params).conversationId;
  const messages = await fetchMessagesWithRetry(conversationId);
  if (messages.length < 1) redirect('/chat');

  return <Chat conversationId={conversationId} prevMessages={messages} />;
}
