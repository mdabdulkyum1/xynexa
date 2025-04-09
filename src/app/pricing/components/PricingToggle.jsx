"use client"
import { useState } from "react";

const PricingToggle = () => {
    const [isMonthly, setIsMonthly] = useState(true);

    return (
        <div className='mb-4 flex justify-between'>
            <div>
                <button className='text-[#014E4E] dark:bg-white btn border-2 border-[#014E4E] rounded-lg p-2 bg-indigo-50'>
                    100% Money-Back Guarantee
                </button>
            </div>
            <div className="flex">
                <button
                    className={`btn p-2 border-none rounded-lg ${isMonthly ? "bg-[#014E4E] text-white" : "bg-transparent dark:bg-white text-[#014E4E]"}`}
                    onClick={() => setIsMonthly(true)}
                >
                    Monthly
                </button>
                <button
                    className={`btn p-2 border-none rounded-lg ${!isMonthly ? "bg-[#014E4E] text-white" : "bg-transparent dark:bg-white text-[#014E4E]"}`}
                    onClick={() => setIsMonthly(false)}
                >
                    Yearly
                </button>
            </div>
        </div>
    );
};

export default PricingToggle;
