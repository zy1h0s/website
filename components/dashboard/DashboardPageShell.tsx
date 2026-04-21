'use client'

import { motion } from 'framer-motion'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import { UserRole } from '@/lib/auth-context'

const EASE = [0.22, 1, 0.36, 1] as const

interface DashboardPageShellProps {
  role: UserRole
  title: string
  description: string
  children: React.ReactNode
}

export default function DashboardPageShell({ role, title, description, children }: DashboardPageShellProps) {
  return (
    <div className="flex min-h-screen bg-surface">
      <DashboardSidebar role={role} />
      <main className="flex-1 min-w-0 px-4 sm:px-8 lg:px-12 py-6 pt-16 lg:pt-10 lg:py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-8"
        >
          <h1 className="text-[1.75rem] sm:text-[2rem] font-bold text-dark tracking-[-0.03em]">{title}</h1>
          <p className="text-[14px] text-dark/40 mt-1">{description}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  )
}
