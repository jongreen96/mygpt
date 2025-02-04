'use client';

import { H3 } from '@/components/typography';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { loadStripe } from '@stripe/stripe-js';
import { Wallet } from 'lucide-react';
import { useState } from 'react';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const MIN = 5;
const MAX = 100;

export default function PricingPage() {
  const [newCredits, setNewCredits] = useState(10);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: newCredits }),
    });
    const session = await response.json();
    await stripe?.redirectToCheckout({ sessionId: session.sessionId });
  };

  return (
    <main className='flex h-dvh w-full items-center justify-center'>
      <Card>
        <CardHeader className='text-center'>
          <div className='mx-auto flex size-16 items-center justify-center rounded-full bg-secondary'>
            <Wallet className='size-10' />
          </div>
          <CardTitle>
            <H3>Add Credits</H3>
          </CardTitle>
          <CardDescription>
            Select the amount of credits you want to add. <br />1 Credit ≈ 1 USD
          </CardDescription>
        </CardHeader>

        <CardContent className='space-y-4'>
          <div className='flex items-center gap-2'>
            <Slider
              value={[newCredits]}
              onValueChange={(val) => setNewCredits(val[0])}
              min={MIN}
              max={MAX}
              step={MIN}
            />
            <Input
              value={newCredits}
              onChange={(e) =>
                setNewCredits(Math.max(MIN, Math.min(MAX, +e.target.value)))
              }
              className='w-16 text-center disabled:cursor-default disabled:opacity-100'
              min={MIN}
              max={MAX}
              disabled
            />
          </div>

          <div className='grid grid-cols-3 gap-2'>
            <Button variant='outline' onClick={() => setNewCredits(10)}>
              10
            </Button>
            <Button variant='outline' onClick={() => setNewCredits(20)}>
              20
            </Button>
            <Button variant='outline' onClick={() => setNewCredits(50)}>
              50
            </Button>
          </div>

          <Button onClick={handleCheckout} className='w-full'>
            Purchase {newCredits} credits
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
