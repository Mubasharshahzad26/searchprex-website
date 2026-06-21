import Link from "next/link";
 
interface LogoProps {
  size?:    "sm" | "md" | "lg";
  variant?: "dark" | "light";
  href?:    string;
  asLink?:  boolean;
}
 
const sizes = {
  sm: { icon: 28, text: 15, sub: 8,  gap: 8  },
  md: { icon: 36, text: 19, sub: 9,  gap: 10 },
  lg: { icon: 48, text: 26, sub: 11, gap: 12 },
};
 
function WingMark({ size }: { size: number }) {
  const s = size;
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Left wing — purple */}
      <path d="M4 42 L20 8 L34 42 Z" fill="#534AB7" />
      {/* Right wing — green overlay */}
      <path d="M22 42 L34 16 L44 42 Z" fill="#3eb489" opacity="0.88" />
    </svg>
  );
}
 
export function Logo({
  size    = "md",
  variant = "dark",
  href    = "/",
  asLink  = true,
}: LogoProps) {
  const { icon, text, sub, gap } = sizes[size];
  const textColor = variant === "dark" ? "#0a0f2e" : "#ffffff";
  const subColor  = variant === "dark" ? "#6b7090" : "rgba(255,255,255,0.6)";
 
  const inner = (
    <span
      style={{
        display:    "inline-flex",
        alignItems: "center",
        gap:        `${gap}px`,
        textDecoration: "none",
      }}
    >
      <WingMark size={icon} />
      <span style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        <span
          style={{
            fontSize:      `${text}px`,
            fontWeight:    600,
            letterSpacing: "-0.4px",
            color:         textColor,
            lineHeight:    1,
            fontFamily:    "ui-sans-serif, system-ui, sans-serif",
          }}
        >
          Searchprex
          <sup
            style={{
              fontSize:   `${text * 0.45}px`,
              fontWeight: 400,
              color:      subColor,
              marginLeft: "2px",
              verticalAlign: "super",
            }}
          >
            ®
          </sup>
        </span>
      </span>
    </span>
  );
 
  if (!asLink) return <span>{inner}</span>;
 
  return (
    <Link href={href} style={{ textDecoration: "none" }} aria-label="Searchprex home">
      {inner}
    </Link>
  );
}
 
export default Logo;
 