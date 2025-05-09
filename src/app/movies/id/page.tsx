import DateDropdown from "./Datedropdown";
import BookingManager from "./BookingManager";

export default function IndividualMovie() {
  return (
    <main className="w-full px-4 py-8 relative">
      {/* BookingManager innehåller både TicketSelector och CinemaSeating */}
      <BookingManager />

      {/* DateDropdown positionerad med standard Tailwind-klasser */}
      <div className="absolute right-80 top-140">
        <DateDropdown />
      </div>
    </main>
  );
}
