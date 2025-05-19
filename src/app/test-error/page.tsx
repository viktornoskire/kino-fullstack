export default function ErrorTestPage() {
  throw new Error("This is a test error. The error message will show here in real error");
  return <div>You will never see this</div>;
}