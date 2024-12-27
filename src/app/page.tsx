import { H1, H2, P } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { signIn, signOut } from '@/lib/auth';

export default async function Home() {
  return (
    <header className='z-10 p-2 relative overflow-hidden bg-primary-foreground text-center min-h-80 h-[30dvh] flex flex-col justify-center items-center border-dashed border-b'>
      <H1>My-GPT</H1>
      <H2>The AI Dashboard of Choice</H2>
      <P className='!mt-0 text-muted-foreground max-w-prose'>
        Used by #USERCOUNT# users, Generating #TOKENS# tokens and #IMAGECOUNT#
        images.
      </P>
      <div className='mt-6 flex gap-2'>
        <form
          action={async () => {
            'use server';
            await signIn('google');
          }}
        >
          <Button className='w-32' type='submit'>
            {/* Get Started */}
            Sign in
          </Button>
        </form>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <Button className='w-32' variant='outline'>
            {/* Learn More */}
            Sign out
          </Button>
        </form>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={'/logo-light.svg'}
        alt='logo'
        className='absolute opacity-20 min-w-[800px] animate-spin-slow -z-10'
      />
    </header>
  );
}
