"use client";
 
const clients = [
  { name: "FarmGhar",                style: "font-serif italic" },
  { name: "Remit Choice",            style: "font-sans font-bold tracking-tight" },
  { name: "AAA Mobile Tyres",        style: "font-sans font-black uppercase tracking-widest text-xs" },
  { name: "Dolls Cleaning",          style: "font-serif italic" },
  { name: "ASR",                     style: "font-sans font-black uppercase tracking-[0.2em] text-base" },
  { name: "ACAS",                    style: "font-sans font-black uppercase tracking-[0.2em] text-base" },
  { name: "Door Doctor",             style: "font-sans font-bold tracking-tight" },
  { name: "Michigan Outdoor Sports", style: "font-sans font-black uppercase tracking-widest text-xs" },
  { name: "SMK Store",               style: "font-sans font-bold tracking-tight" },
  { name: "Canturaus Academy",       style: "font-serif italic" },
  { name: "HVAC Services Team",      style: "font-sans font-black uppercase tracking-widest text-xs" },
  { name: "Orlando WebPros",         style: "font-sans font-bold tracking-tight" },
  { name: "Adscarry",                style: "font-sans font-black tracking-tight" },
  { name: "Garage Door Prosmi",      style: "font-sans font-bold tracking-tight" },
  { name: "Tananace",                style: "font-serif italic" },
];
 
export default function ClientLogos() {
  return (
    <section className="bg-[#eeeef5] border-t border-[#e2e2ec] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:gap-12">
 
          {/* Left label — exactly like Toptal */}
          <p className="flex-shrink-0 text-[10px] font-bold uppercase leading-relaxed tracking-widest text-[#94a3b8]">
            Trusted By<br />Growing Businesses
          </p>
 
          {/* Divider */}
          <div className="hidden h-8 w-px bg-[#d1d5db] lg:block" />
 
          {/* Scrollable logos row */}
          <div className="relative flex-1 overflow-hidden">
            {/* Left fade */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-[#eeeef5] to-transparent" />
            {/* Right fade */}
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-[#eeeef5] to-transparent" />
 
            <div className="flex items-center gap-10 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              {clients.map((client, i) => (
                <span
                  key={i}
                  className={`flex-shrink-0 text-sm text-[#9ca3af] transition-colors hover:text-[#6b7280] ${client.style}`}
                >
                  {client.name}
                </span>
              ))}
            </div>
          </div>
 
        </div>
      </div>
    </section>
  );
}
 