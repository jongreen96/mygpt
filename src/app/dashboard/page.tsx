import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth';
import { getSession } from '@/lib/hooks';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session?.user) redirect('/login');

  return (
    <div>
      dashboard
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <Button type='submit'>Sign Out</Button>
      </form>
    </div>
  );
}
