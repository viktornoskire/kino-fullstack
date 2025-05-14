import BookingPageWrapper from "./BookingPageWrapper";

interface PageProps {
  params: { screeningId: string };
}

export default async function BookingPage({ params }: PageProps) {
  const resolvedParams = await params;
  const screeningId = resolvedParams.screeningId;

  return <BookingPageWrapper screeningId={screeningId} />;
}