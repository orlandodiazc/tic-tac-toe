import React from "react";
import { Slot } from "@radix-ui/react-slot";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "yellow" | "blue";
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const variantClasses =
      variant === "yellow"
        ? "bg-yellow-500/90 shadow-yellow-600"
        : variant === "blue"
        ? "bg-blue-500/90 shadow-blue-600"
        : "bg-slate-400/90 shadow-slate-500";
    return (
      <Comp
        className={`inline-flex justify-center items-center h-9 px-2 rounded tracking-wide font-semibold shadow-down hover:opacity-90  ${variantClasses} ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export default Button;
