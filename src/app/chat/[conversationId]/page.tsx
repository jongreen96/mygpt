import Chat from '@/components/chat/chat';
import { ModelListType } from '@/lib/ai-models';
import { getConversation } from '@/lib/db';
import getSession from '@/lib/hooks/get-session';
import { redirect } from 'next/navigation';

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) {
  const session = await getSession();
  const conversationId = (await params).conversationId;
  const conversation = await fetchConversationWithRetry(
    conversationId,
    session.user?.id,
  );
  if (!conversation) redirect('/chat');

  return (
    <Chat
      conversationId={conversation.id}
      prevMessages={conversation.Message}
      model={conversation.model as ModelListType}
    />
  );
}

async function fetchConversationWithRetry(
  conversationId: string,
  userId: string | undefined,
  retries: number = 3,
  delay: number = 10,
) {
  for (let i = 0; i < retries; i++) {
    const conversation = await getConversation(conversationId, userId);

    if (conversation) {
      return conversation;
    }

    await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)));
  }
  return null;
}
