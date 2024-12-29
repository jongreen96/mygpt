import { H3 } from '@/components/typography';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertCircle, ChevronLeft, Mail } from 'lucide-react';
import Link from 'next/link';

export default async function VerifyPage() {
  return (
    <main className='w-full h-dvh flex items-center justify-center'>
      <Card>
        <CardHeader className='text-center'>
          <div className='size-16 flex items-center justify-center rounded-full bg-secondary mx-auto'>
            <Mail className='size-10' />
          </div>
          <CardTitle>
            <H3>Check your Email</H3>
          </CardTitle>
          <CardDescription>
            We have sent a verification link to your email
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='rounded border border-dashed flex items-center gap-2 justify-center p-2'>
            <AlertCircle className='size-4' />
            <p className='text-sm'>Check your spam folder </p>
          </div>

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
