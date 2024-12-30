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
      <DropdownMenuContent className='ml-4 mb-1'>
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOutIcon />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
