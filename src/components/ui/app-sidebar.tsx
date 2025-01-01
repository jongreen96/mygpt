import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import getSession from '@/lib/hooks/get-session';
import { SquarePen } from 'lucide-react';
import Link from 'next/link';
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
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <div className='flex items-center justify-between'>
          <UserAvatar session={session} />

          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
