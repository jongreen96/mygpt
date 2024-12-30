import { cn } from '@/lib/utils';
import type { Message } from 'ai';
import { P } from '../typography';

export default function Message({ message }: { message: Message }) {
  return (
    <div
      key={message.id}
      className={cn(
        'w-fit max-w-[95%] whitespace-pre-wrap rounded border p-2',
        message.role === 'user' ? '' : 'self-end bg-secondary',
      )}
    >
      {message.toolInvocations ? (
        <pre>{JSON.stringify(message.toolInvocations, null, 2)}</pre>
      ) : (
        <P>{message.content}</P>
      )}
    </div>
  );
}
