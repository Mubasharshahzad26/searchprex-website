"use client";

interface LogoProps {
  variant?: "light" | "dark" | "icon-only";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ variant = "light", size = "md", className = "" }: LogoProps) {
  const sizes = {
    sm: { icon: 24, text: 16 },
    md: { icon: 32, text: 20 },
    lg: { icon: 40, text: 24 },
  };

  const { icon, text } = sizes[size];

  const isDark = variant === "dark";
  const iconOnly = variant === "icon-only";

  // Colors based on variant
  const backPieceColor = isDark ? "#3D65FF" : "#0E35D4";
  const frontPieceColor = isDark ? "#5C82FF" : "#1847F5";
  const textColor = isDark ? "#F0F4FF" : "#0D1B3E";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Icon Mark */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Back piece - darker blue, lower-right */}
        <polygon points="13,37 29,13 39,23 25,39" fill={backPieceColor} />
        {/* Front piece - bright blue, upper-left */}
        <polygon points="5,37 21,5 29,13 13,37" fill={frontPieceColor} />
      </svg>

      {/* Wordmark */}
      {!iconOnly && (
        <span
          className="font-semibold tracking-tight leading-none"
          style={{
            fontSize: `${text}px`,
            color: textColor,
            letterSpacing: "-0.025em",
          }}
        >
          Searchprex
          <span
            className="align-super opacity-70"
            style={{ fontSize: `${text * 0.45}px`, marginLeft: "1px" }}
          >
            ®
          </span>
        </span>
      )}
    </div>
  );
}

// Favicon component for generating favicon
export function Favicon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="44" height="44" rx="10" fill="#1847F5" />
      <polygon points="12,36 22,10 30,18 20,36" fill="#ffffff" opacity="0.55" />
      <polygon points="14,34 24,8 32,16 22,34" fill="#ffffff" />
    </svg>
  );
}
