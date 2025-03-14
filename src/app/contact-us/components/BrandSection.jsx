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
        <section className="container mx-auto p-6 md:p-10  ">
            <h2 className="text-center text-lg md:py-12 font-semibold text-gray-800 mb-6">
                Trusted by well-known brands.
            </h2>

            <div className="flex  flex-wrap justify-between items-center gap-10">
                {brands.map((brand, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <Image src={brand.logo} alt={brand.name} width={150} height={140} className="grayscale hover:grayscale-0 transition-all duration-300" />
                        
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BrandSection;
