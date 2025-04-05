import Image from 'next/image';

const ContactBanner = () => {
    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-10 py-10">
            <div className="my-10 text-center">
                <h2 className="text-2xl md:text-4xl font-bold mt-10 mb-2 lg:mb-6 lg:pt-14">
                    Let's get in touch.
                </h2>
                <p className="text-gray-600 dark:text-gray-200 mt-2 text-xs lg:text-[16px]">
                    Great teamwork starts with great communication! Reach out to us and let’s build something amazing together.
                </p>
            </div>

            <div className="mt-10 flex flex-col lg:flex-row bg-gray-100 rounded-lg overflow-hidden shadow-md">
                {/* Left Side - Image Section */}
                <div className="relative w-full lg:w-1/2 h-96 lg:h-auto">
                    <Image 
                        src="/assets/contact/hero-contact.jpg" 
                        alt="Customer support"
                        layout="fill"
                        
                        className="absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-gray-800 opacity-30"></div>

                    {/* Quote Box */}
                    <div className="absolute bottom-4 left-6 sm:left-12 max-w-[80%] text-white p-4 bg-transparent bg-opacity-50 rounded-lg">
                        <p className="text-lg sm:text-2xl font-bold">
                            “Your success is our priority! Whether you need support or want to explore our features, we’re here to assist you.”
                        </p>
                        <span className="block font-bold mt-2">Abdul Kyum</span>
                        <span className="text-xs">Founder & CEO</span>
                    </div>
                </div>

                {/* Right Side - Form Section */}
                <div className="w-full lg:w-1/2 bg-[#EAEEF1] p-6 sm:p-10 flex flex-col justify-center">
                    <p className="text-gray-700 mb-4 text-center md:text-left">
                        Have a question or feedback? Fill out the form below, and we'll get back to you as soon as possible.
                    </p>
                    
                    <form className="grid grid-cols-1 gap-4">
                        <input 
                            type="text" 
                            placeholder="Full Name" 
                            className="p-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none"
                        />
                        <input 
                            type="email" 
                            placeholder="Email" 
                            className="p-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none"
                        />
                        <input 
                            type="text" 
                            placeholder="Subject" 
                            className="p-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none"
                        />
                        <textarea 
                            placeholder="Message" 
                            rows="4"
                            className="p-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none"
                        ></textarea>

                        {/* Styled Button */}
                        <div className="relative w-full flex justify-center text-center mt-6">
                            <button className="bg-teal-900 text-white text-center font-semibold px-6 py-3 rounded-t-lg  gap-2 shadow-md hover:bg-gray-200 hover:text-teal-900 hover:border-2 hover:border-teal-900 transition w-full">
                                SEND MESSAGE 
                                
                            </button>
                            
                        </div>
                    </form>

                    
                </div>
            </div>
        </section>
    );
};

export default ContactBanner;
