'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

const paddingStyles = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export default function Card({ children, className, hover = true, padding = 'md' }: CardProps) {
  return (
    <motion.div
      className={cn(
        'bg-white rounded-2xl border border-gray-border',
        hover && 'transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1',
        paddingStyles[padding],
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
