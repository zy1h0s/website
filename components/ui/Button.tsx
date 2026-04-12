'use client'

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'accent' | 'ghost' | 'dark'
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  fullWidth?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-dark ring-1 ring-primary/20 hover:ring-primary/40',
  secondary:
    'bg-white text-dark ring-1 ring-gray-border hover:ring-primary/40 hover:text-primary',
  outline:
    'bg-transparent text-primary ring-1 ring-primary/25 hover:bg-primary/5 hover:ring-primary/50',
  accent:
    'bg-accent text-dark hover:bg-accent-dark ring-1 ring-accent/30',
  ghost:
    'bg-transparent text-gray-medium hover:text-dark hover:bg-dark/5',
  dark:
    'bg-dark text-white hover:bg-dark-secondary ring-1 ring-white/10',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-[13px] gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-[15px] gap-2.5',
  xl: 'px-9 py-4.5 text-base gap-3',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', href, fullWidth, icon, iconPosition = 'right', children, ...props }, ref) => {
    const classes = cn(
      'relative inline-flex items-center justify-center font-medium rounded-full transition-all duration-250 ease-out cursor-pointer',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
      'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
      'tracking-[-0.01em]',
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && 'w-full',
      className
    )

    const content = (
      <>
        {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
      </>
    )

    if (href) {
      return (
        <a href={href} className={classes} role="button">
          {content}
        </a>
      )
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {content}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
