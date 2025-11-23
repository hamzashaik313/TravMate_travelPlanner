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
// import { ThemeToggle } from "@/components/ui/theme-toggle";
// import { useAuth } from "@/components/auth/auth-context";

// export function AppHeader() {
//   const { user, logout } = useAuth();

//   return (
//     <header className="w-full flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white/10 backdrop-blur-xl bg-white/10 dark:bg-black/20 fixed top-0 left-0 z-50">
//       <h1 className="text-xl font-semibold">TravMate</h1>

//       <div className="flex items-center gap-4">
//         <ThemeToggle />
//         <span className="opacity-80">{user?.email?.split("@")[0] ?? ""}</span>

//         <button
//           onClick={logout}
//           className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// }

// components/header.tsx
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/components/auth/auth-context";
// Import icons (using Lucide for a common React/Shadcn choice)
import { User, LogOut, Settings } from "lucide-react";
import Link from "next/link"; // Assuming you use Next.js Link for navigation

// Assuming you have these components from Shadcn/UI or similar:
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AppHeader() {
  const { user, logout } = useAuth();
  const userName = user?.email?.split("@")[0] ?? "User"; // Safe default

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white/10 backdrop-blur-xl bg-white/10 dark:bg-black/20 fixed top-0 left-0 z-50">
      <h1 className="text-xl font-semibold">TravMate</h1>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        {/* --- Profile Dropdown Menu --- */}
        <DropdownMenu>
          {/* Trigger: The User's Name/Icon */}
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-3 py-2 bg-secondary text-secondary-foreground rounded-lg transition hover:bg-secondary/80">
              <User className="h-4 w-4" />
              <span className="font-medium">{userName}</span>
            </button>
          </DropdownMenuTrigger>

          {/* Content: The actual dropdown menu */}
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="font-semibold">
              {userName}'s Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* My Profile Link */}
            <DropdownMenuItem asChild>
              {/* Change this to your actual profile route */}
              <Link
                href="/profile"
                className="flex items-center cursor-pointer"
              >
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </Link>
            </DropdownMenuItem>

            {/* Settings Link */}
            <DropdownMenuItem asChild>
              {/* Change this to your actual settings route */}
              <Link
                href="/settings"
                className="flex items-center cursor-pointer"
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Logout Action */}
            <DropdownMenuItem
              onClick={logout}
              className="flex items-center cursor-pointer text-red-600 dark:text-red-400 hover:!bg-red-500/10"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* ------------------------------- */}
      </div>
    </header>
  );
}
