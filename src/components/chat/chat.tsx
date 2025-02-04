'use client';

import { Button } from '@/components/ui/button';
import MessageBubble from '@/components/ui/message-bubble';
import { deleteMessageAction } from '@/lib/actions';
import React, { useEffect, useRef, useState } from 'react';

import { defaultChatModel, ModelListType, models } from '@/lib/ai-models';
import { Message, useChat } from 'ai/react';
import { AlertCircle, ImagePlus, Loader2, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ModelSettings from './model-settings';

export default function Chat({
  conversationId,
  prevMessages,
  model,
}: {
  conversationId?: string;
  prevMessages?: Message[];
  model?: ModelListType;
}) {
  const router = useRouter();
  const bottomRef = useRef<HTMLDivElement>(null);

  const [selectedModel, setSelectedModel] = useState(model || defaultChatModel);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedModel = localStorage.getItem('model') as ModelListType;
      if (storedModel) setSelectedModel(storedModel);
    }
  }, []);

  const {
    messages,
    setMessages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
    reload,
    error,
  } = useChat({
    initialMessages: prevMessages,
    body: {
      conversationId,
      model: selectedModel,
    },
    onFinish(e) {
      // @ts-expect-error - conversationId is not on Message type
      const newConversationId = e.annotations[0].conversationId;
      if (conversationId !== newConversationId) {
        router.push(`/chat/${newConversationId}`);
      }
      router.refresh();
    },
  });

  const [customIsLoading, setCustomIsLoading] = useState(isLoading);

  // Scroll to bottom on initial page load
  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, []);

  useEffect(() => {
    if (error?.message.includes('Insufficient credits'))
      router.push('/chat/pricing');
  }, [error, router]);

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

  const customHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    switch (models[selectedModel as keyof typeof models].type) {
      case 'chat':
      case 'multimodal':
        {
          handleSubmit(e, {
            experimental_attachments: files,
          });
        }
        break;
      case 'image':
        setMessages([
          ...messages,
          {
            id: 'loading',
            content: input,
            role: 'user',
          },
        ]);
        setInput('');
        setCustomIsLoading(true);

        const imageResponse = await fetch('/api/image', {
          method: 'POST',
          body: JSON.stringify({
            prompt: { role: 'user', content: input },
            conversationId,
            model: selectedModel,
          }),
        });

        if (imageResponse.status !== 200) {
          router.push('/chat/pricing');
          return;
        }

        const imageResponseJSON = (await imageResponse.json()) as {
          conversationId: string;
          message: Message;
        };

        const newConversationId = imageResponseJSON.conversationId;
        if (conversationId !== newConversationId) {
          router.push(`/chat/${newConversationId}`);
          router.refresh();
        }

        // Refresh page to update credits
        router.refresh();

        setMessages([
          ...messages,
          {
            id: 'loading',
            content: input,
            role: 'user',
          },
          imageResponseJSON.message,
        ]);
        setCustomIsLoading(false);

        break;
    }

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

      <ChatInput
        fileInputRef={fileInputRef}
        files={files}
        setFiles={setFiles}
        input={input}
        handleInputChange={handleInputChange}
        isLoading={isLoading}
        customIsLoading={customIsLoading}
        customHandleSubmit={customHandleSubmit}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        conversationId={conversationId}
      />
    </div>
  );
}

function ChatInput({
  fileInputRef,
  files,
  setFiles,
  input,
  handleInputChange,
  isLoading,
  customIsLoading,
  customHandleSubmit,
  selectedModel,
  setSelectedModel,
  conversationId,
}: {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  files: FileList | undefined;
  setFiles: React.Dispatch<React.SetStateAction<FileList | undefined>>;
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  customIsLoading: boolean;
  customHandleSubmit: (e: React.FormEvent) => void;
  selectedModel: ModelListType;
  setSelectedModel: React.Dispatch<React.SetStateAction<ModelListType>>;
  conversationId: string | undefined;
}) {
  return (
    <form className='fixed bottom-0 flex w-[calc(100%-16px)] max-w-[752px] flex-col items-center gap-2 rounded-t-lg bg-sidebar/80 p-2 backdrop-blur-sm'>
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

      <div className='flex w-full gap-2'>
        <input
          className='grow rounded border border-gray-300 p-[5px] shadow-lg'
          value={input}
          placeholder='Say something...'
          onChange={handleInputChange}
          autoFocus
        />

        <SubmitButton
          isLoading={isLoading}
          customIsLoading={customIsLoading}
          customHandleSubmit={customHandleSubmit}
        />
      </div>

      <div className='flex w-full items-center justify-between'>
        <ModelSettings
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          conversationId={conversationId}
        />

        {models[selectedModel as keyof typeof models].type === 'multimodal' && (
          <Button
            size='icon'
            variant='ghost'
            type='button'
            onClick={() => fileInputRef.current?.click()}
            className='size-6'
          >
            <ImagePlus />
            {files && files.length > 0 && (
              <div className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground'>
                {files.length}
              </div>
            )}
          </Button>
        )}
      </div>
    </form>
  );
}

function SubmitButton({
  isLoading,
  customIsLoading,
  customHandleSubmit,
}: {
  isLoading: boolean;
  customIsLoading: boolean;
  customHandleSubmit: (e: React.FormEvent) => void;
}) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!customIsLoading || !isLoading) {
        customHandleSubmit(e as unknown as React.FormEvent);
      }
    }
  };

  return (
    <Button
      type='submit'
      size='icon'
      aria-label={
        customIsLoading || isLoading ? 'Sending message...' : 'Send message'
      }
      disabled={customIsLoading || isLoading}
      onClick={(e) => customHandleSubmit(e)}
      onKeyDown={handleKeyDown}
    >
      {!customIsLoading && !isLoading ? (
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
