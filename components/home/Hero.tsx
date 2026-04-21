'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ArrowDown, Star } from 'lucide-react'
import Button from '@/components/ui/Button'
import OfferLetter3D from '@/components/home/OfferLetter3D'

const STAGGER = 0.12
const EASE = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center gradient-mesh overflow-hidden">
      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="orb orb-primary w-[500px] h-[500px] top-[-10%] right-[-5%]" />
        <div className="orb orb-accent w-[400px] h-[400px] bottom-[10%] left-[-10%]" />
        <div className="orb orb-purple w-[350px] h-[350px] top-[40%] right-[20%]" />
        <div className="orb orb-primary w-[250px] h-[250px] top-[20%] left-[15%] opacity-50" />
      </div>

      {/* Architectural grid lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 bottom-0 left-[8%] w-px bg-white/[0.03]" />
        <div className="absolute top-0 bottom-0 left-[25%] w-px bg-white/[0.03] hidden lg:block" />
        <div className="absolute top-0 bottom-0 right-[8%] w-px bg-white/[0.03]" />
        <div className="absolute top-0 bottom-0 right-[25%] w-px bg-white/[0.03] hidden lg:block" />
        <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.03] top-[33%]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.03] top-[66%]" />
      </div>

      {/* Grain overlay */}
      <div className="grain absolute inset-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 py-32 sm:py-40 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
            >
              <span className="badge-shimmer inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.06] ring-1 ring-white/[0.08] text-[12px] font-semibold uppercase tracking-[0.12em] text-white/50">
                <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                Trusted by 500+ professionals
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="mt-8 sm:mt-10 font-display text-[clamp(2.8rem,7.5vw,6rem)] font-semibold text-white leading-[1.0] tracking-[-0.04em]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + STAGGER, duration: 0.9, ease: EASE }}
            >
              We run your{' '}
              <br className="hidden sm:block" />
              job search.{' '}
              <br className="hidden lg:block" />
              <span className="text-gradient-hero">You change</span>
              <br className="hidden sm:block" />
              <span className="text-gradient-hero">a student&apos;s life.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="mt-6 sm:mt-8 text-[17px] sm:text-[19px] text-white/35 leading-[1.7] max-w-lg"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + STAGGER * 2, duration: 0.8, ease: EASE }}
            >
              Zytheq handles your resume, applications, LinkedIn, and recruiter outreach. In return, you mentor an student for a few hours a week. That is the whole deal.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-start gap-3"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + STAGGER * 3, duration: 0.8, ease: EASE }}
            >
              <div className="glow-accent rounded-full">
                <Button variant="accent" size="lg" href="/get-started" icon={<ArrowRight className="w-4 h-4" />}>
                  I need a job
                </Button>
              </div>
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

          {/* Right side - 3D Offer Letter */}
          <OfferLetter3D />

        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-24 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/15">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-3.5 h-3.5 text-white/15" />
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
