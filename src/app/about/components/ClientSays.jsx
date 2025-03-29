import { LucideCodesandbox, SquareLibraryIcon, TrelloIcon } from "lucide-react";

const ClientSays = () => {

    const clientImg = {
        img1: "https://i.ibb.co/6RKNpzmh/04.webp",
        img2: "https://i.ibb.co/8467sWLz/01.webp",
        img3: "https://i.ibb.co/QjHV47F2/03.webp"
    }

    return (
        <div className="max-w-6xl mx-auto px-2 md:px-4 py-8">
            <div className="mt-8 text-center">
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 lg:mb-12 text-gray-800 dark:text-white">
                    Some clients feedbacks
                </h2>
            </div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 px-4">
                {/* Testimonial 1 */}
                <div className="bg-white rounded-lg shadow-md xl:py-8 md:p-6 w-full md:w-1/3 border p-4">
                    <div className="flex items-center mb-4 text-2xl">
                        <LucideCodesandbox className="mr-2 text-[#014E4E]" size={32} />

                        <span className="font-bold dark:text-black">Boltshift</span>
                    </div>
                    <p className="text-gray-600 text-xs lg:text-[16px]">
                        "We're looking for people who share our vision! Most of our time used to be taken up by most of alternate administrative work whereas now we can focus on building out to help our employees."
                    </p>
                    <div className="mt-6 flex items-center">
                        <img src={clientImg.img1} alt="Mark Zellers Avatar" width={40} height={40} className="rounded-full mr-2" />
                        <div>
                            <span className="font-bold dark:text-[#014E4E]">Mark Zellers</span><br />
                            <span className="text-xs text-gray-600">CEO, Co-Founder.</span>
                        </div>
                    </div>
                </div>

                {/* Testimonial 2 **/}
                <div className="bg-white rounded-lg shadow-md xl:py-8 md:p-6 w-full md:w-1/3 border p-4">
                    <div className="flex items-center mb-4 text-2xl">
                        <TrelloIcon className="mr-2 text-3xl text-[#014E4E]" size={32} />
                        <span className="font-bold dark:text-black">Lightbox</span>
                    </div>
                    <p className="text-gray-600 text-xs lg:text-[16px]">
                        "This powerful tool eliminates the need to leave Salesforce to get things done as I can create a custom proposal with dynamic pricing tables, and get approval from my boss all within 36 minutes."
                    </p>
                    <div className="mt-6 flex items-center">
                        <img src={clientImg.img2} alt="Natalia Larsson Avatar" width={40} height={40} className="rounded-full mr-2" />
                        <div>
                            <span className="font-bold dark:text-[#014E4E]">Natalia Larsson</span><br />
                            <span className="text-xs text-gray-600">Director Of Sales</span>
                        </div>
                    </div>
                </div>

                {/* Testimonial 3 */}
                <div className="bg-white rounded-lg shadow-md xl:py-8 md:p-6 w-full md:w-1/3 border p-4">
                    <div className="flex items-center mb-4 text-2xl">
                        <SquareLibraryIcon className="mr-2 text-3xl text-[#014E4E]" size={32} />
                        <span className="font-bold dark:text-black">Interlock</span>
                    </div>
                    <p className="text-gray-600 text-xs lg:text-[16px]">
                        "We are based in Europe and the latest Data Protection Regulation forces us to look for service suppliers than comply with this regulation and as we look to create our website."
                    </p>
                    <div className="mt-6 flex items-center">
                        <img src={clientImg.img3} alt="Sarah Edrissi Avatar" width={40} height={40} className="rounded-full mr-2" />
                        <div>
                            <span className="font-bold dark:text-[#014E4E]">Sarah Edrissi</span><br />
                            <span className="text-xs text-gray-600">Lead Marketing</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 text-center">
                <a href="#" className="text-[#014E4E] hover:text-[#014E4E] dark:text-white text-xl font-bold">See all feedbacks →</a>
            </div>
        </div>
    );
};

export default ClientSays;