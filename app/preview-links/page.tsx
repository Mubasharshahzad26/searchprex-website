import { getDashboardData } from '@/lib/linkbuilding/dashboard-data';
import LinksDashboard from '@/components/linkbuilding/LinksDashboard';

export const dynamic = 'force-dynamic';

export default async function PreviewLinksPage({
  searchParams,
}: {
  searchParams: Promise<{ campaign?: string }>;
}) {
  const { campaign } = await searchParams;
  const data = await getDashboardData(campaign);
  return (
    <div className="min-h-screen bg-[#08080f] flex">
      <main className="flex-1 overflow-auto">
        <LinksDashboard data={data} />
      </main>
    </div>
  );
}
