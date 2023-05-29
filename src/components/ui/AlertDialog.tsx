"use client";

import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import Button from "./Button";
import clsx from "clsx";

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = ({
  className,
  children,
  ...props
}: AlertDialogPrimitive.AlertDialogPortalProps): JSX.Element => (
  <AlertDialogPrimitive.Portal className={clsx(className)} {...props}>
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center mb-1 sm:mb-0">
      {children}
    </div>
  </AlertDialogPrimitive.Portal>
);

AlertDialogPortal.displayName = AlertDialogPrimitive.Portal.displayName;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay> & {
    className?: string;
  }
>(
  ({ className, children, ...props }, ref): JSX.Element => (
    <AlertDialogPrimitive.Overlay
      className={clsx(
        "`fixed inset-0 z-50 transition-opacity animate-in fade-in",
        className
      )}
      {...props}
      ref={ref}
    />
  )
);
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(
  ({ className, ...props }, ref): JSX.Element => (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        ref={ref}
        className={clsx(
          "fixed z-50 grid w-full max-w-lg scale-100 gap-3 bg-slate-700/90 p-6 opacity-100 shadow-lg sm:rounded-lg  md:w-full",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
);
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title> & {
    className?: string;
  }
>(
  ({ className, ...props }, ref): JSX.Element => (
    <AlertDialogPrimitive.Title
      ref={ref}
      className={clsx("text-lg font-semibold", className)}
      {...props}
    />
  )
);
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description> & {
    className?: string;
  }
>(
  ({ className, ...props }, ref): JSX.Element => (
    <AlertDialogPrimitive.Description
      ref={ref}
      className={clsx("text-sm", className)}
      {...props}
    />
  )
);
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> & {
    className?: string;
  }
>(
  ({ className, children, ...props }, ref): JSX.Element => (
    <AlertDialogPrimitive.Action asChild ref={ref} {...props}>
      <Button variant="yellow" className={clsx("mt-2 sm:mt-0", className)}>
        {children}
      </Button>
    </AlertDialogPrimitive.Action>
  )
);
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> & {
    className?: string;
  }
>(
  ({ className, children, ...props }, ref): JSX.Element => (
    <AlertDialogPrimitive.Cancel asChild ref={ref} {...props}>
      <Button className={clsx("mt-2 sm:mt-0", className)}>{children}</Button>
    </AlertDialogPrimitive.Cancel>
  )
);
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
