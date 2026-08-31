import type { Metadata } from 'next';
import { getDashboardData } from '@/lib/linkbuilding/dashboard-data';
import LinksDashboard from '@/components/linkbuilding/LinksDashboard';

export const metadata: Metadata = {
  title: 'Link Building',
  //  Dashboard pages must never be indexed. The layout above requires a
  //  signed-in user, but a stray crawl of a shared link should not surface it.
  robots: { index: false, follow: false },
};

//  Read at request time, not build time. The numbers change whenever a
//  verification run finishes, and a statically rendered copy would show
//  whatever was true when the site was last deployed — which for a monitoring
//  dashboard is worse than showing nothing.
export const dynamic = 'force-dynamic';

export default async function LinksDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ campaign?: string }>;
}) {
  const { campaign } = await searchParams;

  //  getDashboardData never throws — a database failure comes back as
  //  `dbError` and the client renders an explanation instead of a stack trace.
  const data = await getDashboardData(campaign);

  return <LinksDashboard data={data} />;
}
