export interface Tickets {
  regular: number;
  kids: number;
  student: number;
  senior: number;
}

export interface TicketSelectorProps {
  onTotalTicketsChange: (totalTickets: number) => void;
  onFinalPriceChange: (finalPrice: number) => void;
  onTicketSummaryChange: (summary: string) => void;
}
