import Chat from '@/components/chat/chat';
import { getConversation, getMessages } from '@/lib/db';
import getSession from '@/lib/hooks/get-session';
import { redirect } from 'next/navigation';

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) {
  const session = await getSession();
  const conversationId = (await params).conversationId;
  const messages = await fetchMessagesWithRetry(
    conversationId,
    session.user?.id,
  );
  if (messages.length < 1) redirect('/chat');
  const conversationSettings = await getConversation(conversationId);

  return (
    <Chat
      conversationId={conversationId}
      prevMessages={messages}
      conversationSettings={JSON.parse(
        conversationSettings?.settings || 'null',
      )}
    />
  );
}

async function fetchMessagesWithRetry(
  conversationId: string,
  userId: string | undefined,
  retries: number = 3,
  delay: number = 10,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any[]> {
  for (let i = 0; i < retries; i++) {
    const messages = await getMessages(conversationId, userId);

    if (messages) {
      return messages;
    }

    await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)));
  }
  return [];
}
