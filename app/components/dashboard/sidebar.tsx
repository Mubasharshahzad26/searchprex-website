'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import {
  ChevronDown,
  Search,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

type NavItem = {
  label: string
  icon: LucideIcon
  href?: string
  badge?: string
}

type NavGroup = {
  label: string
  items: NavItem[]
}

const TOP: NavItem[] = []

const GROUPS: NavGroup[] = [
  {
    label: 'SEO',
    items: [{ label: 'Keyword Magic Tool', icon: Search, href: '/' }],
  },
  {
    label: 'Content Marketing',
    items: [
      {
        label: 'Bulk Content Generator',
        icon: Sparkles,
        href: '/bulk-generation',
        badge: 'AI',
      },
    ],
  },
]

export function Sidebar({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname()
  const [open, setOpen] = useState<Record<string, boolean>>({
    SEO: true,
    'Content Marketing': true,
  })

  const isActive = (href?: string) => href && pathname === href

  return (
    <nav
      className={cn(
        'flex h-full flex-col gap-1 overflow-y-auto px-3 py-4',
        collapsed && 'items-center px-2',
      )}
      aria-label="Primary"
    >
      {TOP.map((item) => (
        <NavLink
          key={item.label}
          item={item}
          active={!!isActive(item.href)}
          collapsed={collapsed}
        />
      ))}

      {GROUPS.map((group) => (
        <div key={group.label} className="mt-3">
          {!collapsed && (
            <button
              type="button"
              onClick={() =>
                setOpen((s) => ({ ...s, [group.label]: !s[group.label] }))
              }
              className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              {group.label}
              <ChevronDown
                className={cn(
                  'size-3.5 transition-transform',
                  !open[group.label] && '-rotate-90',
                )}
              />
            </button>
          )}
          {collapsed && (
            <div className="my-2 h-px w-6 bg-sidebar-border" aria-hidden />
          )}
          {(collapsed || open[group.label]) && (
            <div className="mt-0.5 flex flex-col gap-0.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.label}
                  item={item}
                  active={!!isActive(item.href)}
                  collapsed={collapsed}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}

function NavLink({
  item,
  active,
  collapsed,
}: {
  item: NavItem
  active: boolean
  collapsed: boolean
}) {
  const Icon = item.icon
  const interactive = !!item.href

  const inner = (
    <span
      className={cn(
        'group flex items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium transition-colors',
        collapsed && 'justify-center px-2',
        active
          ? 'bg-sidebar-accent text-foreground'
          : 'text-sidebar-foreground hover:bg-sidebar-accent/70',
        !interactive && 'cursor-default opacity-80',
      )}
    >
      <span className="relative flex items-center">
        <Icon
          className={cn('size-[18px] shrink-0', active && 'text-primary')}
        />
        {active && !collapsed && (
          <span className="absolute -left-3.5 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-primary" />
        )}
      </span>
      {!collapsed && (
        <span className="flex-1 truncate text-[13px]">{item.label}</span>
      )}
      {!collapsed && item.badge && (
        <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">
          {item.badge}
        </span>
      )}
    </span>
  )

  const node = interactive ? (
    <Link href={item.href!} aria-current={active ? 'page' : undefined}>
      {inner}
    </Link>
  ) : (
    <div role="button" aria-disabled className="select-none">
      {inner}
    </div>
  )

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{node}</TooltipTrigger>
        <TooltipContent side="right">{item.label}</TooltipContent>
      </Tooltip>
    )
  }
  return node
}
