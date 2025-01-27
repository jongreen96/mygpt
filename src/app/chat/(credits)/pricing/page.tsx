'use client';

import { Button } from '@/components/ui/button';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function PricingPage() {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch('/api/checkout_sessions', { method: 'POST' });
    const session = await response.json();
    await stripe?.redirectToCheckout({ sessionId: session.sessionId });
  };

  return (
    <div className='flex h-dvh items-center justify-center'>
      <Button onClick={handleCheckout}>TEST</Button>
    </div>
  );
}
