import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import getSession from '@/lib/hooks/get-session';
import { SquarePen } from 'lucide-react';
import { Button } from './button';
import { Separator } from './separator';
import { CustomInternalTrigger } from './sidebar-trigger';
import { ThemeToggle } from './theme-selector';
import UserAvatar from './user-avatar';

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
          <UserAvatar session={session} />

          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
