'use client';

import { useIsMobile } from '@/lib/utils';
import { SidebarCloseIcon, SidebarOpenIcon } from 'lucide-react';
import { Button } from './button';
import { useSidebar } from './sidebar';

export function CustomExternalTrigger() {
  const { toggleSidebar, state } = useSidebar();
  const mobile = useIsMobile();

  if (state === 'expanded' && !mobile) return null;

  return (
    <Button
      onClick={toggleSidebar}
      size='icon'
      variant='outline'
      className='fixed m-4 size-10'
    >
      <SidebarOpenIcon className='scale-125' />
    </Button>
  );
}

export function CustomInternalTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      onClick={toggleSidebar}
      size='icon'
      variant='ghost'
      className='size-10'
    >
      <SidebarCloseIcon className='scale-125' />
    </Button>
  );
}
