"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4 rounded-md shadow-md bg-white", className)}
      classNames={{
        months: "flex flex-col space-y-4",
        month: "space-y-4 w-full",
        caption: "flex justify-between items-center px-2",
        caption_label: "text-md font-semibold dark:text-black",
        nav: "flex items-center gap-1",
        nav_button: cn(
          "h-8 w-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100 transition",
          "bg-white text-gray-500 dark:text-black"
        ),
        table: "w-full border-collapse dark:text-black",
        head_row: "dark:text-black",
        head_cell: "text-center text-sm w-8 dark:text-black",

        row: "flex justify-between dark:text-black",
        cell: cn(
          "relative p-0 text-sm text-center w-8 h-8 dark:text-black",
          props.mode === "range"
            ? "[&:has(>.day-range-start)]:rounded-l-md [&:has(>.day-range-end)]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-full"
        ),
        day: cn(
          "h-8 w-8 rounded-md p-0 font-normal text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-primary transition",
          "aria-selected:bg-black aria-selected:text-white"
        ),
        day_selected:
          "bg-black text-white hover:bg-black focus:bg-black focus:text-white",
        day_today: "font-semibold text-black",
        day_outside: "text-gray-300 dark:text-black",
        day_disabled: "text-gray-300 dark:text-black opacity-50",
        day_range_middle:
          "bg-gray-200 text-gray-800 dark:text-black",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("w-4 h-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("w-4 h-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  )
}

export { Calendar }
