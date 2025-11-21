// "use client";

// export function GlassPanel({ children }: { children: React.ReactNode }) {
//   return (
//     <div
//       className="
//       w-full
//       rounded-3xl
//       bg-white/30
//       dark:bg-white/10
//       backdrop-blur-xl
//       shadow-[0_8px_30px_rgba(0,0,0,0.12)]
//       border border-white/40 dark:border-white/10
//       p-6 sm:p-8
//     "
//     >
//       {children}
//     </div>
//   );
// }

// components/ui/glass-panel.tsx
"use client";

export function GlassPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        w-full rounded-3xl
        bg-white/18 dark:bg-black/20
        backdrop-blur-xl
        border border-white/20 dark:border-white/10
        shadow-[0_10px_30px_rgba(2,6,23,0.12)]
        p-6 sm:p-8
        ${className}
      `}
    >
      {children}
    </div>
  );
}
