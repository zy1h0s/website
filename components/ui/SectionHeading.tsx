'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  tag?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
  className?: string
}

export default function SectionHeading({ tag, title, subtitle, align = 'center', light = false, className }: SectionHeadingProps) {
  return (
    <motion.div
      className={cn(
        'mb-16 sm:mb-20',
        align === 'center' && 'text-center',
        className
      )}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {tag && (
        <span className={cn(
          'inline-block text-[12px] font-semibold uppercase tracking-[0.12em] mb-4',
          light ? 'text-accent' : 'text-primary'
        )}>
          {tag}
        </span>
      )}
      <h2 className={cn(
        'font-display text-[2rem] sm:text-[2.5rem] lg:text-[3.25rem] font-semibold tracking-[-0.03em] leading-[1.1]',
        light ? 'text-white' : 'text-dark'
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'mt-5 text-[17px] leading-[1.7] max-w-xl',
          align === 'center' && 'mx-auto',
          light ? 'text-white/50' : 'text-dark/45'
        )}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
