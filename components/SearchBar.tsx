"use client";

import { useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search blocks and messages...",
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto mb-6"
    >
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
        <Input
          ref={inputRef}
          type="search"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="pl-11 h-12 rounded-xl bg-card border-border focus:ring-2 focus:ring-ring/30 focus:border-primary/50 transition-all duration-200"
          aria-label="Search blocks and messages"
        />
        <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-6 items-center gap-1 rounded border border-border bg-muted px-2 font-mono text-[10px] font-medium text-muted-foreground">
          <span>⌘</span>K
        </kbd>
      </div>
    </motion.div>
  );
}
