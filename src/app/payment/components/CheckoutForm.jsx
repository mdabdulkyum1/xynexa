'use client'
import Loading from '@/components/loading/Loading';
import useAxiosPublic from '@/hooks/AxiosPublic/useAxiosPublic';
import { useUserDataFromClerk } from '@/hooks/useUserDataFromClerk';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const CheckoutForm = ({ amount, plan }) => {
  const { userData, isLoading, isError, error } = useUserDataFromClerk();
  const axiosPublic = useAxiosPublic()
  const router = useRouter();
  console.log(amount, plan, userData)
  const userName = userData?.user?.firstName
  const userNameLast = userData?.user?.lastName
  const userEmail = userData?.user?.email

  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) {

      return;
    }

    const card = elements.getElement(CardElement)
    if (card == null) {
      return;
    }

    const selectedPlan = e.target.plan.value; 
    const userId = userData?.user?._id; 
  
    try {
      const res = await axiosPublic.patch('/api/packageUpdate', {
        packageName: selectedPlan,
        _id: userId
      });
  
      if (res.data.success) {
        Swal.fire({
          title: 'Success!',
          text: 'Package updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          router.push('/'); 
        });
      }
    } catch (error) {
      console.error('Error updating package:', error);
    }

  }
  return (
    <div>
      {
        isLoading || isError ? (<div className='flex items-center justify-center h-screen'>
          <Loading></Loading>
        </div>)
          :
          (
            <form onSubmit={handleSubmit} className='border-2 rounded-lg space-y-2 p-4 bg-teal-100'>
              <div className='border-2 rounded-lg bg-white p-2'>
                <p>Name:</p>
                <input type="text" name='name' defaultValue={`${userName} ${userNameLast}`} readOnly className='w-full border-none' />
              </div>
              <div className='border-2 rounded-lg bg-white p-2'>
                <p>Email:</p>
                <input type="email" name='email' defaultValue={userEmail} readOnly className='w-full border-none' />
              </div>
              <div className='border-2 rounded-lg bg-white p-2'>
                <p>Amount:</p>
                <input type="number" name='amount' defaultValue={amount} readOnly className='w-full border-none' />
              </div>
              <div className='border-2 mb-2 rounded-lg bg-white p-2'>
                <p>Plan</p>
                <input type="text" name='plan' defaultValue={plan} readOnly className='w-full border-none' />
              </div>
              <div className='border-2 rounded-lg bg-white p-2'>
                <p>Card Details:</p>
                <CardElement
                  options={{
                    style: {
                      base: {
                        backgroundColor: '#fff',
                        padding: '10px',
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                />
              </div>


             <div className='flex justify-center items-center mt-4'>
             <button className='btn bg-primary text-white border-none px-2 lg:px-4' type="submit" disabled={!stripe}>
                Pay
              </button>
             </div>
            </form>
          )
      }

    </div>
  );
};

export default CheckoutForm;