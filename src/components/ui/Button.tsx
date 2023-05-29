import React from "react";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";

type ButtonVariant = "yellow" | "blue" | "default";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  className?: string;
  variant?: ButtonVariant;
};

const buttonVariantClasses: Record<ButtonVariant, string> = {
  default: "bg-slate-400/90 shadow-slate-500",
  yellow: "bg-yellow-500/90 shadow-yellow-600",
  blue: "bg-blue-500/90 shadow-blue-600",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={clsx(
          "inline-flex justify-center items-center h-9 px-2 rounded tracking-wide font-semibold shadow-down hover:opacity-90",
          buttonVariantClasses[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export default Button;
