'use client'

import { cn } from '@/lib/utils'
import { forwardRef, useState } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, id, required, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-')
    const [focused, setFocused] = useState(false)

    return (
      <div className="w-full group">
        <label
          htmlFor={inputId}
          className={cn(
            'block text-[13px] font-medium mb-2 tracking-[-0.01em] uppercase transition-colors duration-200',
            focused ? 'text-primary' : 'text-dark/50',
            error && 'text-red-500'
          )}
        >
          {label}
          {required && <span className="text-accent ml-0.5">*</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          required={required}
          className={cn(
            'w-full px-0 py-3 bg-transparent text-dark text-base transition-all duration-200',
            'border-b-2 rounded-none',
            'placeholder:text-dark/25',
            'focus:outline-none',
            error
              ? 'border-red-400 focus:border-red-500'
              : 'border-dark/10 focus:border-primary hover:border-dark/25',
            className
          )}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e) }}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-2 text-[13px] text-red-500 font-medium" role="alert">{error}</p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-2 text-[13px] text-dark/40">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
