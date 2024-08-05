import { NextRequest, NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true }
    });
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });

  } catch (e) {
    console.error(`Internal Error: `, e);
    return NextResponse.json({ error: `Internal Server Error ${e}` }, { status: 500 });
  }
}
