"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

export function CalendarDemo() {
    const [date, setDate] = React.useState(new Date());
  
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return <div>Loading...</div>;
    }
  
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow  "
      />
    );
  }
