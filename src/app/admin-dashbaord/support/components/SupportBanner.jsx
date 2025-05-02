import React from 'react';

const SupportBanner = () => {
    return (
        <>
            <div className="animated-banner shadow-md rounded-lg p-4 flex flex-col items-center justify-center h-[300px] lg:h-[400px] text-white">
                <h1 className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-7 text-center drop-shadow-md">
                    How can we help you?
                </h1>
            </div>

            <style>
                {`
                    @keyframes gradientAnimation {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }

                    .animated-banner {
                        background: linear-gradient(
                            -45deg,
                            #014E4E,   /* Primary */
                            #4B0082,   /* Indigo (dark purple) */
                            #014E4E,   /* Purple */
                            #505050,   /* Dark gray */
                            #4A4A4A,   /* Slightly lighter dark gray */
                            #014E4E    /* Loop back to primary */
                        );
                        background-size: 400% 400%;
                        animation: gradientAnimation 12s ease infinite;
                        color: white;
                    }
                `}
            </style>
        </>
    );
};

export default SupportBanner;
