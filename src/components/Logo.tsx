export default function Logo({ className }: { className?: string }) {
  return (
    <>
      <span className={`text-yellow-500 ${className}`}>X </span>
      <span className={`text-blue-500 ${className}`}>O</span>
    </>
  );
}
