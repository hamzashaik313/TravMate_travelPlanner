
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-context";
import { AuthCard } from "@/components/auth/auth-card";

export default function Page() {
  const { isAuthenticated, hydrated } = useAuth();
  const router = useRouter();

  // If logged in → do NOT show login page
  useEffect(() => {
    if (!hydrated) return;
    if (isAuthenticated) router.replace("/dashboard");
  }, [hydrated, isAuthenticated, router]);

  // Prevent flash of login screen
  if (!hydrated) return null;
  if (isAuthenticated) return null;

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/bg.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg">
          Your next adventure starts here
        </h1>

        <p className="text-white/80 mt-2 mb-10 text-lg drop-shadow">
          Plan trips, discover places, and explore the world with TravMate.
        </p>

        <div className="auth-card">
          <div className="auth-inner">
            <AuthCard />
          </div>
        </div>
      </div>
    </main>
  );
}
