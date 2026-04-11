'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

export default function HomeCTA() {
  return (
    <section className="relative py-20 sm:py-28 lg:py-32 bg-primary overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-accent/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Your next job is closer than you think.
          </h2>
          <p className="mt-4 text-xl text-white/60">
            And someone out there is waiting to learn from you.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="accent" size="lg" href="/get-started">
              Get started as a job seeker
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/join-as-student"
              className="border-white/30 text-white hover:bg-white hover:text-primary"
            >
              Join as a student
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
