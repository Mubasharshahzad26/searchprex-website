const updates = [
  {
    date: "October 23, 2026",
    status: "Reported test",
    title: "Google is testing expanded Business Profile performance reports",
    summary:
      "Search Engine Roundtable reports that some profiles are seeing more detailed sections for engagement, reviews, audience and search trends. Google has not announced a general rollout. If the report appears in your account, compare its figures with your existing baseline before changing your reporting routine.",
    href: "https://www.seroundtable.com/google-business-profiles-new-performance-reports-42367.html",
    source: "Search Engine Roundtable",
  },
  {
    date: "October 22, 2026",
    status: "Reported test",
    title: "Google is testing a different local panel layout",
    summary:
      "The observed design swaps the position of business photos and key profile details. The report does not establish a ranking or conversion effect, so check how your own profile appears on desktop and mobile rather than changing assets based on the test alone.",
    href: "https://www.seroundtable.com/google-local-panel-layout-42356.html",
    source: "Search Engine Roundtable",
  },
  {
    date: "October 19, 2026",
    status: "Reported test",
    title: "Google Posts may appear higher in some local panels",
    summary:
      "Local-search observers report that the Posts section has moved up and down in some panels. This is an interface observation, not a confirmed rollout or ranking change. Keep profile posts current for customers, but do not expect posting alone to improve local rankings.",
    href: "https://www.seroundtable.com/google-posts-higher-42319.html",
    source: "Search Engine Roundtable",
  },
  {
    date: "September 30, 2026",
    status: "Reported behavior",
    title: "Some Maps users are prompted to sign in to read all reviews",
    summary:
      "The behavior has been reported by users, but Google has not confirmed a broad change. There is no evidence that it changes local ranking. Test your profile signed in and out, and continue asking all customers for honest reviews without incentives.",
    href: "/resources/news/google-maps-sign-in-to-read-reviews",
    source: "SearchPrex update and its linked source",
  },
  {
    date: "September 23, 2026",
    status: "Google Help guidance",
    title: "Certain suggested profile edits have a four-day review window",
    summary:
      "Google's current help documentation says that when an edit requires review, owners may have four days to accept or reject it. If there is no response, Google may publish it when public information supports the change. Check profile notifications and keep your website details accurate.",
    href: "https://support.google.com/business/answer/3480441?hl=en",
    source: "Google Business Profile Help",
  },
  {
    date: "September 14, 2026",
    status: "Documented feature · limited availability",
    title: "Business Profiles can show information collected by Google",
    summary:
      "Google's help page describes a Collected info area for details gathered through automated calls, texts or WhatsApp. Availability is limited by region, language and business category. If it is available in your profile, review the details and remove anything inaccurate.",
    href: "https://support.google.com/business/answer/3039617?hl=en-en",
    source: "Google Business Profile Help",
  },
];

export default function LocalSeoNewsTimeline() {
  const twoDaysAgo = new Date();
  twoDaysAgo.setHours(0, 0, 0, 0);
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  const recentUpdates = updates.filter((update) => new Date(update.date).getTime() >= twoDaysAgo.getTime());

  return (
    <section
      aria-labelledby="local-seo-news-timeline"
      className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7"
    >
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
        Updated October 24, 2026 · Sources checked
      </p>
      <h2
        id="local-seo-news-timeline"
        className="mb-3 text-2xl font-bold leading-tight text-slate-950 sm:text-3xl"
      >
        Latest Local SEO News and Google Business Profile Updates
      </h2>
      <p className="mb-6 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
        Recent local search changes, separated into documented guidance and
        reported tests. A layout test is not proof of a ranking change; verify
        changes in your own Business Profile and performance data.
      </p>

      <section aria-labelledby="local-seo-last-two-days" className="mb-6 rounded-xl border border-emerald-100 bg-white p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h3 id="local-seo-last-two-days" className="text-base font-bold text-slate-950">Local SEO updates from the past two days</h3>
          <span className="text-xs font-medium text-slate-500">Dated, sourced updates</span>
        </div>
        {recentUpdates.length ? (
          <ul className="space-y-3">
            {recentUpdates.map((update) => (
              <li key={`recent-${update.title}`} className="border-t border-slate-100 pt-3 first:border-0 first:pt-0">
                <p className="text-xs font-medium text-slate-500">{update.date} · {update.status}</p>
                <p className="mt-1 text-sm font-semibold leading-5 text-slate-900">{update.title}</p>
                <a href={update.href} target={update.href.startsWith("http") ? "_blank" : undefined} rel={update.href.startsWith("http") ? "noopener noreferrer" : undefined} className="mt-1 inline-block text-xs font-semibold text-emerald-800 underline decoration-emerald-300 underline-offset-4">Read source: {update.source}</a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm leading-6 text-slate-600">No source-checked local search changes have been logged in the past two days. The full dated update log follows.</p>
        )}
      </section>

      <ol className="space-y-4">
        {updates.map((update) => (
          <li
            key={update.title}
            className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5"
          >
            <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-slate-500">
              <time>{update.date}</time>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-800">
                {update.status}
              </span>
            </div>
            <h3 className="mb-2 text-lg font-bold leading-snug text-slate-900">
              {update.title}
            </h3>
            <p className="mb-3 text-sm leading-6 text-slate-600">
              {update.summary}
            </p>
            <a
              href={update.href}
              target={update.href.startsWith("http") ? "_blank" : undefined}
              rel={update.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-sm font-semibold text-emerald-800 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-950"
            >
              Source: {update.source}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
