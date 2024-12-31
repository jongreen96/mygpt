'use client';

import { Button } from '@/components/ui/button';
import Message from '@/components/ui/message';
import { useChat } from 'ai/react';
import { Send, Square } from 'lucide-react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat();
  return (
    <div className='mx-auto flex w-full max-w-prose flex-col gap-4 p-2 py-24'>
      {messages.map((m, i) => (
        <Message message={m} key={i} />
      ))}

      <form
        onSubmit={handleSubmit}
        className='fixed bottom-0 mb-8 flex w-full max-w-[calc(65ch-16px)] items-center gap-2'
      >
        <input
          className='grow rounded border border-gray-300 p-2 shadow-xl'
          value={input}
          placeholder='Say something...'
          onChange={handleInputChange}
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
