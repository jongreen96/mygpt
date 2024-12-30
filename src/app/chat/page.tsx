import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth';

export default async function ChatPage() {
  return (
    <div className='w-full flex items-center justify-center h-dvh'>
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
