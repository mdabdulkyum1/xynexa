"use client"
import { useState } from "react";

const PricingToggle = () => {
    const [isMonthly, setIsMonthly] = useState(true);

    return (
        <div className='mb-4 flex justify-between'>
            <div>
                <button className='text-purple-500 btn border-2 border-purple-500 rounded-full p-2 bg-indigo-50'>
                    100% Money-Back Guarantee
                </button>
            </div>
            <div className="flex p-2 border-2 border-purple-500 rounded-xl">
                <button
                    className={`btn p-2 border-none rounded-xl ${isMonthly ? "bg-purple-500 text-white" : "bg-transparent text-purple-500"}`}
                    onClick={() => setIsMonthly(true)}
                >
                    Monthly
                </button>
                <button
                    className={`btn p-2 border-none rounded-xl ${!isMonthly ? "bg-purple-500 text-white" : "bg-transparent text-purple-500"}`}
                    onClick={() => setIsMonthly(false)}
                >
                    Yearly
                </button>
            </div>
        </div>
    );
};

export default PricingToggle;
