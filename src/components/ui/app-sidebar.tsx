import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { getConversations } from '@/lib/db';
import getSession from '@/lib/hooks/get-session';
import { MessageSquare, SquarePen } from 'lucide-react';
import Link from 'next/link';
import { Button } from './button';
import { Separator } from './separator';
import { CustomInternalTrigger } from './sidebar-trigger';
import { ThemeToggle } from './theme-selector';
import UserAvatar from './user-avatar';

export async function AppSidebar() {
  const session = await getSession();
  const conversations = session?.user?.id
    ? await getConversations(session.user.id)
    : [];

  return (
    <Sidebar variant='floating'>
      <SidebarHeader>
        <div className='flex items-center justify-between'>
          <CustomInternalTrigger />
          <Button asChild variant='ghost' size='icon'>
            <Link href='/chat'>
              <SquarePen className='scale-125' />
            </Link>
          </Button>
        </div>
        <Separator />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Conversations</SidebarGroupLabel>
          <SidebarGroupContent>
            {conversations.map((conversation) => (
              <SidebarMenuButton asChild key={conversation.id}>
                <Link href={`/chat/${conversation.id}`}>
                  <MessageSquare />
                  <span>{conversation.subject}</span>
                </Link>
              </SidebarMenuButton>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className='flex items-center justify-between'>
          <UserAvatar
            userName={session.user?.name}
            userImage={session.user?.image}
          />

          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
