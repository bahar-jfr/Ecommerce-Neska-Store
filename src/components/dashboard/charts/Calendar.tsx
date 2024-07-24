
import { Calendar } from "@/components/ui/calendar";
import { faIR } from "date-fns/locale/fa-IR";
import { useState } from "react";

export function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      id="Calender"
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border text-primary-foreground bg-white w-1/2"
      locale={faIR}
    />
  );
}
