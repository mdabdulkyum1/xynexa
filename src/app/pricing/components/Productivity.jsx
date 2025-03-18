import React from 'react';

const Productivity = () => {
    return (
        <div className="p-6 md:p-12 container mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 dark:text-white">
                Take your productivity to the next level
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                {/* ClickUp Brain Card */}
                <div className="border rounded-xl p-6 shadow-lg bg-white relative bg-gradient-to-br from-orange-100 to-orange-200 ">
                   
                    <h3 className="text-xl font-bold mt-6 dark:text-black">One AI for all your work</h3>
                    <p className="text-gray-600 mt-2 text-center">
                        Instantly power up company-wide AI that connects every aspect of your work, across all your apps.
                    </p>
                    <p className="text-sm text-start text-gray-500 mt-4">✔Add to any paid plan for $7/user/month</p>
                    <div className="lg:mt-11 md:mt-5 flex flex-col md:flex-row gap-3">
                        <button className="product bg-primary hover:bg-violet-300 dark:text-black  text-white py-2 px-4 rounded-lg w-full md:w-auto">
                            Start using Xynexa AI
                        </button>
                        <button className="bg-pink-100 hover:bg-primary hover:text-white
                         text-primary py-2 px-4 rounded-lg w-full md:w-auto">
                            Learn more
                        </button>
                    </div>
                </div>
                {/* ClickUp Assist Card */}
                <div className="border rounded-xl p-6 shadow-lg bg-white bg-gradient-to-br from-blue-100 to-blue-200 relative">
                    
                    <h3 className="text-xl font-bold mt-6 dark:text-black">Live training & support</h3>
                    <p className="text-gray-600 mt-2">
                        Personalized expert guidance for setup and success.
                    </p>
                    <ul className="text-gray-500 text-sm mt-4 space-y-1 text-start">
                        <li>✔ 2 hours of 1:1 expert time/month</li>
                        <li>✔ Quarterly reviews for goal alignment</li>
                        <li>✔ 2 live workshops/month</li>
                    </ul>
                    <div className="mt-6 flex flex-col md:flex-row gap-3">
                        <button className="bg-primary dark:text-black hover:bg-violet-300 text-white py-2 px-4 rounded-lg w-full md:w-auto">
                            Get Xynexa Assist
                        </button>
                        <button className="bg-pink-100 hover:bg-primary hover:text-white text-primary py-2 px-4 rounded-lg w-full md:w-auto">
                            Learn more
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Productivity;