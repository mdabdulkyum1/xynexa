'use client'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';

const CheckoutForm = ({amount, plan}) => {
    console.log(amount, plan)

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
}
    return (
        <div>
            <form onSubmit={handleSubmit} className='border-2 space-y-2 p-4'>
                <div className='border-2'>
                   <p>Name:</p>
                <input type="text" name='name'  placeholder='name'/>
                </div>
                <div className='border-2'>
                   <p>Email:</p>
                <input type="text" name='email'  placeholder='email'/>
                </div>
                <div className='border-2'>
                   <p>Amount:</p>
                <input type="text" name='amount'  placeholder='amount'/>
                </div>
                <div className='border-2 mb-2'>
                   <p>Plan</p>
                <input type="text" name='plan'  placeholder='plan'/>
                </div>
            <CardElement
        options={{
          style: {
            base: {
               
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
     
      <button className='btn btn-primary' type="submit" disabled={!stripe}>
        Pay
      </button>
            </form>
        </div>
    );
};

export default CheckoutForm;