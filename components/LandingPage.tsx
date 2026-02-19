"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Search, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackgroundAnimation } from "./BackgroundAnimation";

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <BackgroundAnimation />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6"
        >
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/70"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Welcome to Chat Organizer
          </motion.h1>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Transform conversations into structured knowledge. Organize chat
          transcripts into semantic blocks with AI-powered categorization.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 200 }}
          className="flex justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            {/* Glow effect behind button */}
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/30 blur-xl"
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <Button
              onClick={onStart}
              size="lg"
              className="relative px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              <span className="flex items-center gap-3">
                Let&apos;s Start
                <ArrowRight className="h-5 w-5" />
              </span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {[
            { icon: Sparkles, text: "AI-Powered Categorization" },
            { icon: Layers, text: "Semantic Block Organization" },
            { icon: Search, text: "Smart Search & Highlighting" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm"
            >
              <feature.icon className="h-6 w-6 text-primary mb-2" />
              <p className="text-sm text-muted-foreground">{feature.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-border to-transparent max-w-md mx-auto"
        />
      </div>
    </div>
  );
}
