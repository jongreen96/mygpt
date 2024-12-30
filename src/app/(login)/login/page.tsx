import { H3 } from '@/components/typography';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { SubmitButton } from '@/components/ui/submit-button';
import { auth, signIn } from '@/lib/auth';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect('/chat');

  return (
    <main className='w-full h-dvh flex items-center justify-center'>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle>
            <H3>Log In / Sign Up</H3>
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <form
            action={async () => {
              'use server';
              await signIn('google');
            }}
            className='space-y-2'
          >
            <SubmitButton>Sign In with Google</SubmitButton>
          </form>

          <div className='grid grid-cols-[2fr_1fr_2fr] text-center text-sm items-center'>
            <Separator />
            or
            <Separator />
          </div>

          <form
            action={async (formData) => {
              'use server';
              await signIn('nodemailer', formData);
            }}
            className='space-y-2'
          >
            <div>
              <Label htmlFor='email'>Email:</Label>
              <Input
                type='email'
                id='email'
                name='email'
                placeholder='johndoe@example.com'
                required
              />
            </div>

            <SubmitButton>Log In / Sign Up</SubmitButton>
          </form>

          <Link
            href='/'
            className={buttonVariants({
              className: 'w-full text-muted-foreground',
              variant: 'ghost',
            })}
          >
            <ChevronLeft className='size-2 -ml-3' />
            Return to Homepage
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
