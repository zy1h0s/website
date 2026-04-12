'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'

const EASE = [0.22, 1, 0.36, 1] as const

export default function HomeCTA() {
  return (
    <section className="relative py-24 sm:py-32 lg:py-40 bg-surface overflow-hidden">
      {/* Architectural lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-dark/[0.03]" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-dark/[0.03]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <h2 className="font-display text-[2rem] sm:text-[2.75rem] lg:text-[3.5rem] font-semibold text-dark tracking-[-0.035em] leading-[1.08]">
            Your next job is closer
            <br />than you think.
          </h2>
          <p className="mt-5 text-[17px] sm:text-[19px] text-dark/35 leading-[1.65]">
            And someone out there is waiting to learn from you.
          </p>

          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="dark" size="lg" href="/get-started" icon={<ArrowRight className="w-4 h-4" />}>
              Get started as a job seeker
            </Button>
            <Button variant="outline" size="lg" href="/join-as-student">
              Join as a student
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
