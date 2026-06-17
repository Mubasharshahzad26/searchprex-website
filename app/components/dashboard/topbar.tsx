'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  PanelLeftClose,
  PanelLeft,
  Search,
  ChevronDown,
  Bell,
  HelpCircle,
  Check,
} from 'lucide-react'
import { useState } from 'react'

const PROJECTS = [
  { id: 'shopzen', name: 'shopzen.com', plan: 'Guru' },
  { id: 'urbanthread', name: 'urbanthread.io', plan: 'Pro' },
  { id: 'peakgear', name: 'peakgear.store', plan: 'Pro' },
]

export function Topbar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean
  onToggle: () => void
}) {
  const [project, setProject] = useState(PROJECTS[0])

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-card px-3 md:px-4">
      <button
        type="button"
        onClick={onToggle}
        className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? (
          <PanelLeft className="size-[18px]" />
        ) : (
          <PanelLeftClose className="size-[18px]" />
        )}
      </button>

      {/* Project selector */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-semibold transition-colors hover:bg-muted">
          <span className="flex size-5 items-center justify-center rounded bg-primary text-[10px] font-bold text-primary-foreground">
            {project.name.charAt(0).toUpperCase()}
          </span>
          <span className="hidden max-w-[160px] truncate sm:inline">
            {project.name}
          </span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-60">
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Projects
          </DropdownMenuLabel>
          {PROJECTS.map((p) => (
            <DropdownMenuItem
              key={p.id}
              onClick={() => setProject(p)}
              className="flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded bg-secondary text-[10px] font-bold">
                  {p.name.charAt(0).toUpperCase()}
                </span>
                <span className="text-sm">{p.name}</span>
              </span>
              {p.id === project.id ? (
                <Check className="size-4 text-primary" />
              ) : (
                <span className="text-[10px] font-medium text-muted-foreground">
                  {p.plan}
                </span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Global search */}
      <div className="relative ml-1 hidden max-w-md flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search domains, keywords, or reports..."
          className="h-9 border-border bg-muted/60 pl-9 text-sm focus-visible:bg-card"
          aria-label="Global search"
        />
      </div>

      <div className="ml-auto flex items-center gap-1">
        <IconButton label="Help">
          <HelpCircle className="size-[18px]" />
        </IconButton>
        <IconButton label="Notifications">
          <span className="relative">
            <Bell className="size-[18px]" />
            <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-primary ring-2 ring-card" />
          </span>
        </IconButton>

        <DropdownMenu>
          <DropdownMenuTrigger className="ml-1 flex items-center gap-2 rounded-full pl-1 pr-2 transition-colors hover:bg-muted">
            <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#ff8a5c] text-sm font-bold text-primary-foreground">
              AM
            </span>
            <ChevronDown className="hidden size-4 text-muted-foreground sm:block" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Alex Morgan</span>
                <span className="text-xs font-normal text-muted-foreground">
                  alex@shopzen.com
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Account settings</DropdownMenuItem>
            <DropdownMenuItem>Subscription · Guru</DropdownMenuItem>
            <DropdownMenuItem>API access</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

function IconButton({
  children,
  label,
}: {
  children: React.ReactNode
  label: string
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {children}
    </button>
  )
}
