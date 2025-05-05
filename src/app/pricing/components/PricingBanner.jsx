import React from "react";

const PricingBanner = () => {
  return (
    <div
      className="h-[400px] flex items-center justify-center bg-cover bg-center relative rounded-2xl"
      style={{ backgroundImage: "url('https://i.ibb.co.com/8gDgjJcM/simple-background-with-gradient-shape-green-vector.jpg')" }}
    >
     
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative  text-white p-10 rounded-2xl text-center max-w-2xl">
        <h2 className="text-3xl lg:text-5xl font-bold mb-4"> Plans for Every Budget</h2>
        <p className="text-base text-gray-400">
        Choose a pricing plan that suits your needs. Transparent pricing with no hidden fees—get the best value for your money!
        </p>
      </div>
    </div>
  );
};

export default PricingBanner;
