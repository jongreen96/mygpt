import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const userSession = await auth();

  let { amount } = await req.json();
  amount = Math.max(5, Math.min(100, amount));

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Credits Purchase',
            },
            unit_amount: amount * 100, // convert dollars to cents
          },
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
