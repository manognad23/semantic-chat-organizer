"use client";

import { motion } from "framer-motion";

export function BackgroundAnimation() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {/* Large floating gradient circles */}
      <motion.div
        aria-hidden
        className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-3xl"
        animate={{
          y: [0, 30, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-40 -left-24 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-primary/15 via-primary/5 to-transparent blur-3xl"
        animate={{
          y: [0, -30, 0],
          x: [0, -15, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-radial from-primary/8 via-primary/4 to-transparent blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated mesh gradient overlay */}
      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, hsl(var(--primary)) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, hsl(var(--primary)) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, hsl(var(--primary)) 0%, transparent 50%)
          `,
        }}
        animate={{
          opacity: [0.03, 0.06, 0.03],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle particle dots */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * 360;
        const radius = 200 + (i % 3) * 100;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;
        return (
          <motion.div
            key={i}
            aria-hidden
            className="absolute top-1/2 left-1/2 h-2 w-2 rounded-full bg-primary/20"
            style={{
              x: x - 4,
              y: y - 4,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        );
      })}
    </div>
  );
}
