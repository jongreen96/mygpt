import Chat from '@/components/chat';
import { getMessages } from '@/lib/db';

async function fetchMessagesWithRetry(
  conversationId: string,
  retries: number = 3,
  delay: number = 100,
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

  return <Chat conversationId={conversationId} prevMessages={messages} />;
}
