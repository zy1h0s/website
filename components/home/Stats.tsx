'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { STATS } from '@/lib/constants'

const EASE = [0.22, 1, 0.36, 1] as const

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2200
    const increment = value / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= value) { setCount(value); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])

  return <span ref={ref} className="tabular-nums">{count.toLocaleString()}{suffix}</span>
}

const statDescriptions = [
  'professionals found their next role through Zytheq',
  'one-on-one mentoring sessions completed',
  'companies hiring from our candidate pool',
  'of our candidates receive interview callbacks',
]

export default function Stats() {
  return (
    <section className="relative py-24 sm:py-32 lg:py-40 overflow-hidden gradient-mesh">
      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="orb orb-accent w-[300px] h-[300px] top-[20%] left-[10%] opacity-30" />
        <div className="orb orb-primary w-[250px] h-[250px] bottom-[10%] right-[15%] opacity-40" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative text-center lg:text-left group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: EASE }}
            >
              <div className="text-gradient-stat text-[3.5rem] sm:text-[4rem] lg:text-[5rem] font-sans font-semibold tracking-[-0.04em] leading-none mb-3">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-accent text-[14px] font-semibold uppercase tracking-[0.06em] mb-2">
                {stat.label}
              </p>
              <p className="text-white/25 text-[14px] leading-[1.6] max-w-[200px] mx-auto lg:mx-0">
                {statDescriptions[i]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
