import Image from 'next/image';

const insights = [
    {
        category: "Strategy",
        title: "Top 5 reasons to invest in marketing",
        author: "David",
        date: "Apr 3, 2024",
        image: "/assets/contact/img-11.jpg",
    },
    {
        category: "Marketing",
        title: "How can marketing help your business?",
        author: "Allen",
        date: "Apr 3, 2024",
        image: "/assets/contact/img-12.jpg", 
    },
    {
        category: "Business",
        title: "The ultimate guide to marketing success",
        author: "Kevin",
        date: "Apr 1, 2024",
        image: "/assets/contact/img-13.jpg", 
    },
];

const InsightsSection = () => {
    return (
        <section className="bg-beige md:py-20 md:mt-20 bg-secondary dark:bg-gray-950 dark:mb-16">
            <div className="container mx-auto text-center p-10">
                <h2 className="text-2xl md:text-4xl font-bold mb-4 lg:mb-16">Gain valuable insights</h2>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {insights.map((insight, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="relative w-full h-56">
                                <Image src={insight.image} alt={insight.title} fill />
                                <span className="absolute top-3 left-3 bg-[#014E4E] text-white text-xs font-semibold px-3 py-1 rounded-lg">
                                    {insight.category}
                                </span>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-bold dark:text-black">{insight.title}</h3>
                                <div className="flex  text-center items-center justify-center text-sm text-gray-500 mt-2">
                                    <span className="mr-2">👤 {insight.author}</span> • <span className="ml-2">{insight.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6">
                    <a href="/" className="text-[#014E4E] dark:text-white font-semibold">
                        View more articles →
                    </a>
                </div>
            </div>
        </section>
    );
};

export default InsightsSection;
