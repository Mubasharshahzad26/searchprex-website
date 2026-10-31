import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

type ServedCity = {
  citySlug: string;
  stateSlug: string;
  city: string;
  state: string;
  stateAbbr: string;
  county: string;
};

export default function PracticeLocationsMap({ practiceName, cities }: { practiceName: string; cities: ServedCity[] }) {
  if (!cities.length) return null;

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {cities.map((city) => {
        const query = encodeURIComponent(`${city.city}, ${city.state} legal district courthouse`);
        const mapHref = `https://www.google.com/maps/search/?api=1&query=${query}`;
        return (
          <article key={city.citySlug} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="relative aspect-[16/9] bg-slate-100">
              <iframe
                src={`https://maps.google.com/maps?q=${query}&t=m&z=12&output=embed`}
                title={`${practiceName} SEO service area map for ${city.city}, ${city.stateAbbr}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
              />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.14em] text-slate-500"><MapPin className="h-3.5 w-3.5" aria-hidden /> Served market</p>
                  <h3 className="mt-2 text-xl font-black text-slate-950">{practiceName} SEO in {city.city}, {city.stateAbbr}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">Localized content can reference {city.county}, nearby courts and the real search language used in this market.</p>
                </div>
                <a href={mapHref} target="_blank" rel="noopener noreferrer" className="shrink-0 text-slate-500 hover:text-slate-950" aria-label={`Open ${city.city} map in Google Maps`}><ArrowUpRight className="h-5 w-5" aria-hidden /></a>
              </div>
              <Link href={`/locations/${city.stateSlug}/${city.citySlug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-slate-900 underline underline-offset-4">Read the {city.city} local SEO page <ArrowUpRight className="h-4 w-4" aria-hidden /></Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
