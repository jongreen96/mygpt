import { H1, H2, P } from '@/components/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home() {
  return (
    <header className='z-10 p-2 relative overflow-hidden bg-primary-foreground text-center min-h-80 h-[30dvh] flex flex-col justify-center items-center border-dashed border-b'>
      <H1>My-GPT</H1>
      <H2>The AI Dashboard of Choice</H2>
      <P className='!mt-0 text-muted-foreground max-w-prose'>
        Used by #USERCOUNT# users, Generating #TOKENS# tokens and #IMAGECOUNT#
        images.
      </P>
      <div className='mt-6 grid grid-cols-2 gap-2'>
        <Button asChild>
          <Link href='/login'>Get Started</Link>
        </Button>

        <Button asChild variant='secondary'>
          <Link href='#pricing'>Pricing</Link>
        </Button>
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
