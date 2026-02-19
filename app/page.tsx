"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LandingPage } from "@/components/LandingPage";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatInput } from "@/components/ChatInput";
import { SearchBar } from "@/components/SearchBar";
import { BlockCard } from "@/components/BlockCard";
import { Pipeline } from "@/components/Pipeline";
import { EmptyState } from "@/components/EmptyState";
import { BackgroundAnimation } from "@/components/BackgroundAnimation";
import { useLocalStorageBlocks } from "@/hooks/useLocalStorage";
import type { SemanticBlock } from "@/types/chat";

const MIN_PROCESSING_MS = 1500;
const STEP_INTERVAL_MS = 300;
const PIPELINE_STEPS = 5;

function MainApp() {
  const { blocks, setBlocks, isHydrated } = useLocalStorageBlocks();
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "completed">("idle");
  const [error, setError] = useState<string | null>(null);
  const [pipelineStepIndex, setPipelineStepIndex] = useState(0);
  const pipelineTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearPipelineTimeouts = useCallback(() => {
    pipelineTimeoutsRef.current.forEach(clearTimeout);
    pipelineTimeoutsRef.current = [];
  }, []);

  const handleIngest = useCallback(async (text: string) => {
    setStatus("processing");
    setError(null);
    setPipelineStepIndex(0);
    clearPipelineTimeouts();

    // Scroll to pipeline once it mounts (next frame)
    setTimeout(() => {
      document.getElementById("pipeline-section")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);

    // Animate pipeline steps sequentially
    for (let i = 0; i < PIPELINE_STEPS; i++) {
      const id = setTimeout(() => {
        setPipelineStepIndex((prev) => Math.min(prev + 1, PIPELINE_STEPS));
      }, (i + 1) * STEP_INTERVAL_MS);
      pipelineTimeoutsRef.current.push(id);
    }

    const minDelayPromise = new Promise<void>((resolve) => {
      setTimeout(resolve, MIN_PROCESSING_MS);
    });

    try {
      const [_, apiResult] = await Promise.all([
        minDelayPromise,
        fetch("/api/organize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        }),
      ]);

      const res = apiResult as Response;
      const data = await res.json();

      clearPipelineTimeouts();

      if (!res.ok) {
        throw new Error(data.error || "Failed to organize conversation");
      }

      setPipelineStepIndex(PIPELINE_STEPS);
      setBlocks(data.blocks as SemanticBlock[]);
      setSearchQuery("");
      setStatus("completed");
    } catch (err) {
      clearPipelineTimeouts();
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("idle");
    }
  }, [setBlocks, clearPipelineTimeouts]);

  useEffect(() => {
    return () => clearPipelineTimeouts();
  }, [clearPipelineTimeouts]);

  const filteredBlocks = blocks.filter((block) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    if (block.title.toLowerCase().includes(q)) return true;
    for (const pair of block.messages) {
      if (pair.user.content.toLowerCase().includes(q)) return true;
      if (pair.assistant.content.toLowerCase().includes(q)) return true;
    }
    return false;
  });

  const showEmptyState = isHydrated && status === "idle" && blocks.length === 0;
  const showNoResults =
    status === "completed" &&
    blocks.length > 0 &&
    searchQuery.trim() &&
    filteredBlocks.length === 0;

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <BackgroundAnimation />

      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 md:py-10 relative z-10">
        <div className="max-w-6xl mx-auto">
          <Header />

          <div className="mt-6 md:mt-8">
            <ChatInput
              onIngest={handleIngest}
              isDisabled={status === "processing"}
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm max-w-3xl mx-auto dark:bg-destructive/20 dark:border-destructive/40"
            >
              {error}
            </motion.div>
          )}

          {/* Pipeline: only visible during processing */}
          <AnimatePresence mode="wait">
            {status === "processing" && (
              <motion.div
                key="pipeline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8 md:mt-10"
              >
                <Pipeline currentStepIndex={pipelineStepIndex} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Blocks + Search: only when completed */}
          <AnimatePresence mode="wait">
            {status === "completed" && blocks.length > 0 && (
            <motion.section
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-10 md:mt-12"
            >
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search blocks and messages..."
              />

              <AnimatePresence mode="wait">
                {showNoResults ? (
                  <motion.div
                    key="no-results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-16 text-center"
                  >
                    <p className="text-foreground font-medium">
                      No results found for &quot;{searchQuery}&quot;
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">
                      Try a different search term
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="blocks"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.06,
                          delayChildren: 0.1,
                        },
                      },
                    }}
                    className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2"
                  >
                    {filteredBlocks.map((block, index) => (
                      <BlockCard
                        key={block.id}
                        block={block}
                        searchQuery={searchQuery}
                        index={index}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>
            )}
          </AnimatePresence>

          {showEmptyState && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12"
            >
              <EmptyState />
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function Home() {
  const [started, setStarted] = useState(false);

  const handleStart = useCallback(() => {
    setStarted(true);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!started ? (
        <motion.div
          key="landing"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LandingPage onStart={handleStart} />
        </motion.div>
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <MainApp />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
