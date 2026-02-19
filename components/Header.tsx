"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative py-10 md:py-14 lg:py-16"
    >
      <div className="absolute top-0 right-0">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mx-auto max-w-4xl rounded-3xl border border-border/60 bg-card/80 px-6 py-6 md:px-10 md:py-8 shadow-soft backdrop-blur-2xl dark:border-border/40 dark:shadow-glow-sm"
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/80 px-3 py-1 text-xs font-medium text-foreground shadow-soft dark:border-border/40"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Semantic chat workspace</span>
          </motion.div>

          <h1 className="text-balance text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight gradient-accent-text">
            Turn raw chats into structured insight
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.45 }}
            className="mt-1 text-base md:text-lg text-muted-foreground max-w-2xl"
          >
            Paste any conversation and watch it transform into clean semantic
            blocks you can scan, search, and reuse in seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground"
          >
            <Pill>Pairs User / Assistant automatically</Pill>
            <Pill>Semantic topics like pricing, trials, sales</Pill>
            <Pill>Instant full-text search with highlights</Pill>
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-secondary/50 px-3 py-1 backdrop-blur text-[11px] font-medium dark:border-border/40 dark:bg-secondary/30">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </div>
  );
}
