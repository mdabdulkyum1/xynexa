import Image from 'next/image';

const ContactOptions = () => {
    const options = [
        {
            icon: "/assets/contact/location.png", 
            title: "Visit us",
            description: "Don Valley, Toronto, CA",
            linkText: "View on maps →",
            linkHref: "#"
        },
        {
            icon: "/assets/contact/chat.png", 
            title: "Via chat",
            description: "Get instant answers.",
            linkText: "Let's chat →",
            linkHref: "#"
        },
        {
            icon: "/assets/contact/report.png", 
            title: "Report Issue",
            description: "Get priority support.",
            linkText: "Send report →",
            linkHref: "#"
        },
        {
            icon: "/assets/contact/community.png", 
            title: "Our community",
            description: "Connect with users.",
            linkText: "Join us now →",
            linkHref: "#"
        },
    ];

    return (
        <section className="container mx-auto p-6 md:p-10 py-12 text-center">
        <h2 className="text-3xl md:py-12 md:text-5xl font-bold">Other ways to reach us</h2>
    
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {options.map((option, index) => (
                <div 
                    key={index} 
                    className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center transition-transform duration-500 hover:-translate-y-3 hover:shadow-lg"
                >
                    <div className="relative w-12 h-12 mb-4">
                        <Image src={option.icon} alt={option.title} layout="intrinsic" width={68} height={68} />
                    </div>
                    <h3 className="text-lg font-bold">{option.title}</h3>
                    <p className="text-gray-600">{option.description}</p>
                    <a href={option.linkHref} className="text-primary font-semibold mt-2">
                        {option.linkText}
                    </a>
                </div>
            ))}
        </div>
    </section>
    
    );
};

export default ContactOptions;
