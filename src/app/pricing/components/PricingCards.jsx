import React from 'react';
import PricingToggle from './PricingToggle';
import { FaCheck } from "react-icons/fa";

const PricingCards = () => {
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
                    <p className='text-gray-600 mb-4'>Best for personal use</p>
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
                    <button className='btn w-full p-2 border-none mt-4 lg:px-4 rounded-lg bg-[#014E4E] text-white font-bold'>
                        Claim
                    </button>
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
                    <button className='btn w-full border-none p-2 mt-4 lg:px-4 rounded-lg bg-white text-[#014E4E] font-bold'>Claim</button>
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