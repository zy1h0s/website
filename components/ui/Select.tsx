'use client'

import { cn } from '@/lib/utils'
import { forwardRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, id, required, ...props }, ref) => {
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
        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            required={required}
            className={cn(
              'w-full px-4 py-3 rounded-lg border bg-white text-dark transition-all duration-200 appearance-none pr-10',
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
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-medium pointer-events-none" />
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

export default Select
