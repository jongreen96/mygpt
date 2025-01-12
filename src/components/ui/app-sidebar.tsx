import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { ModelSettingsType } from '@/lib/ai-models';
import { deleteConversation, getConversations } from '@/lib/db';
import getSession from '@/lib/hooks/get-session';
import { MessageSquare, MoreHorizontalIcon, SquarePen } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog';
import { Button } from './button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Separator } from './separator';
import { CustomInternalTrigger } from './sidebar-trigger';
import { Table, TableBody, TableCell, TableRow } from './table';
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
            <SidebarMenu>
              {conversations.map((conversation) => (
                <SidebarMenuItem key={conversation.id}>
                  <SidebarMenuButton asChild>
                    <Link href={`/chat/${conversation.id}`}>
                      <MessageSquare />
                      <span>{conversation.subject}</span>
                    </Link>
                  </SidebarMenuButton>

                  <ConversationDropdownMenu conversation={conversation} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
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

function ConversationDropdownMenu({
  conversation,
}: {
  conversation: {
    id: string;
    subject: string;
    settings: string;
  };
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuAction>
          <MoreHorizontalIcon />
        </SidebarMenuAction>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-min'>
        <ConversationInformation settings={conversation.settings} />

        <ConversationDelete id={conversation.id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ConversationInformation({ settings }: { settings: string }) {
  const conversationSettings = JSON.parse(settings) as ModelSettingsType;

  return (
    <DropdownMenuItem asChild>
      <Dialog>
        <DialogTrigger className='w-full rounded p-1 text-left text-sm'>
          Information
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Conversation Information</DialogTitle>
            <DialogDescription>
              Information about model settings as well as usage
            </DialogDescription>
          </DialogHeader>

          <Table>
            <TableBody>
              {Object.entries(conversationSettings)
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .filter(([_, value]) => value !== null)
                .map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell className='font-medium capitalize'>
                      {key}
                    </TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </DropdownMenuItem>
  );
}

function ConversationDelete({ id }: { id: string }) {
  return (
    <DropdownMenuItem asChild>
      <AlertDialog>
        <AlertDialogTrigger className='w-full rounded bg-destructive/50 p-1 text-left text-sm'>
          Delete
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              conversation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <form
              action={async () => {
                'use server';
                await deleteConversation(id);
                revalidatePath('/chat');
              }}
            >
              <AlertDialogAction asChild>
                <button type='submit' className='w-full'>
                  Delete
                </button>
              </AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenuItem>
  );
}
