// "use client";

// import { useRouter } from "next/navigation";
// import { useAuth } from "@/components/auth/auth-context";
// import { Button } from "@/components/ui/button";

// export function AppHeader() {
//   const { user, logout } = useAuth();
//   const router = useRouter();

//   const handleLogout = () => {
//     logout();
//     router.push("/");
//   };

//   // MODIFICATION: Displays Hi, [User Name], or defaults to Hi, Traveler.
//   const greeting = user?.name ? `Hi, ${user.name}` : `Hi, Traveller`;

//   return (
//     <header className="w-full border-b border-border bg-card">
//       <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
//         <div className="font-medium">
//           {greeting} {/* Uses the friendly greeting */}
//         </div>
//         <Button variant="outline" onClick={handleLogout} aria-label="Log out">
//           Log Out
//         </Button>
//       </div>
//     </header>
//   );
// }

// components/header.tsx
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/components/auth/auth-context";

export function AppHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white/10 backdrop-blur-xl bg-white/10 dark:bg-black/20 fixed top-0 left-0 z-50">
      <h1 className="text-xl font-semibold">TravMate</h1>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <span className="opacity-80">{user?.email?.split("@")[0] ?? ""}</span>

        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
