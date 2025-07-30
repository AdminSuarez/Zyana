"use client";

import { useState } from 'react';
import { stripePromise, createCheckoutSession, STRIPE_PLANS } from '../../../lib/stripe';

interface PremiumPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
  emoji: string;
}

const plans: PremiumPlan[] = [
  {
    id: "cosmic",
    name: "Cosmic",
    price: 9.99,
    emoji: "🌟",
    features: [
      "All 5 Tarot Reading Types",
      "Complete Astrology Calculator",
      "Daily Horoscopes",
      "Save Unlimited Readings",
      "Cosmic Sound Effects",
      "Priority Support"
    ]
  },
  {
    id: "mystic",
    name: "Mystic",
    price: 19.99,
    emoji: "🔮",
    popular: true,
    features: [
      "Everything in Cosmic",
      "AI-Powered Reading Insights",
      "Personalized Moon Guidance",
      "Advanced Numerology Reports",
      "Exclusive Tarot Spreads",
      "Custom Soundscapes",
      "1-on-1 Support Chat"
    ]
  },
  {
    id: "oracle",
    name: "Oracle",
    price: 49.99,
    emoji: "👑",
    features: [
      "Everything in Mystic",
      "Live Virtual Readings (Monthly)",
      "Personal Astrology Reports",
      "Custom Crystal Recommendations",
      "VIP Community Access",
      "Early Feature Access",
      "Direct Line to Cosmic Guidance"
    ]
  }
];

export function PremiumFeatures() {
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [loading, setLoading] = useState<string>('');

  const handleSubscribe = async (planId: string) => {
    try {
      setLoading(planId);
      setSelectedPlan(planId);
      
      // Get the Stripe price ID for this plan
      const stripePlan = STRIPE_PLANS[planId as keyof typeof STRIPE_PLANS];
      
      if (!stripePlan) {
        throw new Error('Plan not found');
      }

      // Create checkout session
      const { sessionId } = await createCheckoutSession(stripePlan.priceId);
      
      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error('Stripe checkout error:', error);
          alert('Payment failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading('');
    }
  };

  return (
    <div className="min-h-screen bg-cosmic-dark py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-cosmic-gold mb-4">
            ✨ Unlock Your Cosmic Potential ✨
          </h1>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            Choose your level of cosmic guidance and transform your spiritual journey
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`cosmic-card p-8 relative ${
                plan.popular ? 'ring-2 ring-cosmic-gold scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-cosmic-gold text-cosmic-dark px-4 py-1 rounded-full text-sm font-bold">
                    ⭐ Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="text-4xl mb-2">{plan.emoji}</div>
                <h3 className="text-2xl font-bold text-cosmic-gold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold mb-1">
                  ${plan.price}
                  <span className="text-lg opacity-60">/month</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-cosmic-purple mr-2">✨</span>
                    <span className="text-sm opacity-90">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading === plan.id}
                className={`w-full cosmic-button py-3 ${
                  plan.popular 
                    ? 'bg-cosmic-gold text-cosmic-dark hover:bg-yellow-400' 
                    : ''
                } ${loading === plan.id ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading === plan.id ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin mr-2">🌟</span>
                    Processing...
                  </span>
                ) : (
                  'Start Your Journey'
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Free Tier */}
        <div className="cosmic-card p-6 text-center">
          <h3 className="text-xl font-bold text-cosmic-gold mb-2">
            🌙 Free Cosmic Explorer
          </h3>
          <p className="opacity-75 mb-4">
            Start your journey with basic daily guidance and limited features
          </p>
          <ul className="text-sm opacity-60 mb-4">
            <li>• 1 Daily Tarot Reading</li>
            <li>• Basic Zodiac Info</li>
            <li>• Limited Sound Effects</li>
          </ul>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-12 opacity-60">
          <p className="text-sm mb-2">🔒 Secure payments • Cancel anytime • 30-day money-back guarantee</p>
          <p className="text-xs">Trusted by thousands of cosmic seekers worldwide</p>
        </div>
      </div>
    </div>
  );
}
