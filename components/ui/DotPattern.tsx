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
        variant === 'primary' ? 'dot-grid opacity-[0.035]' : 'dot-grid-accent opacity-[0.05]',
        className
      )}
      aria-hidden="true"
    />
  )
}
