export default function SectionBridge({ title, subtitle }: { title: string, subtitle?: string }) {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-24 pb-8 px-4 text-center max-w-3xl mx-auto">
      <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-slate-300 to-transparent mb-6"></div>
      <h2 className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#3eb489]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg sm:text-xl md:text-2xl font-bold text-[#0a0f2e] leading-snug">
          {subtitle}
        </p>
      )}
    </div>
  );
}
