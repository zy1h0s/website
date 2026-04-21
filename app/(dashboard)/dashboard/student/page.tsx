'use client'

import { motion } from 'framer-motion'
import { CalendarDays, BarChart3, Star, BookOpen } from 'lucide-react'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import StatCard from '@/components/dashboard/StatCard'
import ActivityFeed from '@/components/dashboard/ActivityFeed'
import { useAuth } from '@/lib/auth-context'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

const activities = [
  { id: '1', text: 'Completed session: "REST API fundamentals" with mentor Alex', time: '1 day ago', type: 'success' as const },
  { id: '2', text: 'New session scheduled: "React state management" — Thu 9 PM', time: '2 days ago', type: 'info' as const },
  { id: '3', text: 'Received feedback: "Strong progress on SQL queries"', time: '3 days ago', type: 'success' as const },
  { id: '4', text: 'Completed skill assessment: JavaScript Basics', time: '5 days ago', type: 'info' as const },
  { id: '5', text: 'Joined Zytheq student program', time: '2 weeks ago', type: 'success' as const },
]

const skills = [
  { name: 'JavaScript', progress: 75 },
  { name: 'SQL', progress: 60 },
  { name: 'React', progress: 40 },
  { name: 'Git & Version Control', progress: 85 },
  { name: 'Professional Communication', progress: 70 },
]

const upcomingSessions = [
  { topic: 'React State Management', mentor: 'Alex M.', date: 'Thu, Apr 24', time: '9:00 PM IST' },
  { topic: 'Building REST APIs', mentor: 'Alex M.', date: 'Sat, Apr 26', time: '9:30 PM IST' },
]

export default function StudentDashboard() {
  const { user } = useAuth()

  return (
    <div className="flex min-h-screen bg-surface">
      <DashboardSidebar role="student" />

      <main className="flex-1 min-w-0 px-4 sm:px-8 lg:px-12 py-6 pt-16 lg:pt-10 lg:py-10">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="mb-8">
          <h1 className="text-[1.75rem] sm:text-[2rem] font-bold text-dark tracking-[-0.03em]">
            Welcome back, {user?.name?.split(' ')[0] || 'Priya'}
          </h1>
          <p className="text-[14px] text-dark/40 mt-1">Keep learning. Your next session is coming up.</p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6, ease: EASE }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Sessions completed" value={12} trend={{ value: '+3 this month', up: true }} icon={<CalendarDays className="w-5 h-5 text-accent-dark" />} />
          <StatCard label="Skills learned" value={5} icon={<BarChart3 className="w-5 h-5 text-accent-dark" />} />
          <StatCard label="Mentor rating" value="4.9" icon={<Star className="w-5 h-5 text-accent-dark" />} />
          <StatCard label="Hours logged" value={24} trend={{ value: '+6 this month', up: true }} icon={<BookOpen className="w-5 h-5 text-accent-dark" />} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming sessions */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6, ease: EASE }}>
              <div className="rounded-2xl bg-white ring-1 ring-dark/[0.05] p-5 sm:p-6">
                <h3 className="text-[14px] font-bold text-dark tracking-[-0.01em] mb-5">Upcoming Sessions</h3>
                <div className="space-y-3">
                  {upcomingSessions.map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-surface ring-1 ring-dark/[0.03]">
                      <div>
                        <p className="text-[14px] font-semibold text-dark">{s.topic}</p>
                        <p className="text-[12px] text-dark/35 mt-0.5">with {s.mentor}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[13px] font-medium text-dark/65">{s.date}</p>
                        <p className="text-[11px] text-dark/30">{s.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Activity */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6, ease: EASE }}>
              <ActivityFeed items={activities} />
            </motion.div>
          </div>

          {/* Right column — Skills Progress */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6, ease: EASE }}>
            <div className="rounded-2xl bg-white ring-1 ring-dark/[0.05] p-5 sm:p-6">
              <h3 className="text-[14px] font-bold text-dark tracking-[-0.01em] mb-5">Skills Progress</h3>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="text-[13px] font-medium text-dark/65">{skill.name}</span>
                      <span className="text-[11px] font-bold text-dark/35">{skill.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-dark/[0.06] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-accent to-accent-dark rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.progress}%` }}
                        transition={{ delay: 0.5, duration: 1, ease: EASE }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mentor card */}
            <div className="rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 ring-1 ring-accent/10 p-5 sm:p-6 mt-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-accent-dark/50 mb-3">Your mentor</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-[12px] font-bold text-primary">AM</div>
                <div>
                  <p className="text-[14px] font-semibold text-dark">Alex Morgan</p>
                  <p className="text-[12px] text-dark/35">Software Engineer · Austin, TX</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
