"use client";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([
    {
      title: "Project Meeting",
      start: new Date(2025, 2, 13, 10, 0), // March 13, 2025, 10 AM
      end: new Date(2025, 2, 13, 11, 0),
    },
    {
      title: "Client Call",
      start: new Date(2025, 2, 15, 14, 0), // March 15, 2025, 2 PM
      end: new Date(2025, 2, 15, 15, 0),
    },
  ]);

  return (
    <div style={{ height: "500px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default MyCalendar;
