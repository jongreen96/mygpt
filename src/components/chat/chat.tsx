'use client';

import { Button } from '@/components/ui/button';
import MessageBubble from '@/components/ui/message-bubble';
import { deleteMessageAction } from '@/lib/actions';
import React, { useEffect, useRef, useState } from 'react';

import type { ModelSettingsType } from '@/lib/ai-models';
import { defaultModelSettings } from '@/lib/ai-models';
import { Message, useChat } from 'ai/react';
import { AlertCircle, ImagePlus, Loader2, Send } from 'lucide-react';
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
    const deleteConversation =
      messages.length === 1 ? conversationId : undefined;

    deleteMessageAction(id, deleteConversation);

    if (deleteConversation) router.refresh();
  };

  const handleReload = () => {
    reload();
    deleteMessageAction(messages[messages.length - 1].id);
    deleteMessageAction(messages[messages.length - 2].id);
  };

  const customHandleSubmit = (e: React.FormEvent) => {
    handleSubmit(e, {
      experimental_attachments: files,
    });

    setFiles(undefined);

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className='mx-auto flex w-full max-w-3xl flex-col gap-4 p-2 py-24'>
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
        onSubmit={customHandleSubmit}
        className='fixed bottom-0 mb-8 flex w-[calc(100%-16px)] max-w-[752px] items-center gap-2'
      >
        <input
          type='file'
          accept='image/*'
          onChange={(event) => {
            if (event.target.files) {
              setFiles(event.target.files);
            }
          }}
          multiple
          ref={fileInputRef}
          className='hidden'
        />

        <Button
          size='icon'
          variant='outline'
          type='button'
          onClick={() => fileInputRef.current?.click()}
          className='relative'
        >
          <ImagePlus className='scale-125' />
          {files && files.length > 0 && (
            <div className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground'>
              {files.length}
            </div>
          )}
        </Button>

        <input
          className='grow rounded border border-gray-300 p-[5px] shadow-lg'
          value={input}
          placeholder='Say something...'
          onChange={handleInputChange}
          autoFocus
        />

        {!conversationId && (
          <ModelSettings
            modelSettings={modelSettings}
            setModelSettings={setModelSettings}
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          customHandleSubmit={customHandleSubmit}
        />
      </form>
    </div>
  );
}

function SubmitButton({
  isLoading,
  customHandleSubmit,
}: {
  isLoading: boolean;
  customHandleSubmit: (e: React.FormEvent) => void;
}) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!isLoading) {
        customHandleSubmit(e as unknown as React.FormEvent);
      }
    }
  };

  return (
    <Button
      type='submit'
      size='icon'
      aria-label={isLoading ? 'Sending message...' : 'Send message'}
      disabled={isLoading}
      onClick={(e) => customHandleSubmit(e)}
      onKeyDown={handleKeyDown}
    >
      {!isLoading ? (
        <Send className='scale-125' aria-hidden='true' />
      ) : (
        <Loader2 className='animate-spin' aria-hidden='true' />
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
    <div
      className='flex gap-2 rounded bg-destructive/20 p-2'
      role='alert'
      aria-live='polite'
    >
      <AlertCircle className='shrink-0 text-destructive' aria-hidden='true' />
      <div>
        <p>
          An error has occurred.{' '}
          <button
            className='cursor-pointer underline hover:text-destructive focus:outline-none focus:ring-2 focus:ring-destructive'
            onClick={handleReload}
            onKeyDown={(e) => e.key === 'Enter' && handleReload()}
          >
            Reload
          </button>{' '}
          response or type a new message.
        </p>
        {error.message && (
          <p className='mt-1 text-sm text-destructive/80'>{error.message}</p>
        )}
      </div>
    </div>
  );
}
