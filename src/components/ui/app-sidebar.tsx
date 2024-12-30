import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import getSession from '@/lib/hooks/get-session';
import { SquarePen } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Button } from './button';
import { Separator } from './separator';
import { CustomInternalTrigger } from './sidebar-trigger';
import { ThemeToggle } from './theme-selector';

export async function AppSidebar() {
  const session = await getSession();

  return (
    <Sidebar variant='floating'>
      <SidebarHeader>
        <div className='flex justify-between items-center'>
          <CustomInternalTrigger />
          <Button variant='ghost' size='icon'>
            <SquarePen className='scale-125' />
          </Button>
        </div>
        <Separator />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <div className='flex justify-between items-center'>
          <Avatar>
            <AvatarImage src={session.user?.image ?? undefined} />
            <AvatarFallback>
              {session.user?.name?.charAt(0) ?? 'AI'}
            </AvatarFallback>
          </Avatar>

          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
