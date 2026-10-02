"use client";

// AI SDR review queue. Leads are qualified by deterministic checks
// (lib/sdr/qualify.ts) and get a template draft built only from findings the
// store owner can verify. Nothing is sent until an admin opens a draft, reads
// it, and approves it here. The old screen showed an "Automated Outreach:
// Active / Next run: in 42m" card for a cron that was never scheduled; this
// one says what actually happens.

import React, { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Play, BrainCircuit, Mail, Loader2, Upload, RefreshCw, ShieldCheck, ExternalLink } from "lucide-react";
import { AiSdrLead, AiSdrEmailLog } from "@prisma/client";
import Papa from "papaparse";

type LeadWithLogs = AiSdrLead & { emailLogs: AiSdrEmailLog[] };

type Analysis = {
  qualification?: { platform?: string; productUrl?: string; origin?: string; error?: string; findings?: { text: string }[] };
  decision?: "drafted" | "skipped";
  reason?: string;
  finding?: string;
};

function parseAnalysis(raw: string | null): Analysis | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null; // free text left by the old Gemini pipeline
  }
}

const STATUS_STYLE: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  qualified: "bg-yellow-100 text-yellow-800",
  emailed: "bg-purple-100 text-purple-800",
  opened: "bg-green-100 text-green-800",
  clicked: "bg-emerald-100 text-emerald-900",
  responded: "bg-green-100 text-green-800",
  no_contact: "bg-gray-100 text-gray-700",
  suppressed: "bg-gray-200 text-gray-700",
  rejected: "bg-red-100 text-red-800",
};

const STATUS_LABEL: Record<string, string> = {
  qualified: "Draft ready",
  no_contact: "No email",
};

export default function AiSdrClient({ initialLeads }: { initialLeads: LeadWithLogs[] }) {
  const [leads, setLeads] = useState<LeadWithLogs[]>(initialLeads);
  const [urlInput, setUrlInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isHunting, setIsHunting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [edits, setEdits] = useState<Record<string, { subject: string; body: string }>>({});
  const [busyId, setBusyId] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const l of leads) c[l.status] = (c[l.status] ?? 0) + 1;
    return c;
  }, [leads]);

  const replaceLead = (lead: LeadWithLogs) => setLeads((prev) => prev.map((l) => (l.id === lead.id ? lead : l)));

  async function call(path: string, body?: unknown) {
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const text = await res.text();
    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(res.ok ? "The server returned an unexpected response." : `Request failed (${res.status}).`);
    }
    if (!res.ok) throw new Error(data.error || `Request failed (${res.status}).`);
    return data;
  }

  const handleAddLead = async () => {
    if (!urlInput.trim()) return;
    setIsAnalyzing(true);
    setNotice(null);
    try {
      const data = await call("/api/sdr/ingest", { url: urlInput.trim() });
      setLeads((prev) => [data.lead, ...prev.filter((l) => l.id !== data.lead.id)]);
      setUrlInput("");
      setOpenId(data.lead.id);
    } catch (e: any) {
      setNotice({ kind: "error", text: e.message });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleHunt = async () => {
    if (!searchQuery.trim()) return;
    setIsHunting(true);
    setNotice(null);
    try {
      const data = await call("/api/sdr/hunter", { query: searchQuery.trim() });
      setNotice({ kind: "ok", text: `${data.message} Reload to see them, then run qualification.` });
    } catch (e: any) {
      setNotice({ kind: "error", text: e.message });
    } finally {
      setIsHunting(false);
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    setNotice(null);
    try {
      const data = await call("/api/sdr/trigger-cron");
      setNotice({
        kind: "ok",
        text: data.message ?? `Checked ${data.processed} lead(s); ${data.remaining} still waiting. Nothing was sent. Reload to review.`,
      });
    } catch (e: any) {
      setNotice({ kind: "error", text: e.message });
    } finally {
      setIsRunning(false);
    }
  };

  const handleRecheck = async (lead: LeadWithLogs) => {
    setBusyId(lead.id);
    setNotice(null);
    try {
      const data = await call("/api/sdr/ingest", { url: lead.websiteUrl });
      replaceLead(data.lead);
      setEdits((e) => {
        const next = { ...e };
        delete next[lead.id];
        return next;
      });
    } catch (e: any) {
      setNotice({ kind: "error", text: e.message });
    } finally {
      setBusyId(null);
    }
  };

  const handleSend = async (lead: LeadWithLogs, draft: AiSdrEmailLog) => {
    const edit = edits[lead.id];
    setBusyId(lead.id);
    setNotice(null);
    try {
      const data = await call("/api/sdr/outreach", {
        leadId: lead.id,
        subject: edit?.subject ?? draft.subject,
        body: edit?.body ?? draft.body,
      });
      replaceLead(data.lead);
      setOpenId(null);
      setNotice({ kind: "ok", text: `Sent to ${lead.contactEmail}. ${data.sentToday} of ${data.dailyCap} sent today.` });
    } catch (e: any) {
      setNotice({ kind: "error", text: e.message });
    } finally {
      setBusyId(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setNotice(null);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const rows = results.data as any[];
          const leadsToImport = rows
            .map((row) => {
              const keys = Object.keys(row);
              const urlKey = keys.find((k) => /url|website|domain/i.test(k));
              const companyKey = keys.find((k) => /company|name/i.test(k));
              const emailKey = keys.find((k) => /email/i.test(k));
              return {
                url: urlKey ? row[urlKey] : row[keys[0]],
                companyName: companyKey ? row[companyKey] : "Unknown",
                email: emailKey ? row[emailKey] : undefined,
              };
            })
            .filter((l) => l.url && String(l.url).trim().length > 3);
          if (leadsToImport.length === 0) throw new Error("Could not find any URLs in the CSV.");
          const data = await call("/api/sdr/upload-bulk", { leads: leadsToImport });
          setNotice({ kind: "ok", text: `Added ${data.added} new lead(s). Reload, then run qualification.` });
        } catch (err: any) {
          setNotice({ kind: "error", text: `Upload failed: ${err.message}` });
        } finally {
          setIsUploading(false);
          if (fileInputRef.current) fileInputRef.current.value = "";
        }
      },
    });
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
      {/* Sidebar */}
      <div className="space-y-4 md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-purple-600" />
              How sending works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Nothing is sent automatically.</p>
            <ol className="list-decimal space-y-1 pl-4">
              <li>Add stores (hunter, URL or CSV).</li>
              <li>Run qualification: each store is checked and gets a draft, or a reason it was skipped.</li>
              <li>Open a draft, read it, edit if needed, then approve to send.</li>
            </ol>
            <p>Sends go from the outreach address only, with your postal address and an opt-out added, up to the daily cap.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-purple-600" />
              Check a store
            </CardTitle>
            <CardDescription>Add one store and qualify it now.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              id="sdr-url"
              placeholder="e.g. examplestore.com"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddLead()}
            />
            <Button className="w-full" variant="secondary" onClick={handleAddLead} disabled={isAnalyzing}>
              {isAnalyzing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
              {isAnalyzing ? "Checking…" : "Add & check"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-purple-600" />
              Lead hunter
            </CardTitle>
            <CardDescription>Find businesses with a Maps or search query. Needs GOOGLE_MAPS_API_KEY or SERPAPI_API_KEY.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input id="sdr-hunt" placeholder="e.g. pool supply store Arizona" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleHunt} disabled={isHunting}>
              {isHunting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
              {isHunting ? "Searching…" : "Find leads"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-purple-600" />
              Bulk import (CSV)
            </CardTitle>
            <CardDescription>Columns for URL, and optionally company and email.</CardDescription>
          </CardHeader>
          <CardContent>
            <input id="sdr-csv" type="file" accept=".csv" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
            <Button className="w-full" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
              {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
              {isUploading ? "Uploading…" : "Upload CSV"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Queue */}
      <div className="space-y-4 md:col-span-3">
        <Card className="h-full">
          <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 border-b pb-3">
            <div>
              <CardTitle>Review queue</CardTitle>
              <CardDescription>
                {counts.qualified ?? 0} draft(s) ready · {counts.new ?? 0} waiting for checks · {counts.emailed ?? 0} sent
              </CardDescription>
            </div>
            <Button size="sm" variant="outline" onClick={handleRun} disabled={isRunning}>
              {isRunning ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
              {isRunning ? "Checking…" : "Qualify new leads"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            {notice ? (
              <p
                role="status"
                className={`rounded-md px-3 py-2 text-sm ${notice.kind === "ok" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
              >
                {notice.text}
              </p>
            ) : null}

            {leads.length === 0 ? (
              <div className="rounded-lg border-2 border-dashed py-12 text-center text-muted-foreground">
                <BrainCircuit className="mx-auto mb-4 h-12 w-12 opacity-20" />
                <p>No leads yet.</p>
                <p className="text-sm">Add a store on the left to start.</p>
              </div>
            ) : (
              <div className="w-full overflow-x-auto rounded-md border">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="bg-muted text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-medium">Store</th>
                      <th className="px-4 py-3 font-medium">Finding / reason</th>
                      <th className="px-4 py-3 font-medium">Contact</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => {
                      const a = parseAnalysis(lead.analysis);
                      const draft = lead.emailLogs.find((l) => l.status === "draft");
                      const sent = lead.emailLogs.filter((l) => l.status !== "draft");
                      const edit = edits[lead.id];
                      const open = openId === lead.id;
                      let host = lead.websiteUrl;
                      try {
                        host = new URL(lead.websiteUrl).hostname.replace(/^www\./, "");
                      } catch { /* keep raw */ }
                      return (
                        <React.Fragment key={lead.id}>
                          <tr className="border-t align-top">
                            <td className="px-4 py-3">
                              <a href={lead.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium hover:underline">
                                {host} <ExternalLink className="h-3 w-3" />
                              </a>
                              <div className="text-xs text-muted-foreground">{a?.qualification?.platform ?? lead.niche ?? ""}</div>
                            </td>
                            <td className="max-w-[300px] px-4 py-3 text-xs">
                              {a?.decision === "drafted" ? (
                                <span className="text-foreground">{a.finding}</span>
                              ) : a?.reason ? (
                                <span className="text-muted-foreground">Skipped: {a.reason}</span>
                              ) : lead.analysis && !a ? (
                                <span className="italic text-muted-foreground">Old AI note — re-check to replace</span>
                              ) : (
                                <span className="italic text-muted-foreground">Not checked yet</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-xs">{lead.contactEmail ?? <span className="text-muted-foreground">—</span>}</td>
                            <td className="px-4 py-3">
                              <span className={`rounded-full px-2 py-1 text-xs font-medium ${STATUS_STYLE[lead.status] ?? "bg-gray-100 text-gray-800"}`}>
                                {STATUS_LABEL[lead.status] ?? lead.status}
                              </span>
                              {sent.length ? <div className="mt-1 text-xs text-muted-foreground">{sent.length} sent</div> : null}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-wrap gap-2">
                                {draft ? (
                                  <Button size="sm" variant="outline" className="h-8 px-2" onClick={() => setOpenId(open ? null : lead.id)}>
                                    <Mail className="mr-1 h-4 w-4" /> {open ? "Close" : "Review draft"}
                                  </Button>
                                ) : null}
                                {lead.status !== "emailed" ? (
                                  <Button size="sm" variant="ghost" className="h-8 px-2" onClick={() => handleRecheck(lead)} disabled={busyId === lead.id}>
                                    {busyId === lead.id ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-1 h-4 w-4" />}
                                    Re-check
                                  </Button>
                                ) : null}
                              </div>
                            </td>
                          </tr>
                          {open && draft ? (
                            <tr className="border-t bg-muted/30">
                              <td colSpan={5} className="px-4 py-4">
                                <div className="grid gap-3">
                                  <p className="text-xs text-muted-foreground">
                                    Check the finding on the live page before sending
                                    {a?.qualification?.productUrl ? (
                                      <>
                                        {" "}
                                        (<a href={a.qualification.productUrl} target="_blank" rel="noopener noreferrer" className="underline">product page</a>)
                                      </>
                                    ) : null}
                                    . Your postal address and the opt-out line are added when it sends.
                                  </p>
                                  <label className="grid gap-1 text-xs font-medium" htmlFor={`subj-${lead.id}`}>
                                    Subject
                                    <Input
                                      id={`subj-${lead.id}`}
                                      value={edit?.subject ?? draft.subject}
                                      onChange={(e) => setEdits((s) => ({ ...s, [lead.id]: { subject: e.target.value, body: s[lead.id]?.body ?? draft.body } }))}
                                    />
                                  </label>
                                  <label className="grid gap-1 text-xs font-medium" htmlFor={`body-${lead.id}`}>
                                    Email (to {lead.contactEmail})
                                    <textarea
                                      id={`body-${lead.id}`}
                                      className="min-h-[260px] w-full rounded-md border bg-background p-3 font-mono text-xs leading-relaxed"
                                      value={edit?.body ?? draft.body}
                                      onChange={(e) => setEdits((s) => ({ ...s, [lead.id]: { subject: s[lead.id]?.subject ?? draft.subject, body: e.target.value } }))}
                                    />
                                  </label>
                                  <div className="flex flex-wrap gap-2">
                                    <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => handleSend(lead, draft)} disabled={busyId === lead.id}>
                                      {busyId === lead.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
                                      Approve &amp; send
                                    </Button>
                                    <Button variant="ghost" onClick={() => setOpenId(null)}>
                                      Not now
                                    </Button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ) : null}
                        </React.Fragment>
                      );
                    })}
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
