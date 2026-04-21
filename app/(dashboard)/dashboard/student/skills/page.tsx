'use client'

import { motion } from 'framer-motion'
import DashboardPageShell from '@/components/dashboard/DashboardPageShell'

const EASE = [0.22, 1, 0.36, 1] as const

const skills = [
  { name: 'JavaScript', progress: 75, level: 'Intermediate', sessions: 4 },
  { name: 'Git & Version Control', progress: 85, level: 'Advanced', sessions: 3 },
  { name: 'SQL & Databases', progress: 60, level: 'Intermediate', sessions: 3 },
  { name: 'Professional Communication', progress: 70, level: 'Intermediate', sessions: 2 },
  { name: 'React', progress: 40, level: 'Beginner', sessions: 2 },
  { name: 'System Design', progress: 20, level: 'Beginner', sessions: 1 },
  { name: 'Node.js & Express', progress: 30, level: 'Beginner', sessions: 1 },
]

const levelColors: Record<string, string> = {
  Beginner: 'bg-dark/[0.06] text-dark/40',
  Intermediate: 'bg-accent/15 text-accent-dark',
  Advanced: 'bg-emerald-50 text-emerald-600',
}

export default function StudentSkillsPage() {
  return (
    <DashboardPageShell role="student" title="Skills" description="Track your skill progress across all learning areas.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {skills.map((skill, i) => (
          <div key={skill.name} className="rounded-xl bg-white ring-1 ring-dark/[0.05] p-5 hover:ring-primary/10 transition-all">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-[14px] font-semibold text-dark">{skill.name}</h4>
              <span className={`text-[10px] font-bold uppercase tracking-[0.06em] px-2.5 py-1 rounded-full ${levelColors[skill.level]}`}>
                {skill.level}
              </span>
            </div>
            <div className="w-full h-2 bg-dark/[0.05] rounded-full overflow-hidden mb-3">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-accent-dark rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${skill.progress}%` }}
                transition={{ delay: 0.2 + i * 0.08, duration: 1, ease: EASE }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-dark/30">{skill.progress}% mastery</span>
              <span className="text-[12px] text-dark/30">{skill.sessions} sessions</span>
            </div>
          </div>
        ))}
      </div>
    </DashboardPageShell>
  )
}
