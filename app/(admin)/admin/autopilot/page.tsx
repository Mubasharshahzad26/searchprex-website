import React from "react";
import { getAutopilotConfigs } from "../actions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Autopilot | SearchPrex Admin",
};

export default async function AutopilotAdmin() {
  const response = await getAutopilotConfigs();
  const configs = response.success ? response.data : [];

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Autopilot Configurations</h2>
          <p className="text-muted-foreground">Manage automated SEO tasks across clients.</p>
        </div>
      </div>

      <div className="border rounded-md bg-white dark:bg-slate-900 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Score Target</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {configs && configs.length > 0 ? (
              configs.map((config: any) => (
                <TableRow key={config.id}>
                  <TableCell className="font-medium">{config.client?.companyName || "Unknown"}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${config.enabled ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                      {config.enabled ? "Active" : "Paused"}
                    </span>
                  </TableCell>
                  <TableCell>{config.automationScore}</TableCell>
                  <TableCell>{config.contentTier}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                  No autopilot configurations found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
