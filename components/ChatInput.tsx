"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, AlertCircle } from "lucide-react";

const EXAMPLE_PLACEHOLDER = `User: What's your pricing strategy for enterprise customers?
Assistant: We offer tiered pricing based on team size. Our Enterprise plan starts at $99/user/month with volume discounts.

User: How do you compare to competitors?
Assistant: We differentiate through our AI-powered analytics and 24/7 support.`;

interface ChatInputProps {
  onIngest: (text: string) => void;
  isDisabled: boolean;
}

export function ChatInput({ onIngest, isDisabled }: ChatInputProps) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = useCallback(() => {
    setError("");
    const trimmed = text.trim();
    if (!trimmed) {
      setError("Please paste a conversation to organize.");
      return;
    }
    // Edge case: empty input - no pipeline start
    if (isDisabled) return;
    onIngest(trimmed);
  }, [text, onIngest, isDisabled]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-5xl mx-auto"
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-soft dark:border-border/60 dark:shadow-glow-sm"
      >
        <div className="pointer-events-none absolute inset-x-16 -top-24 h-48 bg-gradient-radial from-primary/20 via-transparent to-transparent" />
        <div className="relative grid gap-0 md:grid-cols-[3fr,2fr]">
          <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-border/60">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  Step 1 · Paste chat transcript
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Use a <span className="font-semibold text-foreground">User / Assistant</span>{" "}
                  style conversation, like from ChatGPT.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 rounded-full bg-secondary text-foreground px-3 py-1 text-xs font-medium shadow-soft border border-border/40">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Realtime parsing
              </div>
            </div>
            <Textarea
              placeholder={EXAMPLE_PLACEHOLDER}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (error) setError("");
              }}
              disabled={isDisabled}
              className="min-h-[230px] md:min-h-[260px] text-sm md:text-base bg-background/50"
            />
          </div>

          <div className="p-6 md:p-8 flex flex-col justify-between gap-4 bg-secondary/80 text-foreground dark:bg-secondary/50 dark:border-l border-border/40">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                How it works
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                Paste a conversation and click &quot;Ingest & Organize&quot; to see
                the processing pipeline in action. We&apos;ll parse messages,
                detect topics, and group them into semantic blocks.
              </p>
            </div>

            <div className="space-y-3">
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 rounded-xl bg-destructive/10 border border-destructive/30 px-3 py-2 text-xs text-destructive dark:bg-destructive/20 dark:border-destructive/40"
                >
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
                <p className="text-[11px] text-muted-foreground">
                  Tip: paste longer transcripts (up to ~100k characters) – we&apos;ll keep
                  them in your browser only.
                </p>
                <Button
                  onClick={handleSubmit}
                  disabled={isDisabled}
                  size="lg"
                  className="min-w-[180px] justify-center"
                >
                  {isDisabled ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.9,
                          ease: "linear",
                        }}
                        className="inline-block h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent"
                      />
                      Organizing…
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Ingest & Organize
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
