'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const faqs = [
    {
        question: "How can I add a new team member?",
        answer: "You can add a new team member by navigating to the 'Team' section in the dashboard and clicking on 'Add Member'. Fill in the details and send an invitation."
    },
    {
        question: "Can I assign roles to team members?",
        answer: "Yes, you can assign different roles to team members under the 'Settings' section. Roles help in defining permissions and access levels."
    },
    {
        question: "How do I track project progress?",
        answer: "You can track project progress using the built-in project dashboard. It provides real-time updates on tasks, deadlines, and overall project completion."
    },
    {
        question: "Is there a way to integrate third-party tools?",
        answer: "Yes, our system allows integration with various third-party tools like Slack, Google Drive, and Trello. You can find integrations under the 'Settings' section."
    }
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const pathname = usePathname(); // Get the current route

    // Hide FAQ section completely if pathname is "/"
    if (pathname === "/") return null;

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="container mx-auto p-6 md:p-10 max-w-4xl my-10">
            {/* Heading and description, only visible when not on home page */}
            {pathname !== "/" && (
                <>
                    <h2 className="text-2xl md:text-4xl  font-bold text-center">
                        Do you have any questions?
                    </h2>
                    <p className="text-center text-gray-600 dark:text-gray-200 mt-2 lg:mt-6 text-xs lg:text-[16px]">
                        Find answers to the most common questions about our team management system.
                    </p>
                </>
            )}

            {/* FAQ Items */}
            <div className="mt-8 space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-gray-100 rounded-lg shadow-md">
                        <button 
                            className="w-full text-left p-4 flex justify-between items-center font-semibold text-lg dark:text-black"
                            onClick={() => toggleFAQ(index)}
                        >
                            {faq.question}
                            <span className={`text-[#014E4E] transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}>
                                {openIndex === index ? "▲" : "▼"}
                            </span>
                        </button>
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: openIndex === index ? "auto" : 0, opacity: openIndex === index ? 1 : 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className="p-4 text-gray-700 border-t">{faq.answer}</div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQSection;
