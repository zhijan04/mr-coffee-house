"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  variant?: "light" | "dark";
}

export default function ThemeToggle({
  className,
  variant = "light",
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const color =
    variant === "light"
      ? "text-cream/80 hover:text-caramel"
      : "text-espresso/70 hover:text-caramel dark:text-cream/70";

  if (!mounted) {
    return (
      <button
        className={cn(
          "w-9 h-9 flex items-center justify-center opacity-30",
          color,
          className
        )}
        aria-label="Cambiar tema"
        disabled
      >
        <span className="w-4 h-4 rounded-full border-2 border-current" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative w-9 h-9 flex items-center justify-center transition-colors duration-300 group",
        color,
        className
      )}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          /* Moon — crescent drawn with SVG, rotates in */
          <motion.svg
            key="moon"
            viewBox="0 0 24 24"
            fill="none"
            className="w-5 h-5"
            initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.4, ease: "backOut" }}
          >
            <motion.path
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            />
          </motion.svg>
        ) : (
          /* Sun — core scales in, rays rotate slowly forever */
          <motion.div
            key="sun"
            className="relative w-5 h-5 flex items-center justify-center"
            initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.4, ease: "backOut" }}
          >
            {/* Rotating rays */}
            <motion.svg
              viewBox="0 0 24 24"
              fill="none"
              className="absolute inset-0 w-5 h-5"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
            >
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * 45 * Math.PI) / 180;
                const x1 = 12 + Math.cos(angle) * 8.2;
                const y1 = 12 + Math.sin(angle) * 8.2;
                const x2 = 12 + Math.cos(angle) * 10.5;
                const y2 = 12 + Math.sin(angle) * 10.5;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                );
              })}
            </motion.svg>
            {/* Core */}
            <motion.span
              className="w-2.5 h-2.5 rounded-full border-[1.6px] border-current"
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
