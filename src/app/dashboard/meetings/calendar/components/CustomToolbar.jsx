"use client";

const CustomToolbar = ({ label, onNavigate, onView }) => {
  return (
    <div className="flex justify-between items-center p-3 rounded-md bg-white dark:bg-gray-800 shadow-md">
      {/* Navigation Buttons */}
      <div>
        <button
          onClick={() => onNavigate("TODAY")}
          className="px-4 py-2 bg-primary dark:bg-black text-white rounded-md mr-2 cursor-pointer"
        >
          Today
        </button>
        <button
          onClick={() => onNavigate("PREV")}
          className="px-4 py-2 bg-gray-500 dark:bg-gray-700 text-white rounded-md mr-2 cursor-pointer"
        >
          Back
        </button>
        <button
          onClick={() => onNavigate("NEXT")}
          className="px-4 py-2 bg-gray-500 dark:bg-gray-700 text-white rounded-md cursor-pointer"
        >
          Next
        </button>
      </div>

      {/* Current Month */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {label}
      </h3>

      {/* View Mode Buttons */}
      <div>
        <button
          onClick={() => onView("month")}
          className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md mr-2 cursor-pointer"
        >
          Month
        </button>
        <button
          onClick={() => onView("week")}
          className="px-4 py-2 bg-gray-500 dark:bg-gray-700 text-white rounded-md mr-2 cursor-pointer"
        >
          Week
        </button>
        <button
          onClick={() => onView("day")}
          className="px-4 py-2 bg-gray-500 dark:bg-gray-700 text-white rounded-md mr-2 cursor-pointer"
        >
          Day
        </button>
        <button
          onClick={() => onView("agenda")}
          className="px-4 py-2 bg-gray-500 dark:bg-gray-700 text-white rounded-md cursor-pointer"
        >
          Agenda
        </button>
      </div>
    </div>
  );
};

export default CustomToolbar;
