"use client";

import { motion } from "framer-motion";

const PHRASES = [
  "Parsing conversation...",
  "Identifying message pairs...",
  "Categorizing by topic...",
  "Building semantic blocks...",
  "Almost done...",
];

interface LoadingStateProps {
  phraseIndex?: number;
}

export function LoadingState({ phraseIndex = 0 }: LoadingStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center justify-center py-16 gap-8"
    >
      <div className="flex flex-col items-center gap-6 w-full max-w-sm">
        <div className="flex gap-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-20 w-24 rounded-xl bg-muted"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
        <div className="w-full space-y-3">
          <div className="h-3 w-3/4 rounded-full bg-muted" />
          <div className="h-3 w-1/2 rounded-full bg-muted" />
        </div>
      </div>

      <div className="text-center space-y-1">
        <p className="text-foreground font-medium">Organizing your conversation</p>
        <motion.p
          key={phraseIndex}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-muted-foreground text-sm"
        >
          {PHRASES[phraseIndex % PHRASES.length]}
        </motion.p>
      </div>

      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-2 w-2 rounded-full bg-primary/60"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
