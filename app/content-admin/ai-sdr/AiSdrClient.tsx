"use client";

import React, { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Play, BrainCircuit, Mail, Activity, ArrowRight, Loader2 } from "lucide-react";
import { AiSdrLead, AiSdrEmailLog } from "@prisma/client";

type LeadWithLogs = AiSdrLead & { emailLogs: AiSdrEmailLog[] };

export default function AiSdrClient({ initialLeads }: { initialLeads: LeadWithLogs[] }) {
  const [leads, setLeads] = useState<LeadWithLogs[]>(initialLeads);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [urlInput, setUrlInput] = useState("");

  const handleAddLead = async () => {
    if (!urlInput) return;
    
    // Auto-format URL if missing http
    let formattedUrl = urlInput;
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = "https://" + formattedUrl;
    }

    setIsAnalyzing(true);
    try {
      const res = await fetch("/api/sdr/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: formattedUrl })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to analyze");
      
      // Add the new lead to the top of the table
      setLeads([data.lead, ...leads]);
      setUrlInput("");
    } catch (e: any) {
      alert("Error: " + e.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "new": return "bg-blue-100 text-blue-800";
      case "qualified": return "bg-yellow-100 text-yellow-800";
      case "emailed": return "bg-purple-100 text-purple-800";
      case "responded": return "bg-green-100 text-green-800";
      case "rejected": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      
      {/* Sidebar Controls */}
      <div className="md:col-span-1 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-purple-600" />
              Market Finder
            </CardTitle>
            <CardDescription>
              Let Gemini analyze your services and find low-competition markets.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => alert("Market Analysis Module (Phase 2) initializing...")}>
              <Search className="w-4 h-4 mr-2" /> Find Markets
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ingest Lead</CardTitle>
            <CardDescription>Manually add a lead for AI scoring & outreach.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input 
              placeholder="e.g. https://bad-seo-lawyer.com" 
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
            />
            <Button className="w-full" variant="secondary" onClick={handleAddLead} disabled={isAnalyzing}>
              {isAnalyzing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
              {isAnalyzing ? "Analyzing..." : "Add & Score"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cron Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Automated Outreach:</span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Activity className="w-3 h-3 mr-1" /> Active
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Next Run:</span>
              <span className="font-mono">in 42m</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Pipeline Area */}
      <div className="md:col-span-3 space-y-4">
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
            <div>
              <CardTitle>Lead Pipeline</CardTitle>
              <CardDescription>Real-time view of your AI SDR operations.</CardDescription>
            </div>
            <Button size="sm" variant="outline" onClick={() => alert("Will trigger the cron job manually.")}>
              <Play className="w-4 h-4 mr-2" /> Run Cron Now
            </Button>
          </CardHeader>
          <CardContent className="pt-6">
            {leads.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                <BrainCircuit className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No leads in the pipeline yet.</p>
                <p className="text-sm">Use the Market Finder or ingest a lead manually to start.</p>
              </div>
            ) : (
              <div className="rounded-md border">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-medium">Website / Company</th>
                      <th className="px-4 py-3 font-medium">AI Score</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map(lead => (
                      <tr key={lead.id} className="border-t hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-medium text-foreground">{lead.companyName || new URL(lead.websiteUrl).hostname}</div>
                          <div className="text-xs text-muted-foreground truncate max-w-[200px]">{lead.websiteUrl}</div>
                          {lead.analysis && (
                            <div className="mt-1 text-xs text-purple-700 bg-purple-50 p-1 rounded italic max-w-sm">
                              {lead.analysis}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {lead.score ? (
                            <div className="flex items-center gap-2">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${lead.score > 70 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                {lead.score}
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground italic">Pending</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                            {lead.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <Button size="sm" variant="ghost" className="h-8 px-2 text-purple-600">
                            View <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
