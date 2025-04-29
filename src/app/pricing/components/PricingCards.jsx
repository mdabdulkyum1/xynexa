"use client";

import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useAxiosPublic from "@/hooks/AxiosPublic/useAxiosPublic";
import { useUserDataFromClerk } from "@/hooks/useUserDataFromClerk";
import SelectPaymentModal from "./SelectPaymentModal";

const plans = [
  {
    name: "Free",
    price: "FREE",
    priceAmount: 0,
    features: [
      "100MB Storage",
      "Unlimited Tasks",
      "Unlimited Free Plan",
      "Two-Factor Authentication",
      "Collaborative Docs",
    ],
    bgColor: "bg-[#EAEEF1]",
    textColor: "text-[#014E4E]",
  },
  {
    name: "Diamond",
    price: "$ 12",
    priceAmount: 12,
    features: [
      "Unlimited Storage",
      "Unlimited Integrations",
      "Unlimited Dashboards",
      "Guests with Permissions",
      "Unlimited Gantt Charts",
    ],
    bgColor: "bg-[#014E4E]",   
    textColor: "text-white", 
  },
  
  {
    name: "Platinum",
    price: "$ 25",
    priceAmount: 25,
    features: [
      "White Labeling",
      "Advanced Permissions",
      "Conditional Logic in Forms",
      "Enterprise API",
      "Unlimited Custom Roles",
    ],
    bgColor: "bg-[#EAEEF1]",
    textColor: "text-[#014E4E]",
  },
];

const PricingCards = () => {
    const router = useRouter();
    const { userData } = useUserDataFromClerk();
    console.log(userData)
    const packageInfo = userData?.user?.package;
    const userId = userData?.user?._id;
    console.log("userId", userId)
  
    const axiosPublic = useAxiosPublic();
    const [showModal, setShowModal] = useState(false);
    const [claimed, setClaimed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState("");
    const [selectedPlan, setSelectedPlan] = useState(""); 
    const [selectedAmount, setSelectedAmount] = useState(0); 
  
    const handleClaimFree = async () => {
      try {
        const res = await axiosPublic.patch("/api/packageUpdate", {
          packageName: "free",
          _id: userId,
        });
        if (res.data.success) {
          setClaimed(true);
          setShowModal(false);
        }
      } catch (error) {
        console.error("Error claiming free plan:", error);
      }
    };
  
    const handleSelectPayment = (method) => {
      setSelectedPayment(method);
    };
  
    useEffect(() => {
      if (selectedPayment && selectedPlan) {
        const path = selectedPayment === "Stripe" ? "/payment/stripe" : "/payment/ssl";
        router.push(`${path}?plan=${selectedPlan}&amount=${selectedAmount}`);
      }
    }, [selectedPayment, selectedPlan, selectedAmount, router]);
  
    const handleOpenPaymentModal = (planName, planAmount) => {
      setSelectedPlan(planName);
      setSelectedAmount(planAmount);
      setIsModalOpen(true);
    };
  
    return (
      <div className="my-10 lg:my-20 w-11/12 mx-auto">
        {/* --- Heading and Intro --- */}
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.name} className={`${plan.bgColor} p-8 rounded-lg`}>
              <h3 className={`font-bold text-xl lg:text-3xl ${plan.textColor}`}>{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.name === "Free" ? "Best for personal uses" : plan.name === "Diamond" ? "Best for mid-sized teams" : "Best for large teams"}</p>
              <h3 className={`font-extrabold text-2xl lg:text-4xl mb-4 ${plan.textColor}`}>{plan.price}</h3>
  
              {/* --- Feature List --- */}
              <div className="text-left">
                <h3 className="font-bold text-xl mb-2">Key Features:</h3>
                <ul className="space-y-2 list-disc list-inside">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className={`flex items-center ${plan.textColor}`}>
                      <FaCheck className="text-green-500 mr-2" /> {feature}
                    </li>
                  ))}
                </ul>
              </div>
  
              {/* --- Button --- */}
              <div className="mt-6">
                {plan.name === "Free" ? (
                  packageInfo === "free" || claimed ? (
                    <button className="btn w-full bg-[#014E4E] text-white font-bold" disabled>
                      {claimed ? "Claimed" : "Already Claimed"}
                    </button>
                  ) : (
                    <button onClick={() => setShowModal(true)} className="btn w-full bg-[#014E4E] text-white font-bold">
                      Claim
                    </button>
                  )
                ) : (
                  packageInfo === plan.name.toLowerCase() ? (
                    <button className="btn w-full bg-white text-[#014E4E] font-bold cursor-not-allowed" disabled>
                      {plan.name} Claimed
                    </button>
                  ) : (
                    <button
                      onClick={() => handleOpenPaymentModal(plan.name.toLowerCase(), plan.priceAmount)}
                      className="btn w-full bg-white text-[#014E4E] font-bold"
                    >
                      Claim {plan.name}
                    </button>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
  
        {/* Free Plan Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full text-center">
              <h2 className="text-xl font-bold mb-4 text-[#014E4E]">Claim Free Plan</h2>
              <p className="text-gray-700 mb-6">
                Are you sure you want to claim this free plan and enjoy all its features?
              </p>
              <div className="flex justify-center gap-4">
                <button onClick={handleClaimFree} className="bg-[#014E4E] text-white font-semibold py-2 px-4 rounded-lg">
                  Yes, Claim Now
                </button>
                <button onClick={() => setShowModal(false)} className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
  
        {/* Diamond or Platinum Payment Modal */}
        <SelectPaymentModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          onSelectPayment={handleSelectPayment}
        />
      </div>
    );
  };
  

export default PricingCards;
