'use server';

import { deleteMessage } from '@/lib/db';

export async function deleteMessageAction(messageId: string) {
  await deleteMessage(Number(messageId));
}
