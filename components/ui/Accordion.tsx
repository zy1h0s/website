'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

export default function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className={cn('space-y-0', className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={index}
            className={cn(
              'border-b border-dark/8 transition-colors duration-300',
              isOpen && 'border-primary/20'
            )}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-start justify-between py-6 sm:py-7 text-left group cursor-pointer"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${index}`}
            >
              <span className={cn(
                'text-base sm:text-lg font-medium pr-12 leading-snug tracking-[-0.02em] transition-colors duration-300',
                isOpen ? 'text-primary' : 'text-dark group-hover:text-primary'
              )}>
                {item.question}
              </span>
              <span className="flex-shrink-0 mt-1 relative w-5 h-5">
                <span className={cn(
                  'absolute top-1/2 left-0 w-full h-[2px] bg-current rounded-full transition-all duration-300',
                  isOpen ? 'text-primary rotate-0' : 'text-dark/30'
                )} />
                <span className={cn(
                  'absolute top-0 left-1/2 w-[2px] h-full bg-current rounded-full transition-all duration-300',
                  isOpen ? 'text-primary rotate-90 opacity-0' : 'text-dark/30 opacity-100'
                )} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${index}`}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 sm:pb-7 text-dark/55 leading-[1.75] max-w-2xl text-[15px]">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
