import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'accent' | 'success' | 'neutral' | 'dark'
  className?: string
}

const variants = {
  primary: 'bg-primary/8 text-primary ring-1 ring-primary/10',
  accent: 'bg-accent/10 text-dark ring-1 ring-accent/15',
  success: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/50',
  neutral: 'bg-dark/5 text-dark/60 ring-1 ring-dark/8',
  dark: 'bg-dark text-white',
}

export default function Badge({ children, variant = 'primary', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold uppercase tracking-[0.04em]',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}
