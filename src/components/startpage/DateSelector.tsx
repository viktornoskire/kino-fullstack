"use client";

import { format } from "date-fns";
import { enGB } from "date-fns/locale";

interface Props {
  selectedDate: string;
  onChange: (value: string) => void;
}

function generateDateOptions() {
  const options = [
    { label: "All days", value: "all" },
    { label: "Today", value: "today" },
    { label: "Tomorrow", value: "tomorrow" },
  ];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

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
    <div className="mb-6 mt-6">
      <select
        onChange={(e) => onChange(e.target.value)}
        value={selectedDate}
        className="ml-4 px-2 pr-26 py-3 border rounded-xl bg-black"
      >
        {generateDateOptions().map(({ label, value }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
}
