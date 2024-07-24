"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { DayPicker } from "react-day-picker";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("px-8 py-4", className)}
      classNames={{
        months: "space-y-8 sm:space-x-4 sm:space-y-0",
        month: "space-y-8",
        caption: "flex justify-center text-xl text-center relative pt-4 ",
        caption_label: "text-2xl font-medium",
        nav: "flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-12 w-12 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1  ",
        head_row: "",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-2xl text-center pb-4",
        row: "",
        cell: "h-16 w-16 text-center  ",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          " h-16 w-16   text-2xl aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-secondary-foreground hover:bg-primary hover:text-secondary-foreground focus:bg-primary focus:text-secondary-foreground h-16 w-16",
        day_today: "bg-accent text-accent-foreground  h-16 w-16",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconRight: ({ ...props }) => <ChevronLeft className="h-4 rotate-180 w-4 " />,
        IconLeft: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
