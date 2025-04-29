'use client';

import { Suspense } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useSearchParams } from 'next/navigation';
import CheckoutForm from '../components/CheckoutForm';
import Loading from '@/components/loading/Loading';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function StripePage() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const plan = searchParams.get("plan");

  if (!amount || !plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">Invalid payment information.</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<div><Loading></Loading></div>}>
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8] p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-[#014E4E] text-center">
          Stripe Payment
        </h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm amount={amount} plan={plan} />
        </Elements>
      </div>
    </div>
    </Suspense>
  );
}
