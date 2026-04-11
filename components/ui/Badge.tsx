import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'accent' | 'success' | 'neutral'
  className?: string
}

const variants = {
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-accent/15 text-dark',
  success: 'bg-green-100 text-green-700',
  neutral: 'bg-gray-100 text-gray-medium',
}

export default function Badge({ children, variant = 'primary', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}
