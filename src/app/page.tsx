import { QuestionBanner } from '@/components/question-banner';
import { H1, H2, P } from '@/components/typography';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { BrainIcon, HandCoinsIcon, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import deviceImage from '../../public/device-showcase-light.png';

export default async function Home() {
  const session = await auth();
  if (session?.user) redirect('/chat');

  return (
    <main className='hero-bg space-y-12'>
      <header className='sticky top-0 z-20 bg-background p-2'>
        <div className='mx-auto flex max-w-7xl items-center justify-between gap-2'>
          <H2 className='pb-0'>My-GPT</H2>
          <Link href='/login' className={buttonVariants()}>
            Get Started
          </Link>
        </div>
      </header>

      <section className='pt-16'>
        <div className='space-y-6 px-2 text-center'>
          <Badge variant='outline' className='select-none'>
            Free Credits for new users!
          </Badge>

          <H1 className='font-bold'>
            Top AI Models, <br />
            <span className='dark:bg-gradient-to-t dark:from-background dark:via-primary/75 dark:to-primary dark:bg-clip-text dark:text-transparent'>
              No Monthly Subscription
            </span>
          </H1>

          <P className='mx-auto max-w-96 text-muted-foreground'>
            Access the top AI models without having to pay a monthly fee, simply
            pay for what you use.
          </P>

          <Button asChild className='w-full max-w-64'>
            <Link href='/login'>Get Started</Link>
          </Button>
        </div>

        <div className='py-20'>
          <QuestionBanner />
        </div>
      </section>

      <section className='mx-auto grid max-w-5xl gap-6 px-2 text-center sm:grid-cols-3 sm:text-left'>
        <Card>
          <CardHeader>
            <CardTitle className='flex flex-row-reverse items-center justify-center gap-2 text-lg sm:flex-row sm:justify-between'>
              Cutting Edge AI Models
              <BrainIcon className='shrink-0' />
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>

          <CardContent className='text-muted-foreground'>
            Access the most advanced AI models without restrictions. Whether you
            need powerful text generation, coding assistance, or deep AI
            analysis, you&apos;ll always have the latest models at your
            fingertips.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='flex flex-row-reverse items-center justify-center gap-2 text-lg sm:flex-row sm:justify-between'>
              Generate AI Images
              <ImageIcon className='shrink-0' />
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>

          <CardContent className='text-muted-foreground'>
            Create stunning AI-generated images in seconds. From concept art to
            photorealistic visuals, our AI models bring your ideas to life with
            precision and creativity—no design skills required.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='flex flex-row-reverse items-center justify-center gap-2 text-lg sm:flex-row sm:justify-between'>
              Pay As You Go
              <HandCoinsIcon className='shrink-0' />
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>

          <CardContent className='text-muted-foreground'>
            No subscriptions. No hidden fees. Only pay for what you use. Get
            full access to premium AI tools without committing to a costly
            monthly plan—perfect for both casual users and power users.
          </CardContent>
        </Card>
      </section>

      <section className='mx-auto flex max-w-7xl flex-col items-center px-2 pt-10 text-center'>
        <H2 className='pb-0'>Your AI, Anywhere You Need It</H2>
        <P className='max-w-5xl'>
          Stay connected across all your devices—desktop, tablet, or phone. Your
          conversations sync seamlessly, so you can start a chat on your laptop
          and continue right where you left off on your phone. Whether
          you&apos;re at home, at work, or on the go, your AI is always with
          you.
        </P>

        <Image
          src={deviceImage}
          alt='Device Image'
          className='w-full max-w-5xl pt-2'
        />
      </section>

      <section className='mx-auto flex max-w-7xl flex-col items-center gap-6 px-2 pb-64 pt-10 text-center'>
        <h2 className='flex text-center text-2xl font-bold tracking-tighter sm:text-6xl'>
          So, the question is... <br /> What are you waiting for?
        </h2>

        <Button className='w-full max-w-prose' asChild>
          <Link href='/login'>Get Started</Link>
        </Button>
      </section>
    </main>
  );
}
