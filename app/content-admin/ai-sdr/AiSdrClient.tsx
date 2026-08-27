"use client";

import React, { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Play, BrainCircuit, Mail, Activity, ArrowRight, Loader2, Upload } from "lucide-react";
import { AiSdrLead, AiSdrEmailLog } from "@prisma/client";
import Papa from "papaparse";

type LeadWithLogs = AiSdrLead & { emailLogs: AiSdrEmailLog[] };

export default function AiSdrClient({ initialLeads }: { initialLeads: LeadWithLogs[] }) {
  const [leads, setLeads] = useState<LeadWithLogs[]>(initialLeads);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800";
      case "qualified": return "bg-yellow-100 text-yellow-800";
      case "emailed": return "bg-purple-100 text-purple-800";
      case "opened": return "bg-green-100 text-green-800 ring-2 ring-green-400 font-bold";
      case "clicked": return "bg-emerald-100 text-emerald-900 ring-2 ring-emerald-500 font-bold";
      case "responded": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [isHunting, setIsHunting] = useState(false);

  const handleHuntMarkets = async () => {
    if (!searchQuery) return;
    setIsHunting(true);
    try {
      const res = await fetch("/api/sdr/hunter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      alert(data.message);
      // Reload page to show new leads in the table
      window.location.reload();
    } catch (e: any) {
      alert("Error: " + e.message);
    } finally {
      setIsHunting(false);
    }
  };

  const [isUploading, setIsUploading] = useState(false);
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          // Normalize headers: look for something that contains 'url' or 'website'
          const rows = results.data as any[];
          const leadsToImport = rows.map(row => {
            const urlKey = Object.keys(row).find(k => k.toLowerCase().includes('url') || k.toLowerCase().includes('website'));
            const companyKey = Object.keys(row).find(k => k.toLowerCase().includes('company') || k.toLowerCase().includes('name'));
            return {
              url: urlKey ? row[urlKey] : row[Object.keys(row)[0]], // Fallback to first column
              companyName: companyKey ? row[companyKey] : "Unknown"
            };
          }).filter(l => l.url && l.url.trim().length > 3);

          if (leadsToImport.length === 0) {
            throw new Error("Could not find any URLs in the CSV.");
          }

          const res = await fetch("/api/sdr/upload-bulk", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ leads: leadsToImport })
          });
          const data = await res.json();
          if(!res.ok) throw new Error(data.error);

          alert(`Successfully uploaded ${data.added} new leads!`);
          window.location.reload();
        } catch (err: any) {
          alert("Upload failed: " + err.message);
        } finally {
          setIsUploading(false);
          if (fileInputRef.current) fileInputRef.current.value = "";
        }
      }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      
      {/* Sidebar Controls */}
      <div className="md:col-span-1 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-purple-600" />
              Lead Hunter
            </CardTitle>
            <CardDescription>
              Scrape Google Maps for local businesses automatically.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input 
              placeholder="e.g. Lawyers in Austin TX" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700" 
              onClick={handleHuntMarkets}
              disabled={isHunting}
            >
              {isHunting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
              {isHunting ? "Hunting..." : "Find Leads"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-purple-600" />
              Ingest Lead
            </CardTitle>
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
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-purple-600" />
              Bulk Import (CSV)
            </CardTitle>
            <CardDescription>Upload a list from Apollo, ZoomInfo, etc.</CardDescription>
          </CardHeader>
          <CardContent>
            <input 
              type="file" 
              accept=".csv" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
            />
            <Button 
              className="w-full" 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
              {isUploading ? "Uploading..." : "Upload CSV"}
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
            <Button size="sm" variant="outline" onClick={async (e) => {
              const btn = e.currentTarget;
              btn.disabled = true;
              btn.innerText = "Running...";
              try {
                // In production, you would pass an Authorization header here if CRON_SECRET is set
                const res = await fetch("/api/sdr/trigger-cron", { method: 'POST' });
                const data = await res.json();
                alert(JSON.stringify(data, null, 2));
                window.location.reload();
              } catch(err) {
                alert("Failed to run cron");
              } finally {
                btn.disabled = false;
                btn.innerText = "Run Cron Now";
              }
            }}>
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
              <div className="rounded-md border overflow-x-auto w-full">
                <table className="w-full text-sm text-left min-w-[800px]">
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
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" className="h-8 px-2 text-purple-600">
                              View <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                            {lead.status === "qualified" && (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-8 px-2 border-purple-200 hover:bg-purple-50 text-purple-700"
                                onClick={async (e) => {
                                  const btn = e.currentTarget;
                                  btn.disabled = true;
                                  btn.innerText = "Sending...";
                                  try {
                                    const res = await fetch("/api/sdr/outreach", {
                                      method: "POST",
                                      headers: { "Content-Type": "application/json" },
                                      body: JSON.stringify({ leadId: lead.id })
                                    });
                                    const data = await res.json();
                                    if(!res.ok) throw new Error(data.error);
                                    
                                    // Update lead in state
                                    setLeads(leads.map(l => l.id === data.lead.id ? data.lead : l));
                                    alert("Email generated and sent via Resend!");
                                  } catch (err: any) {
                                    alert("Error: " + err.message);
                                    btn.disabled = false;
                                    btn.innerText = "Generate & Send";
                                  }
                                }}
                              >
                                <Mail className="w-4 h-4 mr-1" /> Send AI Email
                              </Button>
                            )}
                          </div>
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
