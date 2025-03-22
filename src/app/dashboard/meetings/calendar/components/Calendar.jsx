"use client";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [events, setEvents] = useState([
    {
      title: "Project Meeting",
      start: new Date(2025, 2, 13, 10, 0),
      end: new Date(2025, 2, 13, 11, 0),
    },
    {
      title: "Client Call",
      start: new Date(2025, 2, 15, 14, 0),
      end: new Date(2025, 2, 15, 15, 0),
    },
  ]);

  // Filter events based on selected date
  const filteredEvents = events.filter((event) =>
    moment(event.start).isSame(selectedDate, "day")
  );
 
  return (
    <div>
      {/* Date Picker */}
      <div className="relative mb-4">
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {moment(selectedDate).format("MMMM YYYY")}
        </button>

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

      {/* Calendar */}
      <div style={{ height: "500px" }}>
        <Calendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
        />
      </div>
    </div>
  );
};


export default MyCalendar;
