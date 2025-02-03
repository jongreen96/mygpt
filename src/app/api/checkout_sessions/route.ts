import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  const userSession = await auth();

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1QoVPyAsd3QgDZ8tG9KZsoa4',
          quantity: 1,
        },
      ],
      client_reference_id: userSession?.user.id,
      mode: 'payment',
      success_url: `${process.env.BASE_URL}/chat/success`,
      cancel_url: `${process.env.BASE_URL}/chat/pricing`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (e) {
    console.log(e);
  }
}
