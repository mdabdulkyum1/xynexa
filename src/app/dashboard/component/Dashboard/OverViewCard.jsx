import React from "react";
import { CheckCircle, Clock, Hourglass } from "lucide-react";

const OverViewCard = ({ summary }) => {
  

  const overallSummary = summary?.overallSummary || {}; 

  const cardData = [
    {
      icon: <CheckCircle size={30} />,
      value: overallSummary?.totalTasks || 0,
      label: "Total Task",
      gradient: "bg-gradient-to-r from-teal-400 to-teal-200",
    },
    {
      icon: <Clock size={30} />,
      value: overallSummary?.inProgressTasks || 0,
      label: "Pending",
      gradient: "bg-gradient-to-r from-red-400 to-red-200",
    },
    {
      icon: <Hourglass size={30} />,
      value: overallSummary?.todoTasks || 0,
      label: "InProgress",
      gradient: "bg-gradient-to-r from-blue-400 to-blue-200",
    },
    
    {
      icon: <CheckCircle size={30} />,
      value: overallSummary?.doneTasks || 0,
      label: "completed",
      gradient: "bg-gradient-to-r from-amber-400 to-amber-200",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 mt-6 gap-4">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`flex max-w-[250px] justify-center items-center p-4 text-white gap-3 rounded-xl ${card.gradient} shadow-md`}
        >
          <div className="mb-2 dark:text-black">{card.icon}</div>
          <div className="">
            <div className="text-xl lg:text-2xl font-semibold dark:text-black">{card.value}</div>
            <div className="dark:text-black text-xs lg:text-xl">{card.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverViewCard;