
"use client";
 
import { usePersona, PERSONAS, PersonaId } from "@/context/PersonaContext";
import { Briefcase, ShoppingBag, MapPin, Scale } from "lucide-react";
 
const icons: Record<PersonaId, React.ElementType> = {
  law: Scale,
  ecom: ShoppingBag,
  local: MapPin,
  solo: Briefcase,
};
 
export default function PersonaSwitcher() {
  const { persona, setPersona } = usePersona();
  const ids: PersonaId[] = ["law", "ecom", "local", "solo"];
 
  return (
    <div className="sticky top-16 z-40 border-y border-[#e2e8f0] bg-white/95 py-3 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-2 md:flex-row">
          <span className="flex shrink-0 items-center gap-1.5 rounded-xl border border-[#e2e8f0] bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] shadow-sm">
            I am a:
          </span>
          <div className="grid w-full flex-1 grid-cols-2 gap-1.5 lg:grid-cols-4">
            {ids.map((id) => {
              const Icon = icons[id];
              const active = persona === id;
              return (
                <button
                  key={id}
                  onClick={() => setPersona(id)}
                  className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold transition-all duration-200 ${
                    active
                      ? "bg-[#534AB7] text-white shadow-md shadow-[#534AB7]/20"
                      : "text-[#64748b] hover:bg-white hover:text-[#0a0f2e]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="truncate">{PERSONAS[id].label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}