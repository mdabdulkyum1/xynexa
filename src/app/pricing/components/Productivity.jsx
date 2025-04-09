import { FaCheck } from "react-icons/fa";

const Productivity = () => {
    return (
        <div className=" w-11/12 mx-auto my-10 lg:my-28">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 lg:mb-12 dark:text-white">
                Take your productivity to the next level
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">

               
              
                <div className=" rounded-lg p-6 shadow-lg bg-white relative bg-gradient-to-br from-pink-50 to-pink-300 ">
                   
                    <h3 className="text-xl font-bold mt-6 text-gray-700 ">One AI for all your work</h3>
                    <p className="text-gray-600 mt-2">
                        Instantly power up company-wide AI that connects every aspect of your work.
                    </p>
                    <p className="text-sm text-start text-gray-500 mt-4 flex items-center"><span className="font-bold mr-2"><FaCheck /></span>Add to any paid plan for $7/user/month</p>
                    <p className="text-sm text-start text-gray-500 mt-4 flex items-center"><span className="font-bold mr-2"><FaCheck /></span>1 live workshops/month</p>
                    <div className="lg:mt-11 md:mt-5 flex flex-col md:flex-row gap-3">
                        <button className="product bg-primary hover:bg-white hover:text-primary  text-white py-2 px-4 rounded-lg w-full md:w-auto dark:bg-teal-800 dark:text-white">
                            Start using Xynexa AI
                        </button>
                        <button className="bg-pink-100 hover:bg-primary 
                         text-primary hover:text-white dark:text-black py-2 px-4 rounded-lg w-full md:w-auto">
                            Learn more
                        </button>
                    </div>
                </div>
               
                

               
                <div className=" rounded-lg p-6 shadow-lg bg-white bg-gradient-to-br from-indigo-50 to-indigo-300 relative">
                    
                    <h3 className="text-xl font-bold mt-6 text-gray-700">Live training & support</h3>
                    <p className="text-gray-600 mt-2">
                        Personalized expert guidance for setup and success.
                    </p>
                    <ul className="text-gray-500 text-sm mt-4 space-y-1 text-start">
                        <li className="flex items-center"><span className="font-bold mr-2"><FaCheck /></span> 2 hours of 1:1 expert time/month</li>
                        <li className="flex items-center"><span className="font-bold mr-2"><FaCheck /></span>Quarterly reviews for goal alignment</li>
                        <li className="flex items-center"><span className="font-bold mr-2"><FaCheck /></span> 2 live workshops/month</li>
                    </ul>
                    <div className="mt-6 flex flex-col md:flex-row gap-3">
                        <button className="bg-primary hover:bg-white hover:text-primary text-white py-2 px-4 rounded-lg w-full md:w-auto dark:bg-teal-800 dark:text-white">
                            Get Xynexa Assist
                        </button>
                        <button className="bg-pink-100 hover:bg-primary hover:text-white text-primary py-2 px-4 rounded-lg w-full md:w-auto dark:text-black">
                            Learn more
                        </button>
                    </div>
                </div>
               
            </div>
        </div>
    );
};

export default Productivity;