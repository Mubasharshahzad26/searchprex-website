"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ActionModal, MsoPageData } from "@/components/dashboard/ActionModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Zap, TrendingUp, TrendingDown, LayoutDashboard } from "lucide-react";

interface MsoDashboardClientProps {
  mockData: MsoPageData[];
}

export default function MsoDashboardClient({ mockData }: MsoDashboardClientProps) {
  const [selectedPage, setSelectedPage] = useState<MsoPageData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openActionModal = (page: MsoPageData) => {
    setSelectedPage(page);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">MSO Performance (GSC)</h2>
          <p className="text-muted-foreground">
            Real-time scenario of your website's performance and AI optimization actions.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-emerald-500 bg-emerald-500/10">
            <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
            Live GSC Sync
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Quick summary cards */}
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Clicks</h3>
            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">12,450</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </div>
        </div>
        {/* You can add more cards here for Impressions, CTR, etc. */}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Page URL</TableHead>
              <TableHead className="text-right">Clicks</TableHead>
              <TableHead className="text-right">Impressions</TableHead>
              <TableHead className="text-right">CTR</TableHead>
              <TableHead className="text-right">Pos</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.map((page, index) => {
              const isUnderperforming = page.ctr < 2.0 && page.impressions > 1000;
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium max-w-xs truncate" title={page.url}>
                    {page.url.replace("https://www.searchprex.com", "")}
                  </TableCell>
                  <TableCell className="text-right">{page.clicks.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{page.impressions.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{page.ctr}%</TableCell>
                  <TableCell className="text-right">{page.position}</TableCell>
                  <TableCell className="text-right">
                    {isUnderperforming ? (
                      <Badge variant="secondary" className="text-amber-500 bg-amber-500/10">
                        <TrendingDown className="w-3 h-3 mr-1" /> Needs Work
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-emerald-500 bg-emerald-500/10">
                        <TrendingUp className="w-3 h-3 mr-1" /> Performing
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => openActionModal(page)}
                      className="border-primary text-primary hover:bg-primary/10"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Optimize
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <ActionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        page={selectedPage} 
      />
    </div>
  );
}
