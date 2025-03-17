'use client'
import { useState } from "react";
import { motion } from "framer-motion";

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

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="container mx-auto p-6 md:p-10 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center">Frequently Asked Questions</h2>
            <p className="text-center text-gray-600 mt-2">Find answers to the most common questions about our team management system.</p>

            <div className="mt-8 space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-gray-100 rounded-lg shadow-md">
                        <button 
                            className="w-full text-left p-4 flex justify-between items-center font-semibold text-lg"
                            onClick={() => toggleFAQ(index)}
                        >
                            {faq.question}
                            <span className={`text-purple-600 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}>
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
