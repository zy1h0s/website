'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'

const EASE = [0.22, 1, 0.36, 1] as const

const benefits = [
  'Pre-vetted candidates with optimized, ATS-ready resumes',
  'Strong LinkedIn profiles that reflect real professionalism',
  'Interview-ready talent, prepped and briefed',
  'A growing pipeline of motivated, diverse candidates',
  'No sourcing fees for initial introductions',
]

export default function ForRecruiters() {
  return (
    <section className="relative py-24 sm:py-32 lg:py-40 bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center">
          {/* Left side - stacked stat cards */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="bg-primary rounded-2xl p-8 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 dot-grid-accent opacity-[0.12] pointer-events-none" />
              <div className="mb-8 relative z-10">
                <span className="inline-block text-accent text-[11px] font-bold uppercase tracking-[0.15em] py-1.5 px-4 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-sm shadow-sm">
                  For recruiters
                </span>
              </div>
              <p className="text-white font-display text-[2.5rem] sm:text-[3rem] font-semibold tracking-[-0.03em] leading-[1.05] mb-4">
                Better candidates.
                <br />
                <span className="text-accent">Less work</span> finding them.
              </p>
              <p className="text-white/40 text-[15px] leading-[1.7] mb-8 max-w-sm">
                Zytheq candidates come prepared. Their resumes are clean, their LinkedIn profiles are sharp, and they have been through interview prep before they ever reach your desk.
              </p>
              <Button variant="accent" size="lg" href="/contact" icon={<ArrowRight className="w-4 h-4" />}>
                Partner with us
              </Button>
            </div>
          </motion.div>

          {/* Right side - benefits */}
          <motion.div
            className="lg:col-span-6 lg:col-start-7"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.8, ease: EASE }}
          >
            <div className="space-y-0">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-5 py-5 border-b border-dark/[0.05] last:border-0 group"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.5, ease: EASE }}
                >
                  <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full ring-1 ring-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:ring-primary transition-all duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-white transition-colors duration-300" />
                  </span>
                  <p className="text-dark/55 text-[15px] leading-[1.6] group-hover:text-dark/80 transition-colors duration-300">
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
