'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
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
    <div className={cn('divide-y divide-gray-border', className)}>
      {items.map((item, index) => (
        <div key={index} className="py-1">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between py-5 text-left group cursor-pointer"
            aria-expanded={openIndex === index}
            aria-controls={`accordion-panel-${index}`}
          >
            <span className="text-lg font-semibold text-dark pr-8 group-hover:text-primary transition-colors">
              {item.question}
            </span>
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/20">
              {openIndex === index ? (
                <Minus className="w-4 h-4 text-primary" />
              ) : (
                <Plus className="w-4 h-4 text-primary" />
              )}
            </span>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                id={`accordion-panel-${index}`}
                role="region"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <p className="pb-5 text-gray-medium leading-relaxed max-w-3xl">
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
