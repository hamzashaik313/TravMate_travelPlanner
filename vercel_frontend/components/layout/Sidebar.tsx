// components/layout/Sidebar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Home, MapPin, Plus, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const menu = [
    { title: "Dashboard", href: "/dashboard", icon: <Home size={18} /> },
    { title: "Trips", href: "/dashboard", icon: <MapPin size={18} /> },
    { title: "Create", href: "/dashboard", icon: <Plus size={18} /> },
    { title: "Profile", href: "/profile", icon: <User size={18} /> },
  ];

  return (
    <aside
      className="
        hidden lg:flex flex-col gap-6 p-6
        w-64
        min-h-screen
        bg-white/8 dark:bg-black/20 backdrop-blur-lg
        border-r border-white/6 dark:border-white/6
        shadow-inner
      "
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold shadow"
          onClick={() => router.push("/dashboard")}
          style={{ cursor: "pointer" }}
        >
          TM
        </div>
        <div>
          <div className="text-sm font-semibold">TravMate</div>
          <div className="text-xs text-white/70">Your trips</div>
        </div>
      </div>

      <nav className="flex-1">
        <ul className="space-y-1">
          {menu.map((m) => (
            <li key={m.href}>
              <Link
                href={m.href}
                className="
                  flex items-center gap-3 rounded-lg px-3 py-2 text-sm
                  hover:bg-white/6 transition
                "
              >
                <span className="text-white/90">{m.icon}</span>
                <span className="text-white/90">{m.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <button
          onClick={() => router.push("/trips/create")}
          className="
            w-full px-3 py-2 rounded-lg font-semibold bg-gradient-to-r
            from-blue-500 to-indigo-600 text-white shadow
          "
        >
          Create Trip
        </button>
      </div>
    </aside>
  );
}
