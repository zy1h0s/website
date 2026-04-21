'use client'

import { cn } from '@/lib/utils'
import { UserRole } from '@/lib/auth-context'
import { Briefcase, GraduationCap, Building2 } from 'lucide-react'

interface RoleTabsProps {
  activeRole: UserRole
  onRoleChange: (role: UserRole) => void
}

const roles: { key: UserRole; label: string; icon: React.ElementType; desc: string }[] = [
  { key: 'candidate', label: 'Candidate', icon: Briefcase, desc: 'Looking for a job' },
  { key: 'student', label: 'Student', icon: GraduationCap, desc: 'Want to learn' },
  { key: 'recruiter', label: 'Recruiter', icon: Building2, desc: 'Hiring talent' },
]

export default function RoleTabs({ activeRole, onRoleChange }: RoleTabsProps) {
  return (
    <div className="grid grid-cols-3 gap-2 mb-8">
      {roles.map(({ key, label, icon: Icon, desc }) => (
        <button
          key={key}
          type="button"
          onClick={() => onRoleChange(key)}
          className={cn(
            'relative flex flex-col items-center gap-1.5 py-3.5 px-2 rounded-xl transition-all duration-300 cursor-pointer',
            'text-center ring-1',
            activeRole === key
              ? 'bg-primary/[0.06] ring-primary/20 text-primary'
              : 'bg-transparent ring-dark/[0.06] text-dark/35 hover:ring-dark/15 hover:text-dark/55'
          )}
        >
          <Icon className="w-4.5 h-4.5" strokeWidth={2} />
          <span className="text-[12px] font-bold uppercase tracking-[0.06em]">{label}</span>
          <span className="text-[10px] font-medium opacity-60 hidden sm:block">{desc}</span>
        </button>
      ))}
    </div>
  )
}
