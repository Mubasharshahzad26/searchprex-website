'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sidebar } from './sidebar'
import { Topbar } from './topbar'
import { cn } from '@/lib/utils'
import { TrendingUp } from 'lucide-react'

export function Shell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          'hidden shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200 md:flex',
          collapsed ? 'w-[64px]' : 'w-[256px]',
        )}
      >
        <Link
          href="/"
          className={cn(
            'flex h-14 items-center gap-2 border-b border-sidebar-border px-4',
            collapsed && 'justify-center px-2',
          )}
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <TrendingUp className="size-5" />
          </span>
          {!collapsed && (
            <span className="text-[17px] font-extrabold tracking-tight">
              Rank<span className="text-primary">forge</span>
            </span>
          )}
        </Link>
        <div className="min-h-0 flex-1">
          <Sidebar collapsed={collapsed} />
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
        />
        <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
