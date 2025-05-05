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
    textColor: "text-[#4bc8b7]",
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
    bgColor: "bg-[#4bc8b7]",
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
    textColor: "text-[#4bc8b7]",
  },
];

const PricingCards = () => {
  const router = useRouter();
  const { userData } = useUserDataFromClerk();
  const packageInfo = userData?.user?.package;
  const userId = userData?.user?._id;

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
      const path =
        selectedPayment === "Stripe" ? "/payment/stripe" : "/payment/ssl";
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl border border-white/20 dark:border-white/10 
           dark:bg-white/10 backdrop-blur-md shadow-md 
          hover:scale-[1.02] transform transition-all duration-300 
          p-6 sm:p-8 flex flex-col justify-between ${plan.bgColor}`}
          >
            <div>
              <h3
                className={`font-bold text-2xl lg:text-3xl ${plan.textColor}`}
              >
                {plan.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                {plan.name === "Free"
                  ? "Best for personal uses"
                  : plan.name === "Diamond"
                  ? "Best for mid-sized teams"
                  : "Best for large teams"}
              </p>

              <h3
                className={`font-extrabold text-3xl lg:text-4xl mb-4 ${plan.textColor}`}
              >
                {plan.price}
              </h3>

              <div className="text-left">
                <h4 className="font-semibold text-lg mb-2">Key Features:</h4>
                <ul className="space-y-2 list-disc list-inside">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <FaCheck className="text-green-500 mt-1 mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              {plan.name === "Free" ? (
                packageInfo === "free" || claimed ? (
                  <button
                    className="cursor-default w-full bg-[#4bc8b7] text-white font-semibold py-2 rounded-lg opacity-70"
                    disabled
                  >
                    {claimed ? "Claimed" : "Already Claimed"}
                  </button>
                ) : (
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full bg-[#4bc8b7] text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
                  >
                    Claim
                  </button>
                )
              ) : packageInfo === plan.name.toLowerCase() ? (
                <button
                  className="w-full bg-white text-[#4bc8b7] font-semibold py-2 rounded-lg border border-[#4bc8b7] opacity-70"
                  disabled
                >
                  {plan.name} Claimed
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleOpenPaymentModal(
                      plan.name.toLowerCase(),
                      plan.priceAmount
                    )
                  }
                  className="w-full bg-white text-[#4bc8b7] font-semibold py-2 rounded-lg border border-[#4bc8b7] hover:bg-[#4bc8b7] hover:text-white transition"
                >
                  Claim {plan.name}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modals stay unchanged */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4 text-[#4bc8b7]">
              Claim Free Plan
            </h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to claim this free plan and enjoy all its
              features?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleClaimFree}
                className="bg-[#4bc8b7] text-white font-semibold py-2 px-4 rounded-lg"
              >
                Yes, Claim Now
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <SelectPaymentModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        onSelectPayment={handleSelectPayment}
      />
    </div>
  );
};

export default PricingCards;
