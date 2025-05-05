'use client';
import Image from 'next/image';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

const ContactBanner = () => {
    const form = useRef();

    const sendEmail = async (e) => {
        e.preventDefault();

        try {
            const result = await emailjs.sendForm(
                'service_6seqxf5',  // service ID
                'template_i7h9t0k', // template ID
                form.current,       // form reference
                
                process.env.NEXT_PUBLIC_EMAILJS_API_KEY
            );
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Message sent successfully to admin!',
                confirmButtonColor: '#14b8a6',
                confirmButtonText: 'OK'
              });
            form.current.reset();
        } catch (error) {
            console.error(error.text);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to send the message. Please try again!',
                confirmButtonColor: '#14b8a6', 
                confirmButtonText: 'OK'
              });
        }
    };


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
                        fill
                        className="absolute inset-0 object-cover"
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
                    
                    <form ref={form} onSubmit={sendEmail} className="grid grid-cols-1 gap-4">
                        <input 
                            type="text" 
                            name="user_name"
                            placeholder="Full Name" 
                            className="p-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none"
                            required
                        />
                        <input 
                            type="email" 
                            name="user_email"
                            placeholder="Email" 
                            className="p-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none"
                            required
                        />
                        <input 
                            type="text" 
                            name="subject"
                            placeholder="Subject" 
                            className="p-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none"
                            required
                        />
                        <textarea 
                            placeholder="Message" 
                            name="message"
                            rows="4"
                            className="p-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none"
                            required
                        ></textarea>

                        {/* Styled Button */}
                        <div className="relative w-full flex justify-center text-center mt-6">
                            <button type="submit" className="bg-teal-900 text-white font-semibold px-6 py-3 rounded-t-lg gap-2 shadow-md hover:bg-gray-200 hover:text-teal-900 hover:border-2 hover:border-teal-900 transition w-full">
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
