'use client'

import { motion } from 'framer-motion'
import { TESTIMONIALS } from '@/lib/constants'

const EASE = [0.22, 1, 0.36, 1] as const

// Split testimonials into 3 columns with varying sizes
const col1 = [0, 3, 6, 9, 12, 15]
const col2 = [1, 4, 7, 10, 13, 16]
const col3 = [2, 5, 8, 11, 14]

function TestimonialCard({ testimonial, index }: { testimonial: typeof TESTIMONIALS[0]; index: number }) {
  return (
    <motion.div
      className="group mb-4"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: Math.min(index * 0.04, 0.2), duration: 0.7, ease: EASE }}
    >
      <div className="rounded-2xl p-6 sm:p-7 bg-white ring-1 ring-dark/[0.04] hover:ring-primary/10 transition-all duration-500 hover:shadow-[0_4px_32px_-8px_rgba(21,75,168,0.08)]">
        <p className="text-dark/65 text-[15px] leading-[1.7] mb-5">
          &ldquo;{testimonial.text}&rdquo;
        </p>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/[0.06] flex items-center justify-center">
            <span className="text-primary/60 text-[11px] font-bold">{testimonial.role[0]}{testimonial.location[0]}</span>
          </div>
          <div>
            <p className="text-[13px] font-medium text-dark/70">{testimonial.role}</p>
            <p className="text-[12px] text-dark/30">{testimonial.location}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32 lg:py-40 bg-surface overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
        <motion.div
          className="max-w-2xl mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-primary/50 mb-5">
            <span className="w-6 h-px bg-primary/30" />
            Testimonials
          </span>
          <h2 className="font-display text-[2rem] sm:text-[2.75rem] lg:text-[3.5rem] font-semibold text-dark tracking-[-0.035em] leading-[1.08]">
            Real people.<br />Real results.
          </h2>
          <p className="mt-5 text-[17px] text-dark/40 leading-[1.7]">
            From candidates who got placed, students who grew, and recruiters who noticed.
          </p>
        </motion.div>

        {/* Masonry 3-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 items-start">
          <div>
            {col1.map((idx) => TESTIMONIALS[idx] && (
              <TestimonialCard key={idx} testimonial={TESTIMONIALS[idx]} index={idx} />
            ))}
          </div>
          <div className="hidden md:block lg:mt-12">
            {col2.map((idx) => TESTIMONIALS[idx] && (
              <TestimonialCard key={idx} testimonial={TESTIMONIALS[idx]} index={idx} />
            ))}
          </div>
          <div className="hidden lg:block mt-6">
            {col3.map((idx) => TESTIMONIALS[idx] && (
              <TestimonialCard key={idx} testimonial={TESTIMONIALS[idx]} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
