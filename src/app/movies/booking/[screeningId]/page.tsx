import BookingManager from "./BookingManager";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ screeningId: string }>;
}) {
  const { screeningId } = await params;

  return <BookingManager screeningId={screeningId} />;
}
