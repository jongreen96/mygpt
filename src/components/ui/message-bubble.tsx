import { cn } from '@/lib/utils';
import type { Message } from 'ai';
import { RefreshCcw, Trash2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { markdownComponents } from '../typography';
import { Button } from './button';

export default function MessageBubble({
  message,
  handleReload,
  handleDelete,
  last,
}: {
  message: Message;
  handleReload: () => void;
  handleDelete: (id: string) => void;
  last: boolean;
}) {
  return (
    <div
      key={message.id}
      className={cn(
        'group relative w-fit max-w-[95%] whitespace-pre-wrap rounded border p-2',
        message.role === 'user' ? 'self-end bg-secondary' : 'border-none',
      )}
    >
      <Markdown components={markdownComponents}>{message.content}</Markdown>

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

        <ReloadButton handleReload={handleReload} last={last} />
      </div>
    </div>
  );
}

function ReloadButton({
  handleReload,
  last,
}: {
  handleReload: () => void;
  last: boolean;
}) {
  if (!last) return null;
  return (
    <Button
      size='icon'
      variant='ghost'
      className='aspect-square size-5'
      onClick={handleReload}
    >
      <RefreshCcw />
    </Button>
  );
}
