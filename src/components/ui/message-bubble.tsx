import { cn } from '@/lib/utils';
import type { Message } from 'ai';
import { RefreshCcw, Trash2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { Button } from './button';

export default function MessageBubble({
  message,
  reload,
  handleDelete,
  last,
}: {
  message: Message;
  reload: () => void;
  handleDelete: (id: string) => void;
  last: boolean;
}) {
  return (
    <div
      key={message.id}
      className={cn(
        'group relative w-fit max-w-[95%] whitespace-pre-wrap rounded border p-2',
        message.role === 'user' ? 'self-end' : 'bg-secondary',
      )}
    >
      <Markdown>{message.content}</Markdown>

      <div
        className={cn(
          'absolute hidden gap-1 rounded-lg border border-white bg-secondary p-1 group-hover:flex dark:border-black',
          message.role === 'user' ? 'right-2' : 'left-2',
        )}
      >
        <Button
          size='icon'
          variant='ghost'
          className='aspect-square size-5'
          onClick={() => handleDelete(message.id)}
        >
          <Trash2 />
        </Button>

        <ReloadButton reload={reload} last={last} />
      </div>
    </div>
  );
}

function ReloadButton({ reload, last }: { reload: () => void; last: boolean }) {
  if (!last) return null;
  return (
    <Button
      size='icon'
      variant='ghost'
      className='aspect-square size-5'
      onClick={reload}
    >
      <RefreshCcw />
    </Button>
  );
}
