"use client";

import { motion } from "framer-motion";
import { MessageSquare, ArrowDown } from "lucide-react";

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="relative rounded-3xl border border-border/60 bg-card/80 p-8 mb-6 shadow-soft dark:border-border/40"
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="relative">
          <MessageSquare className="h-14 w-14 text-primary/70" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute -bottom-2 -right-2 rounded-full bg-primary/20 p-2"
        >
          <ArrowDown className="h-4 w-4 text-primary" />
        </motion.div>
      </motion.div>
      <p className="text-foreground font-semibold">No blocks yet</p>
      <p className="text-muted-foreground text-sm mt-2 max-w-sm">
        Paste a conversation above and click &quot;Ingest & Organize&quot; to
        create semantic blocks
      </p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"
      >
        <kbd className="rounded border border-border bg-muted px-2 py-0.5 font-mono">⌘K</kbd>
        <span>to focus search</span>
      </motion.div>
    </motion.div>
  );
}
