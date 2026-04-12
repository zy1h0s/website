'use client'

import { motion } from 'framer-motion'
import Accordion from '@/components/ui/Accordion'
import { FAQ_DATA } from '@/lib/constants'

const EASE = [0.22, 1, 0.36, 1] as const

export default function FAQ() {
  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left - sticky heading */}
          <motion.div
            className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className="inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-primary/50 mb-5">
              <span className="w-6 h-px bg-primary/30" />
              FAQ
            </span>
            <h2 className="font-display text-[2rem] sm:text-[2.5rem] font-semibold text-dark tracking-[-0.035em] leading-[1.08]">
              Questions you probably have
            </h2>
            <p className="mt-4 text-[15px] text-dark/40 leading-[1.7]">
              Straight answers. No jargon. If you have a question not listed here, reach out.
            </p>
          </motion.div>

          {/* Right - accordion */}
          <div className="lg:col-span-7 lg:col-start-6">
            <Accordion items={FAQ_DATA} />
          </div>
        </div>
      </div>
    </section>
  )
}
