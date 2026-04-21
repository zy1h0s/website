'use client'

import DashboardPageShell from '@/components/dashboard/DashboardPageShell'
import { cn } from '@/lib/utils'

const threads = [
  { name: 'Alex Morgan (Mentor)', initials: 'AM', preview: 'Great session today! For next time, review the React docs on useEffect.', time: '1d ago', unread: true },
  { name: 'Zytheq Support', initials: 'ZS', preview: 'Welcome to Zytheq! Your mentor has been assigned. First session details are below.', time: '5d ago', unread: false },
]

export default function StudentMessagesPage() {
  return (
    <DashboardPageShell role="student" title="Messages" description="Chat with your mentor and support team.">
      <div className="rounded-2xl bg-white ring-1 ring-dark/[0.05] overflow-hidden">
        {threads.map((t, i) => (
          <div key={i} className={cn('flex items-center gap-4 px-6 py-4 hover:bg-surface/50 transition-colors cursor-pointer', i < threads.length - 1 && 'border-b border-dark/[0.04]')}>
            <div className={cn('w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-[12px] font-bold', t.unread ? 'bg-primary/10 text-primary' : 'bg-surface text-dark/30')}>{t.initials}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className={cn('text-[14px] truncate', t.unread ? 'font-bold text-dark' : 'font-medium text-dark/70')}>{t.name}</p>
                <span className="text-[11px] text-dark/25 flex-shrink-0">{t.time}</span>
              </div>
              <p className="text-[13px] text-dark/40 truncate mt-0.5">{t.preview}</p>
            </div>
            {t.unread && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
          </div>
        ))}
      </div>
    </DashboardPageShell>
  )
}
