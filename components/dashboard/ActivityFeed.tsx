'use client'

import { cn } from '@/lib/utils'

interface ActivityItem {
  id: string
  text: string
  time: string
  type: 'success' | 'info' | 'warning'
}

interface ActivityFeedProps {
  items: ActivityItem[]
  title?: string
}

const dotColors = {
  success: 'bg-emerald-400',
  info: 'bg-primary/60',
  warning: 'bg-accent',
}

export default function ActivityFeed({ items, title = 'Recent Activity' }: ActivityFeedProps) {
  return (
    <div className="rounded-2xl bg-white ring-1 ring-dark/[0.05] p-5 sm:p-6">
      <h3 className="text-[14px] font-bold text-dark tracking-[-0.01em] mb-5">{title}</h3>
      <div className="space-y-0">
        {items.map((item, i) => (
          <div key={item.id} className={cn('flex items-start gap-3 py-3', i < items.length - 1 && 'border-b border-dark/[0.04]')}>
            <div className="flex flex-col items-center pt-1.5">
              <div className={cn('w-2 h-2 rounded-full flex-shrink-0', dotColors[item.type])} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] text-dark/65 leading-relaxed">{item.text}</p>
              <p className="text-[11px] text-dark/25 font-medium mt-0.5">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
