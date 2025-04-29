'use client'
import { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import useAxiosPublic from '@/hooks/AxiosPublic/useAxiosPublic';
import { useUserDataFromClerk } from '@/hooks/useUserDataFromClerk';
import Loading from '@/components/loading/Loading';

const CheckoutForm = ({ amount, plan }) => {
  const { userData, isLoading, isError } = useUserDataFromClerk();
  const axiosPublic = useAxiosPublic();
  const router = useRouter();

  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState('');
  const [invoiceId, setInvoiceId] = useState('');
  const [err, setErr] = useState('');

  const price = Number(amount) || 0;
  const userId = userData?.user?._id;
  const userEmail = userData?.user?.email;
  const userName = `${userData?.user?.firstName || ''} ${userData?.user?.lastName || ''}`.trim();

  // 🔁 Get clientSecret for payment intent
  useEffect(() => {
    const createPaymentIntent = async () => {
      if (price > 0) {
        try {
          const res = await axiosPublic.post('/api/create-payment-intent', { amount: price });
          setClientSecret(res?.data?.clientSecret);
        } catch (error) {
          console.error('Error creating payment intent:', error);
        }
      }
    };
    createPaymentIntent();
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    // 👉 Step 1: Create PaymentMethod
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.error('Payment method error:', error);
      setErr(error.message);
      return;
    } else {
      setErr('');
    }

    // 👉 Step 2: Confirm payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: userName || 'Anonymous',
          email: userEmail || 'unknown@email.com',
        },
      },
    });

    if (confirmError) {
      console.error('Payment confirmation error:', confirmError);
      setErr(confirmError.message);
      return;
    }

    // ✅ Step 3: On success, save payment + update package
    if (paymentIntent.status === 'succeeded') {
      setInvoiceId(paymentIntent.id);

      const paymentInfo = {
        userId,
        email: userEmail,
        name: userName,
        price,
        transactionId: paymentIntent.id,
        date: new Date(),
        plan,
      };

      try {
        // Save payment info (optional)
        await axiosPublic.post('/api/payments', paymentInfo);

        // Update user's package
        const res = await axiosPublic.patch('/api/packageUpdate', {
          packageName: plan,
          _id: userId,
        });

        if (res.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Payment Successful!',
            text: `Transaction ID: ${paymentIntent.id}`,
          }).then(() => router.push('/'));
        }
      } catch (err) {
        console.error('Error saving payment or updating package:', err);
        setErr('Something went wrong while processing payment.');
      }
    }
  };

  if (isLoading || isError) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loading />
      </div>
    );
  }

  return (
    <div className='max-w-xl mx-auto mt-8'>
      <form onSubmit={handleSubmit} className='space-y-4 p-6 bg-teal-100 rounded-lg shadow'>
        <div className='bg-white p-3 rounded border'>
          <p className='font-semibold'>Name:</p>
          <input readOnly value={userName} className='w-full border-none bg-transparent' />
        </div>

        <div className='bg-white p-3 rounded border'>
          <p className='font-semibold'>Email:</p>
          <input readOnly value={userEmail} className='w-full border-none bg-transparent' />
        </div>

        <div className='bg-white p-3 rounded border'>
          <p className='font-semibold'>Amount:</p>
          <input readOnly value={amount} className='w-full border-none bg-transparent' />
        </div>

        <div className='bg-white p-3 rounded border'>
          <p className='font-semibold'>Plan:</p>
          <input readOnly value={plan} className='w-full border-none bg-transparent' />
        </div>

        <div className='bg-white p-3 rounded border'>
          <p className='font-semibold'>Card Details:</p>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': { color: '#aab7c4' },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>

        {err && <p className='text-red-500'>{err}</p>}
        {invoiceId && <p className='text-green-600 font-bold'>Invoice ID: {invoiceId}</p>}

        <div className='flex justify-center'>
          <button
            type='submit'
            disabled={!stripe || !elements || !clientSecret}
            className='btn bg-primary text-white px-6 py-2 rounded disabled:opacity-50'
          >
            Pay
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
