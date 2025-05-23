"use client";

import { format } from "date-fns";
import { enGB } from "date-fns/locale";

interface Props {
  selectedDate: string;
  onChange: (value: string) => void;
}

// Generate a list of date options for the dropdown
function generateDateOptions() {
  const options = [
    { label: "All days", value: "all" },
    { label: "Today", value: "today" },
    { label: "Tomorrow", value: "tomorrow" },
  ];

  // Get today's date and remove the time part
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Add the next 9 days to the list
  for (let i = 2; i <= 11; i++) {
    const future = new Date(today);
    future.setDate(today.getDate() + i);

    const label = format(future, "EEEE dd MMM", { locale: enGB });
    const value = format(future, "yyyy-MM-dd");

    options.push({ label, value });
  }

  return options;
}

export default function DateSelector({ selectedDate, onChange }: Props) {
  return (
    <div className="mt-6">
      {/* Date selection dropdown */}
      <select
        onChange={(e) => onChange(e.target.value)}
        value={selectedDate}
        className="ml-4 px-2 pr-26 py-3 border rounded-xl bg-black cursor-pointer"
      >
        {generateDateOptions().map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}