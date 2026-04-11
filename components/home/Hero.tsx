'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Button from '@/components/ui/Button'

function FloatingDots() {
  const dots = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 5,
    duration: Math.random() * 8 + 12,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full bg-accent/30"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-primary overflow-hidden">
      <FloatingDots />

      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-primary-dark" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-white/80 text-sm font-medium">No fees. No catches. Just a fair exchange.</span>
          </motion.div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] max-w-5xl mx-auto">
            We run your job search.
            <br />
            <span className="text-accent">You change a student&apos;s life.</span>
          </h1>

          <motion.p
            className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Zytheq handles your resume, applications, LinkedIn, and recruiter outreach.
            In return, you spend a few evening hours mentoring an Indian student. That is the whole deal.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Button variant="accent" size="lg" href="/get-started">
              I need a job
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/join-as-student"
              className="border-white/30 text-white hover:bg-white hover:text-primary"
            >
              I want to learn
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <a href="#problem" aria-label="Scroll to next section">
            <ChevronDown className="w-6 h-6 text-white/40" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
