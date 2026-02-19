"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="py-8 text-center text-muted-foreground text-sm"
    >
      <p>Chat Organizer — Organize & search your conversations</p>
      <p className="mt-1 text-muted-foreground/70">Built with Next.js, Tailwind & Framer Motion</p>
    </motion.footer>
  );
}
