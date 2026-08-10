import React from "react";
import { getIndexingAccounts } from "../actions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Indexing Accounts | SearchPrex Admin",
};

export default async function IndexingAdmin() {
  const response = await getIndexingAccounts();
  const accounts = response.success ? response.data : [];

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Indexing Accounts</h2>
          <p className="text-muted-foreground">Manage Google Indexing API service accounts.</p>
        </div>
      </div>

      <div className="border rounded-md bg-white dark:bg-slate-900 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Label</TableHead>
              <TableHead>Client Email</TableHead>
              <TableHead>Daily Quota</TableHead>
              <TableHead>Used Today</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts && accounts.length > 0 ? (
              accounts.map((account: any) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.label}</TableCell>
                  <TableCell>{account.clientEmail}</TableCell>
                  <TableCell>{account.dailyQuota}</TableCell>
                  <TableCell>{account.usedToday}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                  No indexing accounts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
