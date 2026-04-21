'use client'

import { motion } from 'framer-motion'
import { Send, CalendarCheck, Trophy, FileText, RefreshCw, MessageSquare } from 'lucide-react'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import StatCard from '@/components/dashboard/StatCard'
import ActivityFeed from '@/components/dashboard/ActivityFeed'
import Button from '@/components/ui/Button'
import { useAuth } from '@/lib/auth-context'

const EASE = [0.22, 1, 0.36, 1] as const

const activities = [
  { id: '1', text: 'Application submitted to Stripe — Senior Frontend Engineer', time: '2 hours ago', type: 'info' as const },
  { id: '2', text: 'Interview scheduled with Notion — Product Designer', time: '5 hours ago', type: 'success' as const },
  { id: '3', text: 'Resume updated and re-optimized for ATS', time: 'Yesterday', type: 'info' as const },
  { id: '4', text: 'Recruiter from Coinbase viewed your profile', time: 'Yesterday', type: 'success' as const },
  { id: '5', text: 'Weekly report ready — 12 applications sent', time: '2 days ago', type: 'info' as const },
  { id: '6', text: 'Student mentoring session completed', time: '3 days ago', type: 'success' as const },
]

export default function CandidateDashboard() {
  const { user } = useAuth()

  return (
    <div className="flex min-h-screen bg-surface">
      <DashboardSidebar role="candidate" />

      <main className="flex-1 min-w-0 px-4 sm:px-8 lg:px-12 py-6 pt-16 lg:pt-10 lg:py-10">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-8"
        >
          <h1 className="text-[1.75rem] sm:text-[2rem] font-bold text-dark tracking-[-0.03em]">
            Welcome back, {user?.name?.split(' ')[0] || 'Alex'}
          </h1>
          <p className="text-[14px] text-dark/40 mt-1">Here&apos;s what&apos;s happening with your job search.</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <StatCard label="Applications sent" value={47} trend={{ value: '+12 this week', up: true }} icon={<Send className="w-5 h-5 text-primary" />} />
          <StatCard label="Interviews" value={6} trend={{ value: '+2 this week', up: true }} icon={<CalendarCheck className="w-5 h-5 text-primary" />} />
          <StatCard label="Offers" value={1} icon={<Trophy className="w-5 h-5 text-primary" />} />
          <StatCard label="Sessions done" value={8} trend={{ value: '2 upcoming', up: true }} icon={<MessageSquare className="w-5 h-5 text-primary" />} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity feed */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
            className="lg:col-span-2"
          >
            <ActivityFeed items={activities} />
          </motion.div>

          {/* Quick actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
          >
            <div className="rounded-2xl bg-white ring-1 ring-dark/[0.05] p-5 sm:p-6">
              <h3 className="text-[14px] font-bold text-dark tracking-[-0.01em] mb-5">Quick Actions</h3>
              <div className="space-y-2.5">
                <Button variant="secondary" size="md" fullWidth icon={<FileText className="w-4 h-4" />} iconPosition="left">
                  View resume
                </Button>
                <Button variant="secondary" size="md" fullWidth icon={<RefreshCw className="w-4 h-4" />} iconPosition="left">
                  Update preferences
                </Button>
                <Button variant="secondary" size="md" fullWidth icon={<CalendarCheck className="w-4 h-4" />} iconPosition="left">
                  Schedule prep session
                </Button>
              </div>
            </div>

            {/* Weekly summary card */}
            <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-5 sm:p-6 mt-4 text-white">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/40 mb-3">This week</p>
              <div className="space-y-2">
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/60">Applications</span>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/60">Callbacks</span>
                  <span className="font-bold">3</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/60">Interviews</span>
                  <span className="font-bold">2</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
