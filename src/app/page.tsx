import { H1, H2, P } from '@/components/typography';
import { buttonVariants } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();
  if (session?.user) redirect('/chat');

  return (
    <header className='relative z-10 flex h-[30dvh] min-h-80 flex-col items-center justify-center overflow-hidden border-b border-dashed bg-primary-foreground p-2 text-center'>
      <H1>My-GPT</H1>
      <H2>The AI Dashboard of Choice</H2>
      <P className='!mt-0 max-w-prose text-muted-foreground'>
        Used by #USERCOUNT# users, Generating #TOKENS# tokens and #IMAGECOUNT#
        images.
      </P>
      <div className='mt-6 grid grid-cols-2 gap-2'>
        <Link href='/login' className={buttonVariants()}>
          Get Started
        </Link>

        <Link
          href='#pricing'
          className={buttonVariants({ variant: 'outline' })}
        >
          Pricing
        </Link>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={'/logo-light.svg'}
        alt='logo'
        className='absolute -z-10 min-w-[800px] animate-spin-slow opacity-20'
      />
    </header>
  );
}
