import Image from 'next/image';

const ContactBanner = () => {
    return (
        <section className="container   mx-auto p-6 md:p-10 py-10 ">
            <div className="md:my-20">
            <h2 className="text-3xl md:text-5xl font-bold text-center">
                Let's get in touch.
            </h2>
            <p className="text-center text-gray-600 mt-2">
                Feel free to reach out to us using the options below, and our dedicated team will respond to your inquiries promptly.
            </p>
            </div>

            <div className="mt-10 flex flex-col md:flex-row bg-gray-100 rounded-lg overflow-hidden shadow-md">
               
                <div className="md:w-1/2 relative rounded-lg ">
                   
                    <Image 
                        src="/assets/contact/hero-contact.jpg" 
                        alt="Customer support"
                        layout="fill"
                        objectFit="cover"
                        className="absolute inset-0 "
                    />
                
                    <div className="absolute inset-0 bg-black opacity-30 z-10"></div>

                   
                    <div className="absolute bottom-4 left-[20%] max-w-2/3 text-white p-4 rounded-lg z-20">
                        <p className="text-2xl font-bold">
                            “This software simplifies the website building process, making it a breeze to manage our online presence.”
                        </p>
                        <span className="block font-bold mt-2">Abdul Kaiyum</span>
                        <span className="text-xs">Founder & CEO</span>
                    </div>
                </div>

               
                <div className="md:w-1/2 bg-[#ECAB4F] p-6 md:p-20">
                    <p className="text-gray-700 mb-4">
                        Have a question or feedback? Fill out the form below, and we'll get back to you as soon as possible.
                    </p>
                    <form className="space-y-4">
                        <div className="flex gap-4">
                            <input type="text" placeholder="Full name" className="w-1/2 p-2 border rounded" />
                            <input type="email" placeholder="Your email" className="w-1/2 p-2 border rounded" />
                        </div>
                        <input type="text" placeholder="Subject" className="w-full p-2 border rounded" />
                        <textarea placeholder="Your message.." className="w-full p-2 border rounded h-24"></textarea>
                        <button className="w-full bg-primary text-white py-2 rounded">
                            Send message
                        </button>
                    </form>
                    <p className="text-sm text-center mt-4">
                        Or drop us a message via <a href="mailto:email@example.com" className="text-primary underline">email</a>.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ContactBanner;
