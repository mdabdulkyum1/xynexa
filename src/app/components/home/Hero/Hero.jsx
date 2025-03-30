'use client';


const Hero = () => {


    return (
        <div
            style={{
                backgroundImage: `linear-gradient(to right, #131831 30%, transparent), url('https://i.ibb.co.com/1fq0mpyp/pexels-photo-3182784.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'multiply',
            }}
            className="mt-16 h-[300px] lg:mt-[72px] lg:h-full lg:min-h-screen lg:flex items-center justify-center relative text-center"
        >
            <div className="absolute inset-0 bg-gray-500 opacity-20 text-white"></div>
            <div className="container mx-auto px-6 lg:px-32 flex flex-col lg:flex-row items-center justify-between gap-10 h-full">
                {/* Text Container */}
                <div className="w-full lg:w-3/5 mx-auto text-white lg:space-y-5 md:pt-12">
                    <h2 className="text-2xl lg:text-5xl text-center uppercase lg:leading-[70px] font-bold pt-4">
                    Boost collaboration, <span className="text-teal-500 hidden lg:flex">efficiency, growth </span>
                         <span className="text-teal-600">profits</span> like an expert
                    </h2>

                    <p className="text-xs lg:text-lg text-center mb-2 lg:mb-8">
                        XYnexa is the smarter project management platform that keeps
                        your client projects on track, your resourcing in check, and your
                        profits on point.
                    </p>

                    <div className="flex justify-center items-center gap-3">
                        <button className="btn bg-teal-500 text-white border-none text-lg rounded-lg px-2 lg:px-8 py-3">
                            Get Started <span className="hidden lg:flex">for free</span>
                        </button>

                        <button className="btn btn-outline text-white text-lg rounded-lg px-4 lg:px-8 py-3">
                            Book a demo
                        </button>
                    </div>

                   
                </div>

                {/* Image Container */}
                <div className="relative w-full lg:w-3/5 flex justify-center lg:justify-end lg:absolute bottom-0 right-0">

                </div>
            </div>
        </div>
    );
};

export default Hero;
