'use client';

import { formatCredits } from '@/lib/utils';
import {
  EllipsisVerticalIcon,
  LogOutIcon,
  Plus,
  Section,
  SectionIcon,
  SunMoonIcon,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { ThemeToggle } from './theme-selector';

export default function UserAvatar({
  userName,
  userImage,
  userEmail,
  userCredits,
}: {
  userName: string | null | undefined;
  userImage: string | null | undefined;
  userEmail?: string | null | undefined;
  userCredits: number;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='w-full focus:outline-none'>
        <div className='flex items-center gap-2'>
          <Avatar>
            <AvatarImage src={userImage ?? undefined} />
            <AvatarFallback>{userName?.charAt(0) ?? 'AI'}</AvatarFallback>
          </Avatar>

          <div className='-space-y-0.5 text-left text-sm'>
            <p className='font-bold'>{userName}</p>
            <p className='text-muted-foreground'>
              Credits: <Section className='-mt-0.5 inline-block size-3' />
              {formatCredits(userCredits)}
            </p>
          </div>

          <EllipsisVerticalIcon className='ml-auto size-5' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mb-1 ml-4'>
        <DropdownMenuLabel className='flex items-center gap-2'>
          <Avatar>
            <AvatarImage src={userImage ?? undefined} />
            <AvatarFallback>{userName?.charAt(0) ?? 'AI'}</AvatarFallback>
          </Avatar>

          <div className='-space-y-0.5 text-left text-sm font-normal'>
            <p className='font-semibold'>{userName}</p>
            <p className='text-xs text-muted-foreground'>{userEmail}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href='/chat/pricing'>
            <SectionIcon className='-mr-1 size-4' />
            Add Credits
            <Plus className='ml-auto' />
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className='flex items-center justify-between focus:bg-background'>
          <div className='flex items-center gap-1'>
            <SunMoonIcon className='size-4' />
            Theme:
          </div>
          <ThemeToggle />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => signOut({ redirectTo: '/' })}>
          <LogOutIcon />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
