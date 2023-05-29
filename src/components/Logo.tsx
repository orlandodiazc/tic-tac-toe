import clsx from "clsx";

export default function Logo({
  className,
}: {
  className?: string;
}): JSX.Element {
  return (
    <>
      <span className={clsx("text-yellow-500", className)}>X</span>
      <span className={clsx("text-blue-500", className)}>O</span>
    </>
  );
}
