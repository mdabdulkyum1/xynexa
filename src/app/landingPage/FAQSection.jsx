'use client'
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "Is my data safe with your platform?",
    answer:
      "We use encryption protocols to safeguard data transmission, regularly monitor for any vulnerabilities, and implement industry standard security practices. Rest assured, your data is in safe hands.",
  },
  {
    question: "What kind of customer support do you offer?",
    answer:
      "We offer 24/7 customer support through live chat, email, and an extensive knowledge base to help you solve any issues quickly.",
  },
  {
    question: "How does the pricing for your SaaS solution work?",
    answer:
      "We offer flexible subscription plans based on your usage and team size. You can upgrade, downgrade, or cancel at any time.",
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes, you can cancel your subscription at any time from your account dashboard. No hidden fees or penalties.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-white">
      <button className="bg-[#20B7AB1A] text-[#20B7AB] px-4 py-1 rounded-full text-sm font-medium mb-4 mx-auto block">
        💬 FAQ
      </button>
      <h2 className="text-3xl md:text-4xl font-bold text-center dark:text-white text-black mb-2">
        Some of the things you may want to know
      </h2>
      <p className="text-center text-gray-400 mb-10">
        We answered questions so you dont have to ask them.
      </p>

      {faqs.map((faq, index) => (
        <div
          key={index}
          className="mb-4 rounded-xl dark:bg-[#1A1A1A] text-black border-2 dark:text-white px-6 py-4 cursor-pointer"
          onClick={() => toggleFAQ(index)}
        >
          <div className="flex justify-between items-center text-lg font-medium">
            {faq.question}
            {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {openIndex === index && (
            <p className="mt-3 text-black dark:text-gray-300 text-sm">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQSection;
