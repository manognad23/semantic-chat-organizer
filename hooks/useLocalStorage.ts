"use client";

import { useState, useEffect, useCallback } from "react";
import type { SemanticBlock } from "@/types/chat";

const STORAGE_KEY = "chat-organizer-blocks";

export function useLocalStorageBlocks() {
  const [blocks, setBlocksState] = useState<SemanticBlock[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as SemanticBlock[];
        if (Array.isArray(parsed)) {
          setBlocksState(parsed);
        }
      }
    } catch {
      // Ignore parse errors
    }
    setIsHydrated(true);
  }, []);

  const setBlocks = useCallback((newBlocks: SemanticBlock[] | ((prev: SemanticBlock[]) => SemanticBlock[])) => {
    setBlocksState((prev) => {
      const next = typeof newBlocks === "function" ? newBlocks(prev) : newBlocks;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Storage full or disabled
      }
      return next;
    });
  }, []);

  return { blocks, setBlocks, isHydrated };
}
