'use client';

import { LogOutIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';

export default function UserAvatar({
  userName,
  userImage,
}: {
  userName: string | null | undefined;
  userImage: string | null | undefined;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={userImage ?? undefined} />
          <AvatarFallback>{userName?.charAt(0) ?? 'AI'}</AvatarFallback>
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
