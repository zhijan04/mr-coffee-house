"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
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
          "w-9 h-9 rounded-full flex items-center justify-center transition-colors",
          className
        )}
        aria-label="Cambiar tema"
        disabled
      >
        <span className="w-4 h-4 rounded-full bg-current opacity-20" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110",
        variant === "light"
          ? "text-cream/80 hover:text-cream hover:bg-white/10"
          : "text-espresso/60 hover:text-espresso hover:bg-espresso/10",
        className
      )}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {isDark ? (
        <Sun className="w-4 h-4" strokeWidth={1.5} />
      ) : (
        <Moon className="w-4 h-4" strokeWidth={1.5} />
      )}
    </button>
  );
}
