"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PipelineStepProps {
  label: string;
  isActive: boolean;
  isCompleted: boolean;
  index: number;
}

export function PipelineStep({
  label,
  isActive,
  isCompleted,
  index,
}: PipelineStepProps) {
  return (
    <motion.div
      layout
      className={cn(
        "relative flex flex-col items-center gap-2 sm:flex-row sm:items-center",
        "min-w-0 shrink-0"
      )}
      initial={false}
      animate={{
        scale: isActive ? 1.03 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <motion.div
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 transition-colors",
          "sm:h-12 sm:w-12",
          isCompleted && "border-primary bg-primary/15 text-primary",
          isActive && !isCompleted && [
            "border-primary bg-primary/10 text-primary",
            "shadow-[0_0_20px_hsl(var(--primary)/0.4)]",
            "ring-2 ring-primary/30",
          ],
          !isActive && !isCompleted && "border-border bg-muted/50 text-muted-foreground"
        )}
        animate={
          isActive && !isCompleted
            ? {
                boxShadow: [
                  "0 0 20px hsl(var(--primary) / 0.3)",
                  "0 0 28px hsl(var(--primary) / 0.5)",
                  "0 0 20px hsl(var(--primary) / 0.3)",
                ],
              }
            : {}
        }
        transition={{
          duration: 1.2,
          repeat: isActive && !isCompleted ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        {isCompleted ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Check className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.5} />
          </motion.div>
        ) : (
          <span className="text-sm font-semibold">{index + 1}</span>
        )}
      </motion.div>
      <span
        className={cn(
          "text-center text-sm font-medium sm:text-left",
          isCompleted && "text-primary",
          isActive && !isCompleted && "text-foreground",
          !isActive && !isCompleted && "text-muted-foreground"
        )}
      >
        {label}
      </span>
    </motion.div>
  );
}
