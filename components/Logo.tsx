import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "dark" | "light";
  href?: string;
  asLink?: boolean;
}

const sizes = {
  sm: { width: 120, height: 35 },
  md: { width: 160, height: 45 },
  lg: { width: 200, height: 60 },
};

export function Logo({
  size = "md",
  variant = "dark",
  href = "/",
  asLink = true,
}: LogoProps) {
  const { width, height } = sizes[size];

  const inner = (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        textDecoration: "none",
      }}
    >
      <Image
        src="/logo/searchprex-logo.png"
        alt="Searchprex - Founder-Led SEO Agency"
        width={width}
        height={height}
        priority
        style={{ height: "auto" }}
      />
    </span>
  );

  if (!asLink) {
    return <span>{inner}</span>;
  }

  return (
    <Link href={href} style={{ textDecoration: "none" }} aria-label="Searchprex home">
      {inner}
    </Link>
  );
}

export default Logo;