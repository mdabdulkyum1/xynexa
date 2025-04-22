'use client'
import React, { useState } from 'react';
import { CiDollar } from "react-icons/ci";

const Pricing = () => {
    const [isYearly, setIsYearly] = useState(false);

    const pricingData = {
        Starter: {
            title: 'Starter',
            description: 'For driven individuals who want to start with essential features and resources to kickstart your journey.',
            price: isYearly ? 90 : 9,
            features: [
                'Standard analytics',
                'Unlimited tracking',
                'Basic AI model',
                'Standard integrations',
                'Email support'
            ],
            buttonText: 'Get started'
        },
        Pro: {
            title: 'Pro',
            description: 'For ambitious professionals who require more innovative and additional tools to stay ahead of the competition.',
            price: isYearly ? 190 : 19,
            features: [
                'Advanced analytics',
                'Unlimited tracking',
                'Custom AI model',
                'Custom integrations',
                'Premium support'
            ],
            buttonText: 'Get started',
            popular: true
        },
        Enterprise: {
            title: 'Enterprise',
            description: 'For companies who want advanced features with specific needs to achieve better business results.',
            price: 'Custom',
            features: [
                'Advanced analytics',
                'Unlimited tracking',
                'Custom AI model',
                'Custom integrations',
                'Premium support'
            ],
            buttonText: 'Contact us'
        }
    };

    return (
        <div className=' text-white py-10 px-4'>
            <div className='flex justify-center items-center mb-4'>
                <button className='flex items-center gap-1 text-[#20B7AB] border-2 border-[#20B7AB] px-4 py-2 rounded-full'>
                    <CiDollar className='text-2xl' />
                    <span className='text-xl'>Pricing</span>
                </button>
            </div>

            <h1 className='text-center text-3xl font-bold py-2 text-black dark:text-white'>Supercharge your growth</h1>
            <p className='text-center text-xl py-2 max-w-3xl mx-auto text-black dark:text-white'>
                Whether you're a small startup, a growing mid-sized business, or a large enterprise, we have plans tailored to your specific demands.
            </p>

            <div className='flex justify-center my-6'>
                <div className='flex dark:bg-[#1F1F1F] bg-gray-400 rounded-full p-1'>
                    <button 
                        className={`px-4 py-1 rounded-full transition ${!isYearly ? 'bg-[#20B7AB] dark:text-white text-black font-semibold' : 'dark:text-gray-400'}`}
                        onClick={() => setIsYearly(false)}
                    >
                        Monthly
                    </button>
                    <button 
                        className={`px-4 py-1 rounded-full transition ${isYearly ? 'bg-[#20B7AB] dark:text-white text-black font-semibold' : 'dark:text-gray-400'}`}
                        onClick={() => setIsYearly(true)}
                    >
                        Yearly
                    </button>
                </div>
            </div>

            <div className='grid md:grid-cols-3 gap-6 max-w-6xl mx-auto'>
                {Object.entries(pricingData).map(([key, plan]) => (
                    <div 
                        key={key} 
                        className={`relative rounded-2xl border p-6 flex flex-col justify-between min-h-[540px] transition hover:outline outline-[#20B7AB] ${plan.popular ? 'border-[#20B7AB]' : 'border-gray-700'} dark:bg-[#1A1A1A] text-black dark:text-white`}
                    >
                       
                        {plan.popular && (
                            <div className='absolute top-4 right-4 bg-[#20B7AB] text-white text-sm px-3 py-1 rounded-full'>
                                Popular
                            </div>
                        )}
                        <div>
                            <h2 className='text-2xl font-bold mb-2 whitespace-nowrap overflow-hidden text-ellipsis'>{plan.title}</h2>
                            <p className='mb-4 text-gray-400'>{plan.description}</p>
                            <p className='text-3xl font-bold mb-4'>
                                {plan.price === 'Custom' ? 'Custom' : `$${plan.price}`}<span className='text-base font-medium'>/{isYearly ? 'year' : 'month'}</span>
                            </p>
                            <ul className='mb-6 space-y-2 text-sm dark:text-gray-300'>
                                {plan.features.map((feature, i) => (
                                    <li key={i} className='flex items-center'>
                                        <span className='text-green-500 mr-2'>✔</span> {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button className='w-full bg-[#20B7AB] text-white py-2 rounded-full hover:bg-[#199b94] transition mt-auto'>
                            {plan.buttonText}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pricing;
