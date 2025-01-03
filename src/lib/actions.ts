'use server';

import { deleteMessage } from '@/lib/db';

export async function deleteMessageAction(messageId: number) {
  await deleteMessage(messageId);
}
