
import Image from "next/image";


const AboutBanner = () => {
    return (
        <>
            <div>
                <div className=" w-11/12 lg:w-2/3 mx-auto text-center p-4 lg:pb-16 lg:pt-16">
                    <h2 className="text-2xl md:text-3xl lg:text-7xl font-bold mb-4 lg:mb-8">About XYnexa.</h2>
                    <p className="text-xs md:text-[20px]"> Our platform transforms teamwork with real-time updates, task management, and smart time tracking—ensuring efficiency like never before. Whether you're a startup or a growing enterprise, streamline workflows, enhance communication, and achieve goals faster. Unite. Organize. Succeed.Boost efficiency with a platform designed to streamline tasks, enhance communication, and track progress in real time.  </p>
                </div>
                <div className="px-4 lg:px-20 flex flex-col lg:flex-row gap-4 mb-8">


                    <div className="w-full lg:w-2/4 h-[200px] md:h-[400px] lg:h-[600px] overflow-hidden group md:hidden lg:flex">
                        <Image
                            src="/assets/images/about-banner1.jpg"
                            alt="Seamless workflow"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-full h-full rounded-2xl transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>

                    <div className="w-full h-[200px] md:h-[500px] lg:h-[600px] overflow-hidden group">
                        <Image
                            src="/assets/images/about-banner2.jpg"
                            alt="Seamless workflow"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>

                </div>
            </div>
        </>
    );
};

export default AboutBanner;