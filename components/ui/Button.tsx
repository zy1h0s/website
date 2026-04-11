'use client'

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'accent' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  fullWidth?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20 hover:shadow-primary/30',
  secondary:
    'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white',
  outline:
    'bg-transparent text-primary border-2 border-primary/30 hover:border-primary hover:bg-primary/5',
  accent:
    'bg-accent text-dark hover:bg-accent-dark shadow-lg shadow-accent/20',
  ghost:
    'bg-transparent text-gray-medium hover:text-primary hover:bg-primary/5',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', href, fullWidth, children, ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 ease-out cursor-pointer',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      'active:scale-[0.98]',
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && 'w-full',
      className
    )

    if (href) {
      return (
        <a href={href} className={classes} role="button">
          {children}
        </a>
      )
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
