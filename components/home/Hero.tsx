'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import Button from '@/components/ui/Button'

const STAGGER = 0.12
const EASE = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end bg-primary-deeper overflow-hidden grain">
      {/* Architectural grid lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 bottom-0 left-[8%] w-px bg-white/[0.04]" />
        <div className="absolute top-0 bottom-0 left-[25%] w-px bg-white/[0.04] hidden lg:block" />
        <div className="absolute top-0 bottom-0 right-[8%] w-px bg-white/[0.04]" />
        <div className="absolute top-0 bottom-0 right-[25%] w-px bg-white/[0.04] hidden lg:block" />
        {/* Accent dot cluster */}
        <div className="absolute top-[18%] right-[12%] lg:right-[20%]">
          <svg width="80" height="80" viewBox="0 0 80 80" className="opacity-20">
            {[0, 1, 2, 3, 4].map(row =>
              [0, 1, 2, 3, 4].map(col => (
                <circle key={`${row}-${col}`} cx={8 + col * 16} cy={8 + row * 16} r="2" fill="#feb800" />
              ))
            )}
          </svg>
        </div>
        {/* Gradient overlays */}
        <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-primary-deeper via-primary-deeper/80 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-primary-deeper/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 pb-16 sm:pb-20 lg:pb-24 pt-40 sm:pt-48 w-full">
        <div className="max-w-4xl">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
          >
            <span className="inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-white/40">
              <span className="w-6 h-px bg-accent" />
              No fees. No catches. Just exchange.
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="mt-7 sm:mt-8 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-semibold text-white leading-[1.02] tracking-[-0.04em]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + STAGGER, duration: 0.9, ease: EASE }}
          >
            We run your <br className="hidden sm:block" />
            job search.{' '}
            <span className="text-accent">You change</span>
            <br className="hidden sm:block" />
            <span className="text-accent">a student&apos;s life.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="mt-6 sm:mt-8 text-[17px] sm:text-[19px] text-white/40 leading-[1.65] max-w-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + STAGGER * 2, duration: 0.8, ease: EASE }}
          >
            Zytheq handles your resume, applications, LinkedIn, and recruiter outreach. In return, you mentor an Indian student for a few hours a week. That is the whole deal.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-start gap-3"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + STAGGER * 3, duration: 0.8, ease: EASE }}
          >
            <Button variant="accent" size="lg" href="/get-started" icon={<ArrowRight className="w-4 h-4" />}>
              I need a job
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="/join-as-student"
              className="text-white/50 hover:text-white hover:bg-white/[0.06]"
            >
              I want to learn
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator - bottom right */}
        <motion.div
          className="absolute bottom-16 sm:bottom-20 lg:bottom-24 right-5 sm:right-8 lg:right-10 hidden sm:flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/20 [writing-mode:vertical-rl]">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-3.5 h-3.5 text-white/20" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom marquee */}
      <div className="relative z-10 border-t border-white/[0.06] overflow-hidden">
        <div className="animate-marquee whitespace-nowrap py-3.5 flex">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-6 mx-6 text-[12px] uppercase tracking-[0.15em] text-white/15 font-medium">
              <span>Resume Optimization</span>
              <span className="w-1 h-1 rounded-full bg-accent/40" />
              <span>LinkedIn Strategy</span>
              <span className="w-1 h-1 rounded-full bg-accent/40" />
              <span>Targeted Applications</span>
              <span className="w-1 h-1 rounded-full bg-accent/40" />
              <span>Recruiter Outreach</span>
              <span className="w-1 h-1 rounded-full bg-accent/40" />
              <span>Interview Prep</span>
              <span className="w-1 h-1 rounded-full bg-accent/40" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
