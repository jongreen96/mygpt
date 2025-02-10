import { addCredits, logTransaction } from '@/lib/db';
import { sendAdminTransactionEmail } from '@/lib/hooks/new-user-email';
import { headers } from 'next/headers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get('stripe-signature');
  let event;

  if (!sig) return new Response('No stripe-signature', { status: 400 });

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.log(err);
    return new Response('Webhook Error', { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
          expand: ['line_items'],
        },
      );

      await fulfillOrder(sessionWithLineItems);
      break;
  }

  return new Response('ok', { status: 200 });
}

async function fulfillOrder(session: Stripe.Checkout.Session) {
  const { userId, pricePaid } = {
    userId: session.client_reference_id,
    pricePaid: session.amount_total,
  };
  if (!userId || !pricePaid) throw new Error('Missing userId or pricePaid');

  await addCredits(userId, pricePaid * 1000);
  await logTransaction(userId, pricePaid);
  await sendAdminTransactionEmail(pricePaid / 100);
}
