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
      <div className="w-full">
        <label
          htmlFor={inputId}
          className={cn(
            'block text-sm font-medium mb-1.5 transition-colors',
            focused ? 'text-primary' : 'text-dark-secondary',
            error && 'text-red-600'
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          required={required}
          className={cn(
            'w-full px-4 py-3 rounded-lg border bg-white text-dark transition-all duration-200',
            'placeholder:text-gray-medium/60',
            'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
            error
              ? 'border-red-400 focus:ring-red-200 focus:border-red-400'
              : 'border-gray-border hover:border-gray-medium/40',
            className
          )}
          onFocus={(e) => {
            setFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setFocused(false)
            props.onBlur?.(e)
          }}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-gray-medium">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
