"use client";

import { useAuth } from "@/components/auth/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function AppHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light");

  // Fix hydration issues
  useEffect(() => {
    setMounted(true);
    const current = localStorage.getItem("theme") || "light";
    setTheme(current);
    document.documentElement.classList.toggle("dark", current === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  if (!mounted) return null;

  return (
    <header
      className="
        w-full sticky top-0 z-50 
        backdrop-blur-xl
        bg-background/60 
        border-b border-white/10 
        shadow-sm
      "
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* LOGO */}
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          TravMate
        </h1>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="
              p-2 rounded-full 
              hover:bg-gray-200/40 dark:hover:bg-white/10 
              transition
            "
          >
            {theme === "light" ? (
              <Sun className="h-5 w-5 text-gray-700" />
            ) : (
              <Moon className="h-5 w-5 text-gray-200" />
            )}
          </button>

          {/* PROFILE ICON */}
          <div
            className="
              w-10 h-10 flex items-center justify-center rounded-full 
              bg-gray-900 text-white dark:bg-gray-200 dark:text-black
              font-semibold shadow 
              select-none
            "
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          {/* LOGOUT BUTTON */}
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="
              px-4 py-2 rounded-xl 
              bg-red-500 text-white 
              hover:bg-red-600 transition
            "
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
