'use client'

import { motion } from 'framer-motion'
import { Users, CalendarCheck, Award, Briefcase, Search, Plus } from 'lucide-react'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import StatCard from '@/components/dashboard/StatCard'
import ActivityFeed from '@/components/dashboard/ActivityFeed'
import Button from '@/components/ui/Button'
import { useAuth } from '@/lib/auth-context'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

const activities = [
  { id: '1', text: 'New candidate match: Sarah K. — Frontend Engineer, 4 yrs exp', time: '3 hours ago', type: 'success' as const },
  { id: '2', text: 'Interview scheduled: Michael R. — Backend Developer', time: '1 day ago', type: 'info' as const },
  { id: '3', text: 'Candidate Priya S. accepted offer — Data Analyst role', time: '2 days ago', type: 'success' as const },
  { id: '4', text: '5 new candidates added to your pipeline', time: '3 days ago', type: 'info' as const },
  { id: '5', text: 'Job posting "Senior PM" went live', time: '4 days ago', type: 'info' as const },
]

const pipeline = [
  { name: 'Sarah K.', role: 'Frontend Engineer', exp: '4 yrs', status: 'Interview', statusColor: 'bg-accent/15 text-accent-dark' },
  { name: 'Michael R.', role: 'Backend Developer', exp: '6 yrs', status: 'Screening', statusColor: 'bg-primary/10 text-primary' },
  { name: 'James T.', role: 'Product Manager', exp: '8 yrs', status: 'Shortlisted', statusColor: 'bg-emerald-50 text-emerald-600' },
  { name: 'Angela W.', role: 'UX Designer', exp: '3 yrs', status: 'New', statusColor: 'bg-dark/[0.06] text-dark/50' },
]

export default function RecruiterDashboard() {
  const { user } = useAuth()

  return (
    <div className="flex min-h-screen bg-surface">
      <DashboardSidebar role="recruiter" />

      <main className="flex-1 min-w-0 px-4 sm:px-8 lg:px-12 py-6 pt-16 lg:pt-10 lg:py-10">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="mb-8">
          <h1 className="text-[1.75rem] sm:text-[2rem] font-bold text-dark tracking-[-0.03em]">
            Welcome back, {user?.name?.split(' ')[0] || 'Jordan'}
          </h1>
          <p className="text-[14px] text-dark/40 mt-1">Your talent pipeline at a glance.</p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6, ease: EASE }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Candidates reviewed" value={34} trend={{ value: '+8 this week', up: true }} icon={<Users className="w-5 h-5 text-emerald-600" />} />
          <StatCard label="Interviews scheduled" value={6} trend={{ value: '+2 this week', up: true }} icon={<CalendarCheck className="w-5 h-5 text-emerald-600" />} />
          <StatCard label="Hires made" value={3} icon={<Award className="w-5 h-5 text-emerald-600" />} />
          <StatCard label="Open positions" value={4} icon={<Briefcase className="w-5 h-5 text-emerald-600" />} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pipeline */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6, ease: EASE }} className="lg:col-span-2">
            <div className="rounded-2xl bg-white ring-1 ring-dark/[0.05] p-5 sm:p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[14px] font-bold text-dark tracking-[-0.01em]">Candidate Pipeline</h3>
                <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-dark/25">{pipeline.length} active</span>
              </div>
              <div className="space-y-2">
                {pipeline.map((c, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-surface ring-1 ring-dark/[0.03] hover:ring-primary/10 transition-all duration-200 cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/[0.08] flex items-center justify-center text-[11px] font-bold text-primary">
                        {c.name.split(' ').map(w => w[0]).join('')}
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold text-dark group-hover:text-primary transition-colors">{c.name}</p>
                        <p className="text-[12px] text-dark/35">{c.role} · {c.exp}</p>
                      </div>
                    </div>
                    <span className={cn('text-[10px] font-bold uppercase tracking-[0.06em] px-2.5 py-1 rounded-full', c.statusColor)}>
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick actions + Activity */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6, ease: EASE }}>
              <div className="rounded-2xl bg-white ring-1 ring-dark/[0.05] p-5 sm:p-6">
                <h3 className="text-[14px] font-bold text-dark tracking-[-0.01em] mb-5">Quick Actions</h3>
                <div className="space-y-2.5">
                  <Button variant="secondary" size="md" fullWidth icon={<Search className="w-4 h-4" />} iconPosition="left">
                    Browse candidates
                  </Button>
                  <Button variant="secondary" size="md" fullWidth icon={<Plus className="w-4 h-4" />} iconPosition="left">
                    Post a role
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6, ease: EASE }}>
              <ActivityFeed items={activities.slice(0, 4)} title="Recent Activity" />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
