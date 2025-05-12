export default function Spinner() {
  return (
    <div
      className="animate-spin inline-block size-10 rounded-full border-4 border-kino-darkred border-t-transparent"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
