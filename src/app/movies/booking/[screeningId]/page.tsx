import BookingManager from "./BookingManager";

interface PageProps {
  params: { screeningId: string };
}

export default async function BookingPage({ params }: PageProps) {
  const resolvedParams = await params;
  const screeningId = resolvedParams.screeningId;

  return <BookingManager screeningId={screeningId} />;
}
