'use client'

import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'

const EASE = [0.22, 1, 0.36, 1] as const

const steps = [
  {
    num: '1',
    title: 'Share your goals',
    description: 'Tell us about your career, target roles, and what matters to you. Upload your resume. We take it from there.',
    accent: true,
  },
  {
    num: '2',
    title: 'We take over',
    description: 'Our team optimizes your resume, overhauls your LinkedIn, and starts applying to roles that match. You get weekly reports on everything.',
    accent: true,
  },
  {
    num: '3',
    title: 'You give back',
    description: 'Spend 1 to 3 evening hours (9 to 11 PM your time) training a student over a virtual meeting. Teach what you know. We provide the structure.',
    accent: true,
  },
  {
    num: '4',
    title: 'Everybody wins',
    description: 'You land interviews. You land offers. Your student gains real-world skills and confidence. The cycle continues for the next person.',
    accent: true,
  },
]

export default function HowItWorks() {
  return (
    <section className="relative py-24 sm:py-32 lg:py-40 bg-surface overflow-hidden">
      {/* Background architectural element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/[0.02] to-transparent pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
        <SectionHeading
          tag="How it works"
          title="Four steps. No complexity."
          align="left"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative group"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: EASE }}
            >
              <div className={`py-10 sm:py-12 border-t ${step.accent ? 'border-accent/30' : 'border-dark/[0.06]'}`}>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className={`text-[3rem] sm:text-[3.5rem] font-display font-semibold leading-none tracking-[-0.04em] ${step.accent ? 'text-accent' : 'text-dark/[0.06]'}`}>
                    {step.num}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-semibold text-dark tracking-[-0.02em]">
                    {step.title}
                  </h3>
                </div>
                <p className="text-dark/45 text-[15px] leading-[1.7] max-w-sm ml-0 sm:ml-[calc(3.5rem+1rem)]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
