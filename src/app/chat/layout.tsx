import { AppSidebar } from '@/components/ui/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CustomExternalTrigger } from '@/components/ui/sidebar-trigger';
import { cookies } from 'next/headers';

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className='w-full'>
        <CustomExternalTrigger />
        <section>{children}</section>
      </main>
    </SidebarProvider>
  );
}
