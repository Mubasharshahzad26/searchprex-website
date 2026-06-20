"use client";
 
// components/AuroraBackground.tsx
// Reusable animated gradient backdrop (the "Semrush premium" feel).
// Slowly drifting, blurred brand-colour blobs behind your content.
//
//   <AuroraBackground variant="light">
//     <YourSection />
//   </AuroraBackground>
//
// variant: "light" (purple-tint), "dark" (navy glow), "white".
 
import type { ReactNode } from "react";
 
export default function AuroraBackground({
  children,
  className,
  variant = "light",
}: {
  children?: ReactNode;
  className?: string;
  variant?: "light" | "dark" | "white";
}) {
  const base =
    variant === "dark" ? "bg-[#0a0f2e]" : variant === "white" ? "bg-white" : "bg-[#f5f3ff]";
  const blobOpacity = variant === "dark" ? 0.28 : 0.5;
 
  return (
    <div className={`sp-aurora relative overflow-hidden ${base} ${className ?? ""}`}>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="sp-blob sp-blob-1" />
        <span className="sp-blob sp-blob-2" />
        <span className="sp-blob sp-blob-3" />
      </div>
 
      <div className="relative">{children}</div>
 
      <style>{`
        .sp-aurora .sp-blob {
          position: absolute;
          border-radius: 9999px;
          filter: blur(90px);
          will-change: transform;
        }
        .sp-aurora .sp-blob-1 {
          width: 42%; height: 65%; left: -8%; top: -25%;
          background: #534AB7; opacity: ${blobOpacity};
          animation: sp-drift-1 19s ease-in-out infinite alternate;
        }
        .sp-aurora .sp-blob-2 {
          width: 46%; height: 60%; right: -10%; top: 5%;
          background: #3eb489; opacity: ${blobOpacity * 0.7};
          animation: sp-drift-2 23s ease-in-out infinite alternate;
        }
        .sp-aurora .sp-blob-3 {
          width: 38%; height: 55%; left: 28%; bottom: -25%;
          background: #7F77DD; opacity: ${blobOpacity * 0.85};
          animation: sp-drift-3 27s ease-in-out infinite alternate;
        }
        @keyframes sp-drift-1 { from { transform: translate(0,0) scale(1); } to { transform: translate(16%,12%) scale(1.18); } }
        @keyframes sp-drift-2 { from { transform: translate(0,0) scale(1); } to { transform: translate(-13%,9%) scale(1.12); } }
        @keyframes sp-drift-3 { from { transform: translate(0,0) scale(1); } to { transform: translate(9%,-11%) scale(1.22); } }
        @media (prefers-reduced-motion: reduce) {
          .sp-aurora .sp-blob { animation: none; }
        }
      `}</style>
    </div>
  );
}
 