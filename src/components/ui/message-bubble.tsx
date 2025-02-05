import { cn } from '@/lib/utils';
import type { Attachment, Message } from 'ai';
import { RefreshCcw, Trash2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { markdownComponents } from '../typography';
import { Button } from './button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';

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
        'group relative w-fit max-w-[95%] whitespace-pre-wrap rounded border',
        message.role === 'user' ? 'self-end bg-secondary p-2' : 'border-none',
      )}
    >
      <div
        className={cn(
          'grid gap-2',
          message.experimental_attachments?.length === 1
            ? 'grid-cols-1'
            : 'grid-cols-[repeat(auto-fit,minmax(4rem,1fr))]',
        )}
      >
        {message.experimental_attachments
          ?.filter((attachment) => attachment.contentType?.startsWith('image/'))
          .map((attachment, index) => (
            <ImagePreview attachment={attachment} key={index} />
          ))}
      </div>

      <Markdown
        className={cn(
          'overflow-hidden',
          (message.experimental_attachments?.length ?? 0) > 0 && 'mt-2',
        )}
        components={markdownComponents}
      >
        {message.content}
      </Markdown>

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

function ImagePreview({ attachment }: { attachment: Attachment }) {
  // TODO: Add download button & improve UI
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='aspect-square w-full cursor-pointer overflow-hidden rounded bg-gray-200'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={attachment.url}
            alt={`User image`}
            className='h-full w-full max-w-64 object-cover'
          />
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{attachment.name}</DialogTitle>
        </DialogHeader>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={attachment.url}
          alt={`User image`}
          className='h-full w-full'
        />
      </DialogContent>
    </Dialog>
  );
}
