import { cn } from '@/lib/utils';
import { marked } from 'marked';
import { memo, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { markdownComponents } from '../typography';

function parseMarkdownIntoBlocks(markdown: string): string[] {
  const tokens = marked.lexer(markdown);
  return tokens.map((token) => token.raw);
}

const MemoizedMarkdownBlock = memo(
  ({
    content,
    requiresMarginTop,
  }: {
    content: string;
    requiresMarginTop: boolean;
  }) => {
    return (
      <ReactMarkdown
        components={markdownComponents}
        className={cn(requiresMarginTop && 'mt-2')}
      >
        {content}
      </ReactMarkdown>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.content !== nextProps.content) return false;
    return true;
  },
);

MemoizedMarkdownBlock.displayName = 'MemoizedMarkdownBlock';

export const MemoizedMarkdown = memo(
  ({
    content,
    id,
    attachments,
  }: {
    content: string;
    id: string;
    attachments: boolean;
  }) => {
    const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content]);

    return blocks.map((block, index) => (
      <MemoizedMarkdownBlock
        content={block}
        requiresMarginTop={index === 0 && attachments}
        key={`${id}-block_${index}`}
      />
    ));
  },
);

MemoizedMarkdown.displayName = 'MemoizedMarkdown';
