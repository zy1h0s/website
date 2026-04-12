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
        {label && (
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
        )}
        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            required={required}
            className={cn(
              'w-full px-0 py-3 bg-transparent text-dark text-base transition-all duration-200 appearance-none pr-8 cursor-pointer',
              'border-b-2 rounded-none',
              'focus:outline-none',
              error
                ? 'border-red-400 focus:border-red-500'
                : 'border-dark/10 focus:border-primary hover:border-dark/25',
              className
            )}
            onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
            onBlur={(e) => { setFocused(false); props.onBlur?.(e) }}
            aria-invalid={!!error}
            {...props}
          >
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-dark/30 pointer-events-none" />
        </div>
        {error && (
          <p className="mt-2 text-[13px] text-red-500 font-medium" role="alert">{error}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
export default Select
