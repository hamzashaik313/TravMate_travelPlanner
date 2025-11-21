"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-context";
import { AppHeader } from "@/components/header";
import { TripCards } from "@/components/trips/TripCards";
import { CreateTripDialog } from "@/components/trips/create-trip-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";

export default function DashboardPage() {
  const { isAuthenticated, hydrated } = useAuth();
  const router = useRouter();

  // FIX: wait until hydration before redirecting
  useEffect(() => {
    if (!hydrated) return; // wait for localStorage
    if (!isAuthenticated) router.replace("/");
  }, [hydrated, isAuthenticated, router]);

  // Prevent flicker + wrong redirects
  if (!hydrated) return null;
  if (!isAuthenticated) return null;

  // return (
  //   <div className="min-h-dvh flex flex-col">
  //     <AppHeader />

  //     <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
  //       <div className="mb-4 flex items-center justify-between">
  //         <h2 className="text-2xl font-semibold">Trip Dashboard</h2>

  //         <CreateTripDialog>
  //           <Button className="gap-2">
  //             <Plus className="h-4 w-4" />
  //             Plan New Trip
  //           </Button>
  //         </CreateTripDialog>
  //       </div>

  //       {/* Trip Cards */}
  //       <TripCards />
  //     </main>
  //   </div>
  // );
  return (
    <div className="min-h-dvh flex flex-col">
      <AppHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
        <GlassPanel>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Your Trips</h2>

            <CreateTripDialog>
              <Button className="gap-2 px-5 py-2 rounded-full">
                <Plus className="h-4 w-4" />
                Plan New Trip
              </Button>
            </CreateTripDialog>
          </div>

          <TripCards />
        </GlassPanel>
      </main>
    </div>
  );
}
