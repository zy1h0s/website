'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuth, UserRole } from '@/lib/auth-context'
import {
  LayoutDashboard, FileText, MessageSquare, Settings, LogOut,
  Briefcase, GraduationCap, Building2, Users, BarChart3, CalendarDays,
  ChevronLeft, Menu
} from 'lucide-react'

const roleNavItems: Record<UserRole, { label: string; href: string; icon: React.ElementType }[]> = {
  candidate: [
    { label: 'Overview', href: '/dashboard/candidate', icon: LayoutDashboard },
    { label: 'Applications', href: '/dashboard/candidate/applications', icon: Briefcase },
    { label: 'Resume', href: '/dashboard/candidate/resume', icon: FileText },
    { label: 'Sessions', href: '/dashboard/candidate/sessions', icon: CalendarDays },
    { label: 'Messages', href: '/dashboard/candidate/messages', icon: MessageSquare },
    { label: 'Settings', href: '/dashboard/candidate/settings', icon: Settings },
  ],
  student: [
    { label: 'Overview', href: '/dashboard/student', icon: LayoutDashboard },
    { label: 'Sessions', href: '/dashboard/student/sessions', icon: CalendarDays },
    { label: 'Skills', href: '/dashboard/student/skills', icon: BarChart3 },
    { label: 'Messages', href: '/dashboard/student/messages', icon: MessageSquare },
    { label: 'Settings', href: '/dashboard/student/settings', icon: Settings },
  ],
  recruiter: [
    { label: 'Overview', href: '/dashboard/recruiter', icon: LayoutDashboard },
    { label: 'Pipeline', href: '/dashboard/recruiter/pipeline', icon: Users },
    { label: 'Positions', href: '/dashboard/recruiter/positions', icon: Briefcase },
    { label: 'Messages', href: '/dashboard/recruiter/messages', icon: MessageSquare },
    { label: 'Settings', href: '/dashboard/recruiter/settings', icon: Settings },
  ],
}

const roleColors: Record<UserRole, string> = {
  candidate: 'bg-primary/10 text-primary',
  student: 'bg-accent/15 text-accent-dark',
  recruiter: 'bg-emerald-50 text-emerald-600',
}

const roleIcons: Record<UserRole, React.ElementType> = {
  candidate: Briefcase,
  student: GraduationCap,
  recruiter: Building2,
}

export default function DashboardSidebar({ role }: { role: UserRole }) {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = roleNavItems[role]
  const RoleIcon = roleIcons[role]

  const sidebarContent = (
    <>
      {/* Logo + collapse */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-dark/[0.06]">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/z.png" alt="Zytheq" width={32} height={32} className="w-8 h-8" />
          {!collapsed && <span className="text-[14px] font-semibold text-dark tracking-[-0.02em]">Zytheq</span>}
        </Link>
        <button onClick={() => setCollapsed(!collapsed)} className="hidden lg:flex w-7 h-7 items-center justify-center rounded-lg hover:bg-dark/5 transition-colors text-dark/30">
          <ChevronLeft className={cn('w-4 h-4 transition-transform duration-300', collapsed && 'rotate-180')} />
        </button>
      </div>

      {/* User info */}
      <div className={cn('px-4 py-4 border-b border-dark/[0.06]', collapsed && 'px-3')}>
        <div className="flex items-center gap-3">
          <div className={cn('flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold', roleColors[role])}>
            {user?.initials || 'U'}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-dark truncate">{user?.name || 'User'}</p>
              <div className="flex items-center gap-1.5">
                <RoleIcon className="w-3 h-3 text-dark/30" />
                <p className="text-[11px] text-dark/30 capitalize font-medium">{role}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary/[0.07] text-primary'
                  : 'text-dark/45 hover:text-dark hover:bg-dark/[0.03]',
                collapsed && 'justify-center px-2'
              )}
            >
              <item.icon className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={1.8} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-dark/[0.06]">
        <button
          onClick={logout}
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-dark/35 hover:text-red-500 hover:bg-red-50 transition-all duration-200 w-full',
            collapsed && 'justify-center px-2'
          )}
        >
          <LogOut className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={1.8} />
          {!collapsed && <span>Log out</span>}
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-white ring-1 ring-dark/[0.08] flex items-center justify-center shadow-sm"
      >
        <Menu className="w-5 h-5 text-dark/60" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-dark/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-white flex flex-col shadow-xl">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className={cn(
        'hidden lg:flex flex-col flex-shrink-0 bg-white border-r border-dark/[0.06] h-screen sticky top-0 transition-all duration-300',
        collapsed ? 'w-[72px]' : 'w-[260px]'
      )}>
        {sidebarContent}
      </aside>
    </>
  )
}
