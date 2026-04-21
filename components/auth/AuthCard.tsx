'use client'

import { cn } from '@/lib/utils'

interface AuthCardProps {
  children: React.ReactNode
  className?: string
}

export default function AuthCard({ children, className }: AuthCardProps) {
  return (
    <div
      className={cn(
        'w-full max-w-[480px] mx-auto rounded-2xl bg-white p-8 sm:p-10',
        'ring-1 ring-dark/[0.06]',
        className
      )}
      style={{
        boxShadow: `
          0 1px 3px rgba(0,0,0,0.04),
          0 4px 12px rgba(0,0,0,0.04),
          0 16px 40px -8px rgba(0,0,0,0.08)
        `,
      }}
    >
      {children}
    </div>
  )
}
