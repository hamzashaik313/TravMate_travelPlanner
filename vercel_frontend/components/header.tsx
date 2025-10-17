"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-context";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // MODIFICATION: Displays Hi, [User Name], or defaults to Hi, Traveler.
  const greeting = user?.name ? `Hi, ${user.name}` : `Hi, Traveller`;

  return (
    <header className="w-full border-b border-border bg-card">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="font-medium">
          {greeting} {/* Uses the friendly greeting */}
        </div>
        <Button variant="outline" onClick={handleLogout} aria-label="Log out">
          Log Out
        </Button>
      </div>
    </header>
  );
}
