import React from 'react';
import PricingToggle from './PricingToggle';

const PricingCards = () => {
    return (
        <div className='my-10 lg:my-20'>
           <PricingToggle></PricingToggle>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {/* card-1 */}
                <div className='bg-purple-50 p-4 rounded-lg'>
                    <h3 className='font-bold text-purple-500 text-xl lg:text-3xl'>Free</h3>
                    <p className='text-gray-600 mb-4'>Best for personal use</p>
                    <h3 className='font-extrabold text-purple-600 text-2xl lg:text-4xl mb-4'>FREE</h3>
                    <div className='text-gray-600 text-left'>
                        <h3 className='font-bold'>Key Features:</h3>
                        <ul className='space-y-2'>
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span> 100MB Storage</li>
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Unlimited Tasks</li>
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Unlimited Free Plan </li>
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Two-Factor Authentication</li>
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Collaborative Docs</li>
                        </ul>
                    </div>
                    <button className='btn p-2 border-none mt-4 lg:px-4 rounded-2xl bg-purple-500 text-white font-bold'>Claim</button>
                </div>
                {/* card-2 */}
                <div className='bg-amber-50 p-4 rounded-lg'>
                    <h3 className='font-bold text-amber-300 text-xl lg:text-3xl'>Boost</h3>
                    <p className='text-gray-600 mb-4'>Best for mid-sized teams</p>
                    <h3 className='font-extrabold text-amber-300 text-2xl lg:text-4xl mb-4'>$ 12</h3>
                    <div className='text-gray-600 text-left'>
                        <h3 className='font-bold'>Key Features:</h3>
                        <ul className='space-y-2'>
                            <li className="flex items-center gap-2"><span className="text-amber-300">✔</span>
                            Unlimited Storage</li>
                            <li className="flex items-center gap-2"><span className="text-amber-300">✔</span>Unlimited Integrations</li>
                            <li className="flex items-center gap-2"><span className="text-amber-300">✔</span> Unlimited Dashboards</li>
                            <li className="flex items-center gap-2"><span className="text-amber-300">✔</span> Guests with Permissions</li>
                            <li className="flex items-center gap-2"><span className="text-amber-300">✔</span>Unlimited Gantt Charts</li>
                        </ul>
                    </div>
                    <button className='btn border-none p-2 mt-4 lg:px-4 rounded-2xl  bg-amber-500 text-white font-bold'>Claim</button>
                </div>
                {/* card-3 */}
                <div className='bg-green-50 p-4 rounded-lg'>
                    <h3 className='font-bold text-green-500 text-xl lg:text-3xl'>Power</h3>
                    <p className='text-gray-600 mb-4'>Best for many large teams</p>
                    <h3 className='font-extrabold text-green-600 text-2xl lg:text-4xl mb-4'>$ 25</h3>
                    <div className='text-gray-600 text-left'>
                        <h3 className='font-bold'>Key Features:</h3>
                        <ul className='space-y-2'>
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span> 
                            White Labeling</li>
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span>Advanced Permissions</li>
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Conditional Logic in Forms</li>
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Enterprise API</li>
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Unlimited Custom Roles</li>
                        </ul>
                    </div>
                    <button className='btn border-none p-2 mt-4 lg:px-4 rounded-2xl bg-green-500 text-white font-bold'>Claim</button>
                </div>

            </div>
        </div>
    );
};

export default PricingCards;