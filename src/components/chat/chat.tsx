'use client';

import { Button } from '@/components/ui/button';
import MessageBubble from '@/components/ui/message-bubble';
import { deleteMessageAction } from '@/lib/actions';
import { useEffect, useRef, useState } from 'react';

import type { ModelSettingsType } from '@/lib/ai-models';
import { defaultModelSettings } from '@/lib/ai-models';
import { Message, useChat } from 'ai/react';
import { AlertCircle, Send, Square } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ModelSettings from './model-settings';

const localSettings =
  typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('conversationSettings') || 'null')
    : (undefined as ModelSettingsType | undefined);

export default function Chat({
  conversationId,
  prevMessages,
  conversationSettings = localSettings,
}: {
  conversationId?: string;
  prevMessages?: Message[];
  conversationSettings?: ModelSettingsType | undefined;
}) {
  const router = useRouter();
  const bottomRef = useRef<HTMLDivElement>(null);

  const [modelSettings, setModelSettings] = useState(
    conversationSettings || defaultModelSettings,
  );

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
  } = useChat({
    initialMessages: prevMessages,
    body: {
      conversationId,
      modelSettings,
    },
    onFinish(e) {
      // @ts-expect-error - conversationId is not on Message type
      const newConversationId = e.annotations[0].conversationId;
      if (conversationId !== newConversationId) {
        router.push(`/chat/${newConversationId}`);
        router.refresh();
      }
    },
  });

  // Scroll to bottom on initial page load
  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, []);

  const handleDelete = (id: string) => {
    setMessages(messages.filter((message) => message.id !== id));
    deleteMessageAction(id);
  };

  const handleReload = () => {
    reload();
    deleteMessageAction(messages[messages.length - 1].id);
    deleteMessageAction(messages[messages.length - 2].id);
  };

  const handleStop = () => {
    stop();
    // remove the last 2 messages from messages
    setMessages(messages.slice(0, -2));
  };

  return (
    <div className='mx-auto flex w-full max-w-prose flex-col gap-4 p-2 py-24'>
      {messages.map((m, i) => (
        <MessageBubble
          key={i}
          message={m}
          handleReload={handleReload}
          handleDelete={handleDelete}
          last={messages.length - 1 === i}
        />
      ))}

      <div ref={bottomRef} />

      <ErrorMessage error={error} handleReload={handleReload} />

      <form
        onSubmit={handleSubmit}
        className='fixed bottom-0 mb-8 flex w-[calc(100%-16px)] max-w-[calc(65ch-16px)] items-center gap-2'
      >
        {!conversationId && (
          <ModelSettings
            modelSettings={modelSettings}
            setModelSettings={setModelSettings}
          />
        )}

        <input
          className='grow rounded border border-gray-300 p-[5px] shadow-xl'
          value={input}
          placeholder='Say something...'
          onChange={handleInputChange}
          autoFocus
        />
        <SubmitButton
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          handleStop={handleStop}
        />
      </form>
    </div>
  );
}

function SubmitButton({
  isLoading,
  handleSubmit,
  handleStop,
}: {
  isLoading: boolean;
  handleSubmit: () => void;
  handleStop: () => void;
}) {
  return (
    <Button
      size='icon'
      onClick={() => (!isLoading ? handleSubmit() : handleStop())}
    >
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
  handleReload,
}: {
  error: Error | undefined;
  handleReload: () => void;
}) {
  if (!error) return null;
  return (
    <div className='flex gap-2 rounded bg-destructive/20 p-2'>
      <AlertCircle className='shrink-0 text-destructive' />
      <p>
        An error has occoured,{' '}
        <span className='cursor-pointer underline' onClick={handleReload}>
          Reload
        </span>{' '}
        resonse or type a new message.
      </p>
    </div>
  );
}
