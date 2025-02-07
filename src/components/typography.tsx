import { cn } from '@/lib/utils';
import { CopyIcon } from 'lucide-react';
import { Components } from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { stackoverflowDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { toast } from 'sonner';
import { Button } from './ui/button';

export function H1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function H2({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function H3({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function H4({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h4
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className,
      )}
    >
      {children}
    </h4>
  );
}

export function P({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>
      {children}
    </p>
  );
}

export function Blockquote({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)}>
      {children}
    </blockquote>
  );
}

export function Ul({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)}>
      {children}
    </ul>
  );
}

export function Code({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <code
      className={cn(
        'relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className,
      )}
    >
      {children}
    </code>
  );
}

export function Pre({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <pre
      className={cn(
        'scroll-m-20 overflow-x-scroll rounded bg-black p-4',
        className,
      )}
    >
      {children}
    </pre>
  );
}

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const markdownComponents: Components = {
  code({ inline, className, children, ...props }: CodeProps) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <>
        <div className='mb-4 mt-2 rounded-lg border bg-secondary p-1 shadow'>
          <div className='flex items-center justify-between px-1'>
            <span>{match[1]}</span>
            <Button
              asChild
              variant='ghost'
              className='aspect-square h-6 p-0'
              onClick={() => {
                navigator.clipboard.writeText(String(children));
                toast('Code copied to clipboard', {
                  description: `Language: ${match[1]}`,
                });
              }}
            >
              <CopyIcon className='size-4 cursor-pointer' />
            </Button>
          </div>
          <SyntaxHighlighter
            style={stackoverflowDark}
            language={match[1]}
            PreTag='div'
            showLineNumbers
            customStyle={{ borderRadius: 4, fontSize: 14 }}
            {...props}
          >
            {/* TODO: URGENT! Fix error when generating image responses */}
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      </>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};
