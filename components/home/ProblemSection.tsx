'use client'

import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as const

const painPoints = [
  { text: 'Spent 3 hours customizing a resume for a job that auto-rejected you in 10 seconds.', num: '01' },
  { text: 'Applied to 200 jobs this month. Got 4 auto-replies and zero humans.', num: '02' },
  { text: 'Your LinkedIn has 500+ connections and none of them are helping.', num: '03' },
  { text: 'You rehearsed your "tell me about yourself" in the shower again. Still no interview to use it in.', num: '04' },
]

const reliefPoints = [
  { text: 'Your resume is already optimized and sent to 40 targeted roles this week. You are watching a movie.', num: '01' },
  { text: 'Recruiters are reaching out to you because your LinkedIn actually works now.', num: '02' },
  { text: 'You got 3 interview requests this week. You did not apply to any of them yourself.', num: '03' },
  { text: 'Your evenings feel meaningful because you are teaching someone real skills over Zoom.', num: '04' },
]

export default function ProblemSection() {
  return (
    <section id="problem" className="relative py-24 sm:py-32 lg:py-40 bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
        {/* Section intro */}
        <motion.div
          className="max-w-2xl mb-20 sm:mb-28"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-primary/50 mb-5">
            <span className="w-6 h-px bg-primary/30" />
            The reality
          </span>
          <h2 className="font-display text-[2rem] sm:text-[2.75rem] lg:text-[3.5rem] font-semibold text-dark tracking-[-0.035em] leading-[1.08]">
            You VS<br />Our team
          </h2>
        </motion.div>

        {/* Two column comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0">
          {/* Left: pain */}
          <div className="lg:col-span-5">
            <motion.div
              className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-dark/25 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span className="w-2 h-2 rounded-full bg-red-400/60" />
              You, right now
            </motion.div>
            <div className="space-y-0 rounded-2xl overflow-hidden border border-red-100/60 bg-gradient-to-b from-red-50/40 to-transparent">
              {painPoints.map((point, i) => (
                <motion.div
                  key={i}
                  className="py-5 px-6 border-b border-red-100/40 last:border-0 group"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
                >
                  <div className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                      <X className="w-3 h-3 text-red-400" />
                    </span>
                    <p className="text-dark/50 text-[15px] leading-[1.65] group-hover:text-dark/70 transition-colors duration-300">
                      {point.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Divider - Mobile */}
          <div className="flex lg:hidden justify-center items-center py-2">
            <div className="w-10 h-10 rounded-full bg-white ring-1 ring-dark/[0.06] flex items-center justify-center shadow-sm">
              <span className="text-[11px] font-semibold text-primary">VS</span>
            </div>
          </div>

          {/* Divider - Desktop */}
          <div className="hidden lg:flex lg:col-span-2 justify-center items-center">
            <div className="relative flex flex-col items-center">
              <motion.div
                className="w-px h-full bg-gradient-to-b from-red-200 via-primary/15 to-emerald-200 absolute"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE }}
              />
              <motion.div
                className="relative z-10 w-10 h-10 rounded-full bg-white ring-1 ring-dark/[0.06] flex items-center justify-center shadow-sm"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
              >
                <span className="text-[11px] font-semibold text-primary">VS</span>
              </motion.div>
            </div>
          </div>

          {/* Right: relief */}
          <div className="lg:col-span-5">
            <motion.div
              className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-primary/60 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              You, with Zytheq
            </motion.div>
            <div className="space-y-0 rounded-2xl overflow-hidden border border-emerald-100/60 bg-gradient-to-b from-emerald-50/40 to-transparent">
              {reliefPoints.map((point, i) => (
                <motion.div
                  key={i}
                  className="py-5 px-6 border-b border-emerald-100/40 last:border-0 group"
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
                >
                  <div className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-emerald-500" />
                    </span>
                    <p className="text-dark/70 text-[15px] leading-[1.65] group-hover:text-dark transition-colors duration-300">
                      {point.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
