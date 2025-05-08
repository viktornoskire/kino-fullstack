import CinemaSeating from "./Seatings"
import TicketSelector from "./TicketSelector"

export default function IndividualMovie() {
    return(
        <main className="container mx-auto py-8">

        <h1>movie individual page</h1>
            <TicketSelector />
            <CinemaSeating />
        </main>
    )
}