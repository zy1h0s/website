'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
  className?: string
}

export default function SectionHeading({ title, subtitle, centered = true, light = false, className }: SectionHeadingProps) {
  return (
    <motion.div
      className={cn(
        'mb-12 md:mb-16',
        centered && 'text-center',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h2 className={cn(
        'font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight',
        light ? 'text-white' : 'text-dark'
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'mt-4 text-lg max-w-2xl leading-relaxed',
          centered && 'mx-auto',
          light ? 'text-white/70' : 'text-gray-medium'
        )}>
          {subtitle}
        </p>
      )}
      <div className={cn(
        'mt-6 flex items-center gap-1.5',
        centered && 'justify-center'
      )}>
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span className="w-2 h-2 rounded-full bg-accent/60" />
        <span className="w-2 h-2 rounded-full bg-accent/30" />
      </div>
    </motion.div>
  )
}
