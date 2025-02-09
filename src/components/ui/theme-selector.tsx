'use client';

import { cn } from '@/lib/utils';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className='flex items-center gap-0.5 rounded border p-0.5'>
      <Button
        asChild
        variant='ghost'
        size='icon'
        onClick={() => setTheme('light')}
        className={cn(
          'size-6 cursor-pointer',
          theme === 'light' && 'bg-secondary',
        )}
      >
        <Sun className='p-1' />
      </Button>
      <Button
        asChild
        variant='ghost'
        size='icon'
        onClick={() => setTheme('dark')}
        className={cn(
          'size-6 cursor-pointer',
          theme === 'dark' && 'bg-secondary',
        )}
      >
        <Moon className='p-1' />
      </Button>
      <Button
        asChild
        variant='ghost'
        size='icon'
        onClick={() => setTheme('dark')}
        className={cn(
          'size-6 cursor-pointer',
          theme === 'system' && 'bg-secondary',
        )}
      >
        <Monitor className='p-1' />
      </Button>
    </div>
  );
}
