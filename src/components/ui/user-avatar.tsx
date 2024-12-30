'use client';

import { LogOutIcon } from 'lucide-react';
import { DefaultSession } from 'next-auth';
import { signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';

export default function UserAvatar({ session }: { session: DefaultSession }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={session.user?.image ?? undefined} />
          <AvatarFallback>
            {session.user?.name?.charAt(0) ?? 'AI'}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mb-1 ml-4'>
        <DropdownMenuItem onClick={() => signOut({ redirectTo: '/' })}>
          <LogOutIcon />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
