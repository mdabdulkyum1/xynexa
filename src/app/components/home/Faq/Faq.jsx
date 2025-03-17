"use client"
import FAQSection from "@/app/contact-us/components/FAQSection";
import { useState } from "react";

const Faq = () => {
  const faqs = [
    {
      question: "How can the platform help with Operations management?",
      answer: "Our platform streamlines operations by providing workflow automation, task tracking and real-time collaboration. Teams can efficiently manage projects, track progress and optimize productivity.",
    },
    {
      question: "How does the platform support Creative & Design teams?",
      answer: "ACreative teams can use our platform to collaborate on design projects, share files, and receive real-time feedback. Integration with design tools ensures a smooth workflow from ideation to execution.",
    },
    {
      question: "What features are available for Product & Software development teams?",
      answer: "Our platform includes agile project management tools, issue tracking and sprint planning. Developers can collaborate seamlessly, integrate with version control systems and manage software lifecycles efficiently.",
    },
    {
      question: "How does the platform assist HR & Recruiting teams?",
      answer: "HR teams can manage recruitment pipelines, track applicants, and schedule interviews effortlessly. The platform also helps with employee onboarding, performance tracking, and internal communication.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row lg:items-start lg:gap-10">
    <div className="lg:w-1/2  text-center lg:text-left lg:mt-40 mb-6 lg:mb-0 ">
      <span className="bg-primary text-white px-3 py-1 rounded-md text-sm font-semibold dark:text-white">Frequently Asked Questions?</span>
      <h2 className="text-2xl font-bold mt-2">Do you have any questions?</h2>
      <p className="text-gray-600 mt-2 text-sm md:text-base">
      Below you’ll find answers to the most common questions about our Xynexa platform and its features. If you still can’t find what you're looking for, feel free to reach out to us. <br/> 
        
        <a href="#" className="text-blue-500 mt-0.5">contact us</a>.
      </p>
    </div>

    <div className="lg:w-1/2 space-y-4">
      <FAQSection/>
      
    </div>
  </div>
);


};

export default Faq;