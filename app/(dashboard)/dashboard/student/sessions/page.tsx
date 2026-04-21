'use client'

import DashboardPageShell from '@/components/dashboard/DashboardPageShell'
import { Video, Clock, CalendarDays } from 'lucide-react'
import { cn } from '@/lib/utils'

const sessions = [
  { topic: 'React State Management', mentor: 'Alex M.', date: 'Apr 24, 2026', time: '9:00 PM IST', status: 'upcoming' },
  { topic: 'Building REST APIs', mentor: 'Alex M.', date: 'Apr 26, 2026', time: '9:30 PM IST', status: 'upcoming' },
  { topic: 'REST API Fundamentals', mentor: 'Alex M.', date: 'Apr 17, 2026', time: '9:00 PM IST', status: 'completed' },
  { topic: 'SQL Query Optimization', mentor: 'Sarah W.', date: 'Apr 14, 2026', time: '8:00 PM IST', status: 'completed' },
  { topic: 'Git & GitHub Workflow', mentor: 'Alex M.', date: 'Apr 10, 2026', time: '9:00 PM IST', status: 'completed' },
  { topic: 'JavaScript Fundamentals', mentor: 'Alex M.', date: 'Apr 5, 2026', time: '9:00 PM IST', status: 'completed' },
  { topic: 'Professional Communication', mentor: 'Jordan L.', date: 'Apr 2, 2026', time: '7:30 PM IST', status: 'completed' },
]

export default function StudentSessionsPage() {
  return (
    <DashboardPageShell role="student" title="Sessions" description="Your upcoming and past mentoring sessions.">
      <div className="space-y-3">
        {sessions.map((s, i) => (
          <div key={i} className="rounded-xl bg-white ring-1 ring-dark/[0.05] p-5 flex items-center justify-between gap-4 flex-wrap hover:ring-primary/10 transition-all">
            <div className="flex items-center gap-4">
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', s.status === 'upcoming' ? 'bg-accent/15' : 'bg-surface')}>
                {s.status === 'upcoming' ? <Video className="w-5 h-5 text-accent-dark" /> : <CalendarDays className="w-5 h-5 text-dark/25" />}
              </div>
              <div>
                <p className="text-[14px] font-semibold text-dark">{s.topic}</p>
                <p className="text-[12px] text-dark/35 mt-0.5">with {s.mentor}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-[13px] font-medium text-dark/60">{s.date}</p>
                <div className="flex items-center gap-1 justify-end text-dark/30">
                  <Clock className="w-3 h-3" />
                  <span className="text-[11px]">{s.time}</span>
                </div>
              </div>
              <span className={cn(
                'text-[10px] font-bold uppercase tracking-[0.06em] px-2.5 py-1 rounded-full',
                s.status === 'upcoming' ? 'bg-accent/15 text-accent-dark' : 'bg-dark/[0.04] text-dark/30'
              )}>{s.status}</span>
            </div>
          </div>
        ))}
      </div>
    </DashboardPageShell>
  )
}
