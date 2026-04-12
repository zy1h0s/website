'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { STATS } from '@/lib/constants'

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

export default function Stats() {
  return (
    <section className="relative py-20 sm:py-24 bg-primary-deeper overflow-hidden grain">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className={`relative py-8 sm:py-10 px-4 sm:px-6 text-center ${i > 0 ? 'border-l border-white/[0.06]' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem] font-display font-semibold text-white tracking-[-0.03em] leading-none mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-white/25 text-[13px] font-medium uppercase tracking-[0.08em]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
