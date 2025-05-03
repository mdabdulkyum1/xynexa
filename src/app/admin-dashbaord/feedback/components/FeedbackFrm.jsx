'use client';
import React from 'react';
import feedback from '../../../../../public/assets/lottie/feedback.json';
import dynamic from 'next/dynamic';

// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const FeedbackFrm = () => {
    return (
        <div>
            <div className="hero bg-base-200 min-h-[500px] p-4 lg:p-8">
                <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl lg:text-4xl font-bold">Share Your Thoughts With Us</h1>
                        
                        <div>
                            <Lottie animationData={feedback} />
                        </div>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <p className='font-bold text-xl'>We’d Love to Hear From You</p>
                            <fieldset className="fieldset space-y-1">
                                <label className="label">Name</label>
                                <input type="text" className="input bg-gray-200" placeholder="Name" />
                                <label className="label">Email</label>
                                <input type="email" className="input bg-gray-200" placeholder="Email" />
                                <label className="label">Your Feedback</label>
                                <textarea className="textarea bg-gray-200" placeholder="write something"></textarea>
                                <button className="btn bg-primary text-white mt-4 border-none rounded-lg">Submit</button>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackFrm;