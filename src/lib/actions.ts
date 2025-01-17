'use server';

import { deleteMessage } from '@/lib/db';

export async function deleteMessageAction(
  messageId: string,
  conversationId?: string,
) {
  await deleteMessage(Number(messageId), conversationId);
}
