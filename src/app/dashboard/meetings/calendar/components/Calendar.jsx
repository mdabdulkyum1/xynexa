"use client";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import CustomToolbar from "./CustomToolbar";


const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
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
    {
      title: "Team Meeting",
      start: new Date(2025, 2, 26, 14, 0),
      end: new Date(2025, 2, 28, 15, 0),
    },
  ]);

  // Filter events based on selected date
  const filteredEvents = events.filter((event) =>
    moment(event.start).isSame(selectedDate, "day")
  );

  // Get all event dates to highlight in DatePicker
  const eventDates = events.map((event) => moment(event.start).format("YYYY-MM-DD"));

  return (
    <div>
      {/* Date Picker */}
      <div className="relative mb-4">
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="px-4 py-2 bg-primary dark:bg-background dark:border-2 text-white rounded-md cursor-pointer"
        >
          {moment(selectedDate).format("MMMM YYYY")}
        </button>

        {showCalendar && (
          <div className="absolute z-50 p-2 shadow-lg mt-2 rounded-md bg-white">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setCurrentMonth(moment(date).toDate());
                setShowCalendar(false);
              }}
              inline
              onMonthChange={(month) => setCurrentMonth(month)}
              dayClassName={(date) =>
                eventDates.includes(moment(date).format("YYYY-MM-DD"))
                  ? "bg-green-500 text-white rounded-full"
                  : ""
              }
            />
          </div>
        )}
      </div>

      {/* Calendar */}
      <div style={{ height: "500px" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          date={currentMonth}
          onNavigate={(date) => setCurrentMonth(date)}
          style={{ height: "100%", transition: "all 1.3s ease-in-out" }}
          components={{
            toolbar: CustomToolbar, // Use custom toolbar
          }}
        />
      </div>
    </div>
  );
};

export default MyCalendar;
