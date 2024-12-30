'use client';

import Message from '@/components/ui/message';
import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className='mx-auto flex w-full max-w-prose flex-col gap-4 p-2 py-24'>
      {messages.map((m, i) => (
        <Message message={m} key={i} />
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className='fixed bottom-0 mb-8 w-full max-w-prose rounded border border-gray-300 p-2 shadow-xl'
          value={input}
          placeholder='Say something...'
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
