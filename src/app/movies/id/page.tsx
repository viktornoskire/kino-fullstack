import DateDropdown from "./Datedropdown"
import CinemaSeating from "./Seatings"
import TicketSelector from "./TicketSelector"

export default function IndividualMovie() {
    return(
        <main className="w-full px-4 py-8 relative">
            {/* TicketSelector till vänster */}
            <div className="max-w-md">
                <TicketSelector />
            </div>
            
            {/* DateDropdown positionerad med standard Tailwind-klasser */}
            <div className="absolute right-80 top-140">
                <DateDropdown />
            </div>
            
            {/* CinemaSeating */}
            <div className="mt-8">
                <CinemaSeating />
            </div>
        </main>
    )
}