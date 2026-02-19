"use client";

import { motion } from "framer-motion";
import { PipelineStep } from "./PipelineStep";

const PIPELINE_STEPS = [
  "Input Received",
  "Parsing Messages",
  "Detecting Topics",
  "Grouping Blocks",
  "Ready",
];

interface PipelineProps {
  currentStepIndex: number;
}

export function Pipeline({ currentStepIndex }: PipelineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto"
      id="pipeline-section"
    >
      <div className="rounded-2xl border border-border/60 bg-card/90 p-6 sm:p-8 shadow-soft dark:border-border/40 dark:shadow-glow-sm backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-6">
          Processing Pipeline
        </p>

        {/* Desktop: horizontal layout */}
        <div className="hidden sm:flex items-center justify-between gap-0">
          {PIPELINE_STEPS.map((label, index) => (
            <div key={label} className="flex items-center flex-1 min-w-0">
              <PipelineStep
                label={label}
                isActive={index === currentStepIndex}
                isCompleted={index < currentStepIndex}
                index={index}
              />
              {index < PIPELINE_STEPS.length - 1 && (
                <Connector
                  isFilled={index < currentStepIndex}
                  isAnimating={index === currentStepIndex - 1}
                  className="flex-1 mx-1 h-0.5 min-w-[24px]"
                />
              )}
            </div>
          ))}
        </div>

        {/* Mobile: vertical layout */}
        <div className="flex sm:hidden flex-col items-start">
          {PIPELINE_STEPS.map((label, index) => (
            <div key={label} className="flex flex-col items-center w-full">
              <PipelineStep
                label={label}
                isActive={index === currentStepIndex}
                isCompleted={index < currentStepIndex}
                index={index}
              />
              {index < PIPELINE_STEPS.length - 1 && (
                <Connector
                  isFilled={index < currentStepIndex}
                  isAnimating={index === currentStepIndex - 1}
                  className="w-0.5 min-h-[28px] mt-1"
                  vertical
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

interface ConnectorProps {
  isFilled: boolean;
  isAnimating: boolean;
  className?: string;
  vertical?: boolean;
}

function Connector({
  isFilled,
  isAnimating,
  className,
  vertical = false,
}: ConnectorProps) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-full
        bg-muted/60
        ${vertical ? "w-0.5" : "h-0.5"}
        ${className}
      `}
    >
      {/* Filled portion - gradient */}
      <motion.div
        className="absolute rounded-full gradient-accent opacity-90"
        style={
          vertical
            ? { top: 0, left: 0, right: 0 }
            : { left: 0, top: 0, bottom: 0 }
        }
        initial={{ width: vertical ? "100%" : 0, height: vertical ? 0 : "100%" }}
        animate={
          vertical
            ? { height: isFilled ? "100%" : 0 }
            : { width: isFilled ? "100%" : 0 }
        }
        transition={{ duration: 0.35, ease: "easeOut" }}
      />

      {/* Traveling glow when animating */}
      {isAnimating && (
        <motion.div
          className="absolute rounded-full bg-primary/80 blur-sm"
          style={
            vertical
              ? { width: 8, height: 24, left: "50%", marginLeft: -4 }
              : { width: 24, height: 8, top: "50%", marginTop: -4 }
          }
          animate={
            vertical
              ? { top: ["0%", "100%"], opacity: [0.8, 0] }
              : { left: ["0%", "100%"], opacity: [0.8, 0] }
          }
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
}
