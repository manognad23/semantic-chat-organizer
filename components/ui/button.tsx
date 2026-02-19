"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        ghost: "hover:bg-muted",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonBaseProps = VariantProps<typeof buttonVariants>;

export type ButtonProps = ButtonBaseProps &
  Omit<HTMLMotionProps<"button">, keyof ButtonBaseProps>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };