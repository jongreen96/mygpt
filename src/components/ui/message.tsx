import { cn } from '@/lib/utils';
import type { Message } from 'ai';
import Markdown from 'react-markdown';

export default function Message({ message }: { message: Message }) {
  return (
    <div
      key={message.id}
      className={cn(
        'w-fit max-w-[95%] whitespace-pre-wrap rounded border p-2',
        message.role === 'user' ? 'self-end' : 'bg-secondary',
      )}
    >
      <Markdown>{message.content}</Markdown>
    </div>
  );
}
