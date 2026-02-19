"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  BarChart3,
  Users,
  Gift,
  MessageCircle,
  Tag,
  User,
  Bot,
  type LucideIcon,
} from "lucide-react";
import type { SemanticBlock } from "@/types/chat";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  DollarSign,
  BarChart3,
  Users,
  Gift,
  MessageCircle,
  Tag,
};

const COLOR_ACCENTS: Record<string, string> = {
  emerald:
    "border-l-emerald-500 bg-emerald-50/50 dark:border-l-emerald-400 dark:bg-emerald-950/30",
  blue: "border-l-blue-500 bg-blue-50/50 dark:border-l-blue-400 dark:bg-blue-950/30",
  violet: "border-l-violet-500 bg-violet-50/50 dark:border-l-violet-400 dark:bg-violet-950/30",
  amber: "border-l-amber-500 bg-amber-50/50 dark:border-l-amber-400 dark:bg-amber-950/30",
  slate: "border-l-slate-500 bg-slate-50/50 dark:border-l-slate-400 dark:bg-slate-900/50",
  indigo: "border-l-indigo-500 bg-indigo-50/50 dark:border-l-indigo-400 dark:bg-indigo-950/30",
};

const ICON_COLORS: Record<string, string> = {
  emerald: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/50",
  blue: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/50",
  violet: "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-900/50",
  amber: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/50",
  slate: "text-slate-600 bg-slate-100 dark:text-slate-400 dark:bg-slate-800",
  indigo: "text-indigo-600 bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-900/50",
};

function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const parts = text.split(new RegExp(`(${escapeRegex(query)})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark
        key={i}
        className="bg-highlight/30 text-highlight-foreground rounded px-0.5 font-medium dark:bg-highlight/40"
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function matchesSearch(block: SemanticBlock, query: string): boolean {
  if (!query.trim()) return true;
  const q = query.toLowerCase();
  if (block.title.toLowerCase().includes(q)) return true;
  for (const pair of block.messages) {
    if (pair.user.content.toLowerCase().includes(q)) return true;
    if (pair.assistant.content.toLowerCase().includes(q)) return true;
  }
  return false;
}

interface BlockCardProps {
  block: SemanticBlock;
  searchQuery: string;
  index: number;
}

export function BlockCard({ block, searchQuery, index }: BlockCardProps) {
  const Icon = ICON_MAP[block.icon] ?? MessageCircle;
  const accent = COLOR_ACCENTS[block.color] ?? COLOR_ACCENTS.slate;
  const iconColor = ICON_COLORS[block.color] ?? ICON_COLORS.slate;

  if (!matchesSearch(block, searchQuery)) return null;

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -2 }}
      className={cn(
        "glass-card rounded-2xl overflow-hidden border-l-4 transition-shadow duration-300 hover:shadow-glow-sm dark:hover:shadow-glow",
        accent
      )}
    >
      <div className="p-5 border-b border-border/60">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl",
              iconColor
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-foreground">
            {highlightText(block.title, searchQuery)}
          </h3>
        </div>
      </div>
      <div className="p-5 space-y-4">
        {block.messages.map((pair) => (
          <div
            key={pair.id}
            className="space-y-2 rounded-xl bg-secondary/50 p-4 border border-border/40 dark:bg-secondary/30 dark:border-border/30"
          >
            <div className="flex items-start gap-2">
              <User className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-foreground/90 whitespace-pre-wrap">
                {highlightText(pair.user.content, searchQuery)}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Bot className="h-4 w-4 text-primary/80 mt-0.5 shrink-0" />
              <p className="text-sm text-foreground/90 whitespace-pre-wrap">
                {highlightText(pair.assistant.content, searchQuery)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.article>
  );
}
