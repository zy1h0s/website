'use client'

import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string | number
  trend?: { value: string; up: boolean }
  icon: React.ReactNode
}

export default function StatCard({ label, value, trend, icon }: StatCardProps) {
  return (
    <div className="rounded-2xl bg-white ring-1 ring-dark/[0.05] p-5 sm:p-6 hover:ring-primary/10 transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-primary/[0.06] flex items-center justify-center">
          {icon}
        </div>
        {trend && (
          <div className={cn(
            'flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold',
            trend.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
          )}>
            {trend.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend.value}
          </div>
        )}
      </div>
      <p className="text-[2rem] font-bold text-dark tracking-[-0.03em] leading-none mb-1">{value}</p>
      <p className="text-[12px] font-medium text-dark/35 uppercase tracking-[0.06em]">{label}</p>
    </div>
  )
}
