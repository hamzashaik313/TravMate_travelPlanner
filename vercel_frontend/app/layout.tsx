// // //app/layout.tsx
// import type React from "react";
// import type { Metadata } from "next";
// import { GeistSans } from "geist/font/sans";
// import { GeistMono } from "geist/font/mono";
// import { Analytics } from "@vercel/analytics/next";
// import "./globals.css";
// import { Providers } from "@/components/providers";
// import { Suspense } from "react";

// export const metadata: Metadata = {
//   title: "v0 App",
//   description: "Created with v0",
//   generator: "v0.app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
//         <Suspense fallback={<div>Loading...</div>}>
//           <Providers>{children}</Providers>
//         </Suspense>
//         <Analytics />
//       </body>
//     </html>
//   );
// }

//
// app/layout.tsx
// import type React from "react";
// import type { Metadata } from "next";
// import { GeistSans } from "geist/font/sans";
// import { GeistMono } from "geist/font/mono";
// import { Analytics } from "@vercel/analytics/next";
// import "./globals.css";

// import { Providers } from "@/components/providers";
// import { AuthProvider } from "@/components/auth/auth-context";
// import { ThemeProvider } from "@/components/theme-provider";

// export const metadata: Metadata = {
//   title: "TravMate",
//   description: "Plan your trips smartly",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
//         <ThemeProvider attribute="class" defaultTheme="light">
//           <AuthProvider>
//             <Providers>{children}</Providers>
//           </AuthProvider>
//         </ThemeProvider>

//         <Analytics />
//       </body>
//     </html>
//   );
// }

import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import { Providers } from "@/components/providers";
import { AuthProvider } from "@/components/auth/auth-context";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "TravMate",
  description: "Plan your trips smartly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            <Providers>{children}</Providers>
          </AuthProvider>
        </ThemeProvider>

        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
