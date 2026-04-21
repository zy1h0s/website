'use client'

import DashboardPageShell from '@/components/dashboard/DashboardPageShell'
import { Briefcase, ExternalLink, Clock, CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const applications = [
  { company: 'Stripe', role: 'Senior Frontend Engineer', date: 'Apr 18', status: 'Interview', statusColor: 'bg-accent/15 text-accent-dark' },
  { company: 'Notion', role: 'Product Designer', date: 'Apr 17', status: 'Applied', statusColor: 'bg-primary/10 text-primary' },
  { company: 'Coinbase', role: 'Full Stack Engineer', date: 'Apr 16', status: 'Viewed', statusColor: 'bg-emerald-50 text-emerald-600' },
  { company: 'Figma', role: 'Design Engineer', date: 'Apr 15', status: 'Applied', statusColor: 'bg-primary/10 text-primary' },
  { company: 'Vercel', role: 'Software Engineer', date: 'Apr 14', status: 'Rejected', statusColor: 'bg-red-50 text-red-500' },
  { company: 'Linear', role: 'Frontend Engineer', date: 'Apr 13', status: 'Applied', statusColor: 'bg-primary/10 text-primary' },
  { company: 'Supabase', role: 'Full Stack Developer', date: 'Apr 12', status: 'Interview', statusColor: 'bg-accent/15 text-accent-dark' },
  { company: 'Shopify', role: 'Senior Developer', date: 'Apr 11', status: 'Offered', statusColor: 'bg-emerald-50 text-emerald-600' },
]

const statusIcons: Record<string, React.ElementType> = {
  Interview: Clock,
  Applied: ExternalLink,
  Viewed: CheckCircle2,
  Rejected: XCircle,
  Offered: CheckCircle2,
}

export default function ApplicationsPage() {
  return (
    <DashboardPageShell role="candidate" title="Applications" description="Track all your job applications and their status.">
      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Total', value: 47, color: 'text-dark' },
          { label: 'In Progress', value: 12, color: 'text-primary' },
          { label: 'Interviews', value: 6, color: 'text-accent-dark' },
          { label: 'Offers', value: 1, color: 'text-emerald-600' },
        ].map(s => (
          <div key={s.label} className="rounded-xl bg-white ring-1 ring-dark/[0.05] p-4 text-center">
            <p className={cn('text-[1.5rem] font-bold tracking-[-0.02em]', s.color)}>{s.value}</p>
            <p className="text-[11px] font-medium text-dark/30 uppercase tracking-[0.06em] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white ring-1 ring-dark/[0.05] overflow-hidden">
        <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 border-b border-dark/[0.04] text-[11px] font-bold uppercase tracking-[0.08em] text-dark/25">
          <div className="col-span-4">Company & Role</div>
          <div className="col-span-3">Date Applied</div>
          <div className="col-span-3">Status</div>
          <div className="col-span-2">Action</div>
        </div>
        {applications.map((app, i) => {
          const Icon = statusIcons[app.status] || ExternalLink
          return (
            <div key={i} className={cn('px-4 sm:px-6 py-4', i < applications.length - 1 && 'border-b border-dark/[0.04]')}>
              {/* Mobile card layout */}
              <div className="sm:hidden">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-primary/[0.06] flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold text-dark truncate">{app.company}</p>
                      <p className="text-[12px] text-dark/35 truncate">{app.role}</p>
                    </div>
                  </div>
                  <span className={cn('inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.04em] flex-shrink-0', app.statusColor)}>
                    <Icon className="w-3 h-3" />
                    {app.status}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2 ml-12">
                  <p className="text-[12px] text-dark/35">{app.date}, 2026</p>
                  <button className="text-[12px] font-medium text-primary">View details</button>
                </div>
              </div>

              {/* Desktop row layout */}
              <div className="hidden sm:grid grid-cols-12 gap-4 items-center">
                <div className="col-span-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/[0.06] flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-dark">{app.company}</p>
                      <p className="text-[12px] text-dark/35">{app.role}</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-3">
                  <p className="text-[13px] text-dark/50">{app.date}, 2026</p>
                </div>
                <div className="col-span-3">
                  <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.04em]', app.statusColor)}>
                    <Icon className="w-3 h-3" />
                    {app.status}
                  </span>
                </div>
                <div className="col-span-2">
                  <button className="text-[12px] font-medium text-primary hover:text-primary-dark transition-colors">View details</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </DashboardPageShell>
  )
}
