"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setMode("dark");
    }
  }, []);

  const toggle = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);

    if (newMode === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggle}
      className="
        backdrop-blur-xl bg-white/20 dark:bg-white/10
        border border-white/30 dark:border-white/20
        rounded-full p-2 shadow-lg
        flex items-center justify-center
        transition-all duration-300
        hover:bg-white/30 dark:hover:bg-white/20
      "
    >
      {mode === "light" ? (
        <Sun size={18} className="text-yellow-300 drop-shadow" />
      ) : (
        <Moon size={18} className="text-blue-300 drop-shadow" />
      )}
    </button>
  );
}
