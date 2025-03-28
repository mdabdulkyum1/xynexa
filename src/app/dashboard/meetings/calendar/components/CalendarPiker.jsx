"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const CalendarPiker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="relative">
      {/* Date Button */}
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        {moment(selectedDate).format("MMMM YYYY")}
      </button>

      {/* Calendar Dropdown */}
      {showCalendar && (
        <div className="absolute z-50 p-2 shadow-lg mt-2 rounded-md">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setShowCalendar(false);
            }}
            inline
          />
        </div>
      )}
    </div>
  );
};

export default CalendarPiker;
