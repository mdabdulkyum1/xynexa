"use client"
import React from 'react';
import PricingToggle from './PricingToggle';
// import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

import useAxiosPublic from '@/hooks/AxiosPublic/useAxiosPublic';

import { useUserDataFromClerk } from '@/hooks/useUserDataFromClerk';
import Link from 'next/link';

const PricingCards = () => {


    // const router = useRouter();
    const { userData, isLoading, isError, error } = useUserDataFromClerk();
    const userId = userData?.user?._id
    const packageInfo = userData?.user?.package
    console.log(userData, userId, packageInfo);
    const axiosPublic = useAxiosPublic()

    const [showModal, setShowModal] = useState(false);
    const [claimed, setClaimed] = useState(false);


    const handleClaim = async () => {
        try {
            const res = await axiosPublic.patch('/api/packageUpdate', {
                packageName: 'free',
                _id: userId
            });
            if (res.data.success) {
                setClaimed(true);
                setShowModal(false);
            }
        } catch (error) {
            console.error('Error claiming free plan:', error);
        }
    };

    // const handleClick = () => {
    //     // Static payment URL with query parameters
    //     router.push(`/payment?plan=Pro&amount=50`);
    //   };
    return (
        <div className='my-10 lg:my-20 w-11/12 mx-auto'>
            <div className='flex flex-col justify-center items-center mb-8 lg:mb-16'>
                <button className='btn p-2 lg:p-4 bg-[#EAEEF1] border-none rounded-lg mb-3'>Pricing Plans</button>
                <h2 className='text-2xl lg:text-4xl font-bold'>Choose the Plan Right for You</h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {/* card-1 */}
                <div className='bg-[#EAEEF1] p-8 rounded-lg'>
                    <h3 className='font-bold text-[#014E4E] text-xl lg:text-3xl'>Free</h3>
                    <p className='text-gray-600 mb-4'>Best for personal uses</p>
                    <h3 className='font-extrabold text-[#014E4E] text-2xl lg:text-4xl mb-4'>FREE</h3>
                    <div className='text-gray-600 text-left'>
                        <h3 className='font-bold text-xl'>Key Features:</h3>
                        <ul className='space-y-2 list-disc list-inside text-gray-600'>
                            <li className="flex items-center"><span className="font-bold mr-2"><FaCheck /></span>100MB Storage</li>
                            <li className="flex items-center"><span className="font-bold mr-2"><FaCheck /></span>Unlimited Tasks</li>
                            <li className="flex items-center"><span className="font-bold mr-2"><FaCheck /></span> Unlimited Free Plan</li>
                            <li className="flex items-center"><span className="font-bold mr-2"><FaCheck /></span> Two-Factor Authentication</li>
                            <li className="flex items-center"><span className="font-bold mr-2"><FaCheck /></span>Collaborative Docs</li>
                        </ul>
                    </div>
                    {
                        packageInfo === 'free' ?

                            <button
                                disabled={true}
                                onClick={() => setShowModal(true)}
                                className='btn w-full p-2 border-none mt-4 lg:px-4 rounded-lg bg-[#014E4E] text-white font-bold'
                            >
                                Claimed
                            </button>
                            :
                            <button
                                onClick={() => setShowModal(true)}
                                className='btn w-full p-2 border-none mt-4 lg:px-4 rounded-lg bg-[#014E4E] text-white font-bold'
                            >
                                {claimed ? 'Claimed' : 'Claim'}
                            </button>
                    }

                    {/* modal */}
                    {showModal && (
                        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
                            <div className='bg-white p-6 rounded-lg max-w-sm w-full text-center'>
                                <h2 className='text-xl font-bold mb-4 text-[#014E4E]'>Claim Free Plan</h2>
                                <p className='text-gray-700 mb-6'>Are you sure you want to claim this free plan and enjoy all its features?</p>
                                <div className='flex justify-center gap-4'>
                                    <button
                                        onClick={handleClaim}
                                        className='bg-[#014E4E] text-white font-semibold py-2 px-4 rounded-lg'
                                    >
                                        Yes, Claim Now
                                    </button>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className='bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg'
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>


                {/* card-2 */}
                <div className='bg-[#014E4E] dark:bg-teal-600 text-white p-8 rounded-lg'>
                    <h3 className='font-bold  text-xl lg:text-3xl'>Diamond</h3>
                    <p className='mb-4'>Best for mid-sized teams</p>
                    <h3 className='font-extrabold text-2xl lg:text-4xl mb-4'>$ 12</h3>
                    <div className='text-left'>
                        <h3 className='font-bold text-xl'>Key Features:</h3>
                        <ul className='space-y-2 list-disc list-inside text-white'>
                            <li className="flex items-center"><span className="font-bold mr-2"><FaCheck /></span>
                                Unlimited Storage</li>
                            <li className="flex items-center"><span className="font-bold mr-2"><FaCheck /></span> Unlimited Integrations</li>
                            <li className="flex items-center"><span className="font-bold mr-2"><FaCheck /></span> Unlimited Dashboards</li>
                            <li className="flex items-center"><span className="font-bold mr-2"><FaCheck /></span> Guests with Permissions</li>
                            <li className="flex items-center"><span className="font-bold mr-2"><FaCheck /></span> Unlimited Gantt Charts</li>
                        </ul>
                    </div>
                    <Link href={{
                        pathname: '/payment',
                        query: {
                            plan: 'Diamond',
                            amount: 12
                        }
                    }} className='btn w-full border-none p-2 mt-4 lg:px-4 rounded-lg bg-white text-[#014E4E] font-bold'>claim</Link>
                </div>
                {/* card-3 */}
                <div className='bg-[#EAEEF1] p-8 rounded-lg'>
                    <h3 className='font-bold text-[#014E4E] text-xl lg:text-3xl'>Platinum</h3>
                    <p className='text-gray-600 mb-4'>Best for many large teams</p>
                    <h3 className='font-extrabold text-[#014E4E] text-2xl lg:text-4xl mb-4'>$ 25</h3>
                    <div className='text-gray-600 text-left lg:h-[183px]'>
                        <h3 className='font-bold mb-2 text-xl'>Key Features:</h3>
                        <ul className='space-y-2 list-disc list-inside text-gray-600'>
                            <li className="flex items-center"><span className="font-bold mr-2"><FaCheck /></span>
                                White Labeling</li>
                            <li className="flex items-center"><span className="font-bold mr-2"><FaCheck /></span> Advanced Permissions</li>
                            <li className="flex items-center"><span className="font-bold mr-2"><FaCheck /></span> Conditional Logic in Forms</li>
                            <li className="flex items-center"><span className="font-bold mr-2"><FaCheck /></span> Enterprise API</li>
                            <li className="flex items-center"><span className="font-bold mr-2"><FaCheck /></span> Unlimited Custom Roles</li>
                        </ul>
                    </div>
                    <button className='btn w-full border-none p-2 mt-4 lg:px-4 rounded-lg bg-[#014E4E] text-white font-bold'>Claim</button>
                </div>

            </div>
        </div>
    );
};

export default PricingCards;