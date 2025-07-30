import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export { stripePromise };

// Subscription plans configuration
export const STRIPE_PLANS = {
  cosmic: {
    priceId: 'price_cosmic_monthly', // Replace with actual Stripe price ID
    name: 'Cosmic',
    amount: 999, // $9.99 in cents
  },
  mystic: {
    priceId: 'price_mystic_monthly', // Replace with actual Stripe price ID  
    name: 'Mystic',
    amount: 1999, // $19.99 in cents
  },
  oracle: {
    priceId: 'price_oracle_monthly', // Replace with actual Stripe price ID
    name: 'Oracle',
    amount: 4999, // $49.99 in cents
  }
};

export async function createCheckoutSession(priceId: string) {
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ priceId }),
  });

  if (!response.ok) {
    throw new Error('Failed to create checkout session');
  }

  return response.json();
}
