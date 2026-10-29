// The evergreen lead offer on local SEO news pages: a free Google Business
// Profile check after an update, founder-reviewed with a report in 24 hours
// (the confirmed free-audit promise). Takes over from the Halloween card once
// that offer ends. Each page passes its own source tag so the sheet shows
// which update brought the lead in.

import HalloweenGbpCheckForm from "./HalloweenGbpCheckForm";

export default function GbpCheckCard({ source }: { source: string }) {
  return (
    <section aria-labelledby="gbp-check-title" className="mb-8">
      <div className="grid gap-6 rounded-2xl border border-neutral-900 bg-white p-5 shadow-sm sm:p-7 xl:grid-cols-[1.1fr_1fr] md:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">Free · report in 24 hours</p>
          <h2 id="gbp-check-title" className="mt-1.5 text-xl font-black tracking-tight text-neutral-950 sm:text-2xl">
            Did this update affect your Business Profile?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Send me your business and I&apos;ll check your Google Business Profile myself: the category, name, address
            and phone, reviews, edits you didn&apos;t make, and where the profile sends people. You get a short report of
            what to fix first, by email, within 24 hours.
          </p>
        </div>
        <HalloweenGbpCheckForm
          source={source}
          label="Free Business Profile check request"
          buttonText="Check my Business Profile"
          doneTitle="Your Business Profile check request is in."
        />
      </div>
    </section>
  );
}
