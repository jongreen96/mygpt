'use server';

import { deleteMessage } from '@/lib/db';

export async function deleteMessageAction(
  messageId: string,
  conversationId?: string | undefined,
) {
  await deleteMessage(Number(messageId), conversationId);
}
