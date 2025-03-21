import React from "react";
import { CheckCircle, Clock, Hourglass } from "lucide-react";

const OverViewCard = () => {
  const cardData = [
    {
      icon: <CheckCircle size={36} />,
      value: "1220",
      label: "Total Task",
      gradient: "bg-gradient-to-r from-purple-400 to-purple-200",
    },
    {
      icon: <Hourglass size={36} />,
      value: "07",
      label: "InProgress",
      gradient: "bg-gradient-to-r from-blue-400 to-blue-200",
    },
    {
      icon: <Clock size={36} />,
      value: "43",
      label: "Pending",
      gradient: "bg-gradient-to-r from-red-400 to-red-200",
    },
    {
      icon: <CheckCircle size={36} />,
      value: "1550",
      label: "completed",
      gradient: "bg-gradient-to-r from-green-400 to-green-200",
    },
  ];

  return (
    <div className="grid grid-cols-4 mt-6 gap-4">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`flex max-w-[250px] justify-center items-center p-4 text-white gap-3 rounded-4xl ${card.gradient} shadow-md`}
        >
          <div className="mb-2">{card.icon}</div>
          <div className="">
            <div className="text-2xl font-semibold">{card.value}</div>
            <div className="">{card.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverViewCard;
