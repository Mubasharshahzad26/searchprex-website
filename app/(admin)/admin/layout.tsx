import React from "react";
import Link from "next/link";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from "@/components/ui/sidebar";
import { LayoutDashboard, Users, Bot, FileText, Settings, Globe } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-50 w-full dark:bg-slate-950">
        <Sidebar className="border-r border-slate-200 dark:border-slate-800">
          <SidebarHeader className="p-4 border-b border-slate-200 dark:border-slate-800">
            <Link href="/admin" className="flex items-center gap-2 font-bold text-lg">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">S</div>
              SearchPrex Admin
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard">
                  <Link href="/admin">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Pages (CMS)">
                  <Link href="/admin/pages">
                    <FileText className="w-4 h-4" />
                    <span>Pages CMS</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Clients">
                  <Link href="/admin/clients">
                    <Users className="w-4 h-4" />
                    <span>Clients</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Autopilot">
                  <Link href="/admin/autopilot">
                    <Bot className="w-4 h-4" />
                    <span>Autopilot</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Indexing">
                  <Link href="/admin/indexing">
                    <Globe className="w-4 h-4" />
                    <span>Indexing</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <Link href="/admin/settings">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 flex flex-col min-h-screen w-full">
          <header className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center px-6 justify-between">
            <h1 className="text-sm font-medium text-slate-500">Admin Portal</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Admin User</span>
            </div>
          </header>
          <div className="p-6 flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
