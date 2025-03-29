import Image from 'next/image';

const BrandSection = () => {
    const brands = [
        { name: "Capsule", logo: "/assets/contact/brand-01.svg" },
        { name: "Layers", logo: "/assets/contact/brand-02.svg" },
        { name: "Polymath", logo: "/assets/contact/brand-03.svg" },
        { name: "Segment", logo: "/assets/contact/brand-04.svg" },
        { name: "Alt+Shift", logo: "/assets/contact/brand-05.svg" },
    ];

    return (
        <section className="container mx-auto p-6 md:p-10 my-10 lg:my-20">
            <h2 className="text-center text-2xl md:text-4xl font-bold md:py-12 text-gray-800 dark:text-gray-200 mb-6">
                Trusted by well-known brands.
            </h2>

            <div className="flex flex-wrap justify-center lg:justify-between items-center gap-8">
                {brands.map((brand, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <Image src={brand.logo} alt={brand.name} width={150} height={140} className="lg:grayscale hover:grayscale-0 transition-all duration-300 dark:p-4 border-2 dark:rounded-lg dark:bg-[#EAEEF1]" />
                        
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BrandSection;
