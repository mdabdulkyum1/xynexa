import Link from 'next/link';
import './getstart.css';
import { FaCheck } from "react-icons/fa";

const Pricing = () => {
    return (
        <div className=" flex items-center justify-center p-6 my-10 lg:my-20">
            {/* Main Container */}
            <div className="w-full container bg-white dark:bg-transparent p-10 rounded-lg  text-center relative z-10">
                <h2 className="text-3xl font-bold mb-3">Pricing Plans Great</h2>
                <p className="text-gray-500 dark:text-gray-300 mb-6">StartAI features that will help your company scale faster</p>

                {/* Pricing Cards Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Free Plan */}
                    <div className="relative bg-gradient-to-br from-orange-100 to-orange-200 p-8 rounded-2xl shadow-md overflow-hidden">
                        <svg className="absolute top-0 right-5 w-1/2 h-full opacity-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480">
                            <path d="M450.9 169.7a99.4 99.4 0 0 0-140.6 0 99.4 99.4 0 1 0-140.6 0 99.4 99.4 0 1 0 0 140.6 99.4 99.4 0 1 0 140.6 0 99.4 99.4 0 0 0 140.6-140.6ZM169.7 310.3l140.6-140.6" fill="#808"></path>
                        </svg>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-2 text-gray-700">Free</h3>
                            <p className="text-gray-500 text-left">Entry-level plan for individuals or small teams or large teams.</p>
                            <button className="getstart block border  text-black border-gray-500 w-full mt-6 py-2 px-3 text-sm font-semibold leading-6 text-center rounded-md hover:shadow-purple-200 dark:hover:shadow-purple-800  hover:scale-105 duration-300 cursor-pointer">
                                View Details
                            </button>
                            <ul className="mt-4 space-x-2 md:space-y-4 text-left text-gray-700">
                                <li className="flex items-center"><span className="font-bold mr-2"><FaCheck /></span> 5 Projects</li>
                                <li className="flex items-center"><span className="font-bold mr-2"><FaCheck /></span> 10 Teams</li>
                                <li className="flex items-center"><span className="font-bold mr-2"><FaCheck /></span> 50 Tasks</li>
                            </ul>
                        </div>
                    </div>

                    {/* Business Plan */}
                    <div className="relative bg-gradient-to-br from-purple-100 to-purple-200 p-8 rounded-2xl shadow-md overflow-hidden">
                        <svg className="absolute top-0 right-10 w-1/2 h-full opacity-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480">
                            <path d="M240 0H0a240 240 0 0 0 240 240h240A240 240 0 0 0 240 0ZM240 240H0a240 240 0 0 0 240 240h240a240 240 0 0 0-240-240Z" fill="#808"></path>
                        </svg>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-2 text-gray-700">Diamond</h3>
                            <p className="text-gray-500 text-left">For Mid-level teams needing essential collaboration tools.</p>
                            <button className="getstart block border text-black border-gray-500 w-full mt-6 py-2 px-3 text-sm font-semibold leading-6 text-center rounded-md hover:shadow-purple-200 dark:hover:shadow-purple-800  hover:scale-105 duration-300 cursor-pointer">
                                <Link href="/pricing">View Details</Link>
                                
                            </button>
                            <ul className="mt-4 space-x-2 md:space-y-4 text-left text-gray-700">
                                <li className="flex items-center"><span className="font-bold mr-2"><FaCheck /></span> 10 Projects</li>
                                <li className="flex items-center"><span className="font-bold mr-2"><FaCheck /></span> 30 Teams</li>
                                <li className="flex items-center"><span className="font-bold mr-2"><FaCheck /></span> 100 Tasks</li>
                            </ul>
                        </div>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 p-8 rounded-2xl shadow-md overflow-hidden">
                        <svg className="absolute top-0 left-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480">
                            <path d="M480 0H120v120h120v120h120v120h120V0zM0 480h360V360H240V240H120V120H0v360z" fill="#808"></path>
                        </svg>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-2 text-gray-700">Platinum</h3>
                            <p className="text-gray-500 text-left">Comprehensive plan for large, feature-demanding teams.</p>
                            <button className="getstart block border text-black border-gray-500 w-full mt-6 py-2 px-3 text-sm font-semibold leading-6 text-center rounded-md hover:shadow-purple-200 dark:hover:shadow-purple-800  hover:scale-105 duration-300 cursor-pointer">
                            <Link href="/pricing">View Details</Link>
                            </button>
                            <ul className="mt-4 space-x-2 md:space-y-4 text-left text-gray-700">
                                <li className="flex items-center"><span className="font-bold mr-2"><FaCheck /></span> 20 Projects</li>
                                <li className="flex items-center"><span className="font-bold mr-2"><FaCheck /></span> 50 Teams</li>
                                <li className="flex items-center"><span className="font-bold mr-2"><FaCheck /></span> Unlimited Tasks</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;