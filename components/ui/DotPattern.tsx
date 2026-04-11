import { cn } from '@/lib/utils'

interface DotPatternProps {
  className?: string
  variant?: 'primary' | 'accent'
}

export default function DotPattern({ className, variant = 'primary' }: DotPatternProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 pointer-events-none',
        variant === 'primary' ? 'dot-pattern' : 'dot-pattern-accent',
        className
      )}
      aria-hidden="true"
    />
  )
}
