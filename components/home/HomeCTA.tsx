'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Button from '@/components/ui/Button'

const EASE = [0.22, 1, 0.36, 1] as const

export default function HomeCTA() {
  return (
    <section className="relative py-28 sm:py-36 lg:py-44 gradient-mesh-cta overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="orb orb-accent w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
        <div className="orb orb-primary w-[300px] h-[300px] top-[10%] left-[10%] opacity-30" />
        <div className="orb orb-purple w-[200px] h-[200px] bottom-[15%] right-[15%] opacity-25" />
        <div className="grain absolute inset-0" />
      </div>

      {/* Architectural lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-[20%] w-px h-full bg-white/[0.03]" />
        <div className="absolute top-0 right-[20%] w-px h-full bg-white/[0.03]" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-white/[0.02]" />
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-white/[0.02]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <motion.div
            className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-accent/5 ring-1 ring-accent/10 flex items-center justify-center overflow-hidden"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image src="/z.png" alt="Zytheq logo" width={32} height={32} className="object-contain" />
          </motion.div>

          <h2 className="font-display text-[2.2rem] sm:text-[3rem] lg:text-[3.75rem] font-semibold text-white tracking-[-0.04em] leading-[1.05]">
            Your next job is closer
            <br />than you think.
          </h2>
          <p className="mt-5 text-[17px] sm:text-[19px] text-white/30 leading-[1.65]">
            And someone out there is waiting to learn from you.
          </p>

          <div className="mt-12 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="glow-accent rounded-full">
              <Button variant="accent" size="lg" href="/get-started" icon={<ArrowRight className="w-4 h-4" />}>
                Get started as a job seeker
              </Button>
            </div>
            <Button variant="ghost" size="lg" href="/join-as-student" className="text-white/40 hover:text-white hover:bg-white/[0.06]">
              Join as a student
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
