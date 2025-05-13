import BookingManager from "./BookingManager";

interface PageProps {
  params: { id: string };
}

export default function BookingPage({}: PageProps) {
  return (
    <main className="w-full px-4 py-8">
      <BookingManager />
    </main>
  );
}
