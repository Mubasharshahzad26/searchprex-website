// app/autopilot/page.tsx
// Server Component. Exists only to keep this route out of Google's index; the
// dashboard itself is in AutopilotClient.
//
// This route renders a client selector and run history — real client names on a
// page anyone can reach. It was previously a "use client" page.tsx, which
// cannot export metadata, so it inherited the root layout's default and served
// <meta name="robots" content="index, follow"> to every crawler. It was
// actively inviting Google to index the client list.
//
// Note this fixes indexing only, not access. middleware.ts does not protect
// this route at all: its matcher covers /dashboard, /admin, /login and
// /register, and /autopilot matches none of them. The carve-out at the top of
// middleware for "/dashboard/autopilot" guards a route that does not exist.
// Whether this dashboard should require a login is a product decision, not one
// to make silently in a commit.

import type { Metadata } from "next";
import AutopilotClient from "./AutopilotClient";

export const metadata: Metadata = {
  title: "SEO Autopilot",
  description: "Internal SEO autopilot dashboard.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function Page() {
  return <AutopilotClient />;
}
