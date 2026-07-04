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

  if (!mounted) {
    return (
      <button
        className={cn(
          "relative w-16 h-8 rounded-full opacity-30",
          variant === "light" ? "bg-white/10" : "bg-espresso/10",
          className
        )}
        aria-label="Cambiar tema"
        disabled
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative w-16 h-8 rounded-full p-1 transition-colors duration-500 overflow-hidden group",
        isDark
          ? "bg-charcoal border border-caramel/30"
          : "bg-gradient-to-r from-sky-300 to-amber-200 border border-amber-300/50",
        className
      )}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {/* Background scenery */}
      <AnimatePresence>
        {isDark ? (
          /* Stars at night */
          <motion.div
            key="stars"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            {[
              { top: "20%", left: "15%", size: 2, delay: 0 },
              { top: "55%", left: "28%", size: 1.5, delay: 0.5 },
              { top: "30%", left: "42%", size: 2, delay: 1 },
              { top: "65%", left: "12%", size: 1.5, delay: 1.5 },
            ].map((star, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full bg-cream"
                style={{
                  top: star.top,
                  left: star.left,
                  width: star.size,
                  height: star.size,
                }}
                animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  delay: star.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        ) : (
          /* Clouds during day */
          <motion.div
            key="clouds"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            <motion.span
              className="absolute top-[25%] w-4 h-1.5 rounded-full bg-white/70"
              animate={{ x: [2, 26, 2] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute top-[58%] w-3 h-1 rounded-full bg-white/50"
              animate={{ x: [20, 4, 20] }}
              transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sliding knob: sun <-> moon */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={cn(
          "relative w-6 h-6 rounded-full flex items-center justify-center shadow-lg",
          isDark ? "ml-auto" : "ml-0"
        )}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            /* Moon with crater details */
            <motion.div
              key="moon"
              initial={{ rotate: -120, scale: 0.4, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 120, scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.45, ease: "backOut" }}
              className="relative w-6 h-6 rounded-full bg-gradient-to-br from-cream to-caramel/70"
            >
              <span className="absolute top-1 left-1.5 w-1.5 h-1.5 rounded-full bg-espresso/15" />
              <span className="absolute bottom-1.5 right-1 w-1 h-1 rounded-full bg-espresso/12" />
              <span className="absolute top-3 right-2 w-0.5 h-0.5 rounded-full bg-espresso/15" />
            </motion.div>
          ) : (
            /* Sun with rotating rays */
            <motion.div
              key="sun"
              initial={{ rotate: 120, scale: 0.4, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -120, scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.45, ease: "backOut" }}
              className="relative w-6 h-6 flex items-center justify-center"
            >
              {/* Rotating rays */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <span
                    key={i}
                    className="absolute top-1/2 left-1/2 w-0.5 h-1.5 bg-amber-500 rounded-full origin-center"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-9px)`,
                    }}
                  />
                ))}
              </motion.div>
              {/* Sun core */}
              <motion.span
                className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 shadow-md shadow-amber-400/50"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Subtle hover glow */}
      <span
        className={cn(
          "absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
          isDark
            ? "shadow-[inset_0_0_12px_rgba(201,139,74,0.3)]"
            : "shadow-[inset_0_0_12px_rgba(251,191,36,0.4)]"
        )}
      />
    </button>
  );
}
