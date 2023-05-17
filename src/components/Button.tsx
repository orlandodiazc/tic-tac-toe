import { ComponentProps } from "react";

export default function Button({
  variant,
  className,
  ...rest
}: ComponentProps<"button"> & { variant?: "yellow" | "blue" }) {
  const variantClasses =
    variant === "yellow"
      ? "bg-yellow-500/90 shadow-yellow-600"
      : variant === "blue"
      ? "bg-blue-400/90 shadow-blue-500"
      : "bg-slate-400/90 shadow-slate-500";
  return (
    <button
      {...rest}
      className={`grid place-content-center p-2 rounded tracking-wide font-semibold shadow-down hover:opacity-90 ${variantClasses} ${className}`}
    ></button>
  );
}
