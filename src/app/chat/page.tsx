'use client';

import { Button } from '@/components/ui/button';
import Message from '@/components/ui/message';
import { useChat } from 'ai/react';
import { AlertCircle, Send, Square } from 'lucide-react';

export default function Chat() {
  const {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
    error,
  } = useChat();

  const handleDelete = (id: string) => {
    setMessages(messages.filter((message) => message.id !== id));
  };

  return (
    <div className='mx-auto flex w-full max-w-prose flex-col gap-4 p-2 py-24'>
      {messages.map((m, i) => (
        <Message
          key={i}
          message={m}
          reload={reload}
          handleDelete={handleDelete}
          last={messages.length - 1 === i}
        />
      ))}

      <ErrorMessage error={error} reload={reload} />

      <form
        onSubmit={handleSubmit}
        className='fixed bottom-0 mb-8 flex w-full max-w-[calc(65ch-16px)] items-center gap-2'
      >
        <input
          className='grow rounded border border-gray-300 p-2 shadow-xl'
          value={input}
          placeholder='Say something...'
          onChange={handleInputChange}
          autoFocus
        />
        <SubmitButton
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          stop={stop}
        />
      </form>
    </div>
  );
}

function SubmitButton({
  isLoading,
  handleSubmit,
  stop,
}: {
  isLoading: boolean;
  handleSubmit: () => void;
  stop: () => void;
}) {
  return (
    <Button size='icon' onClick={() => (!isLoading ? handleSubmit() : stop())}>
      {!isLoading ? (
        <Send className='scale-125' />
      ) : (
        <Square className='scale-125' />
      )}
    </Button>
  );
}

function ErrorMessage({
  error,
  reload,
}: {
  error: Error | undefined;
  reload: () => void;
}) {
  if (!error) return null;
  return (
    <div className='flex gap-2 rounded bg-destructive/20 p-2'>
      <AlertCircle className='shrink-0 text-destructive' />
      <p>
        An error has occoured,{' '}
        <span className='cursor-pointer underline' onClick={reload}>
          Reload
        </span>{' '}
        resonse or type a new message.
      </p>
    </div>
  );
}
