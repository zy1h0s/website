'use client'

import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'

const EASE = [0.22, 1, 0.36, 1] as const

export default function GiveBack() {
  return (
    <section className="relative py-24 sm:py-32 lg:py-40 bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
        <SectionHeading
          tag="The heart of Zytheq"
          title="The give-back model"
          align="left"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Editorial copy */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p className="text-[1.25rem] sm:text-[1.4rem] text-dark/70 leading-[1.65] tracking-[-0.01em] mb-8">
              Most people forget what it felt like to not know anything. You probably remember
              someone who gave you a shot, answered your questions, showed you how things actually
              work. That is what you get to be for someone.
            </p>
            <p className="text-[17px] text-dark/45 leading-[1.7] mb-12">
              This is not a burden. It is a few hours a week where you share what you have learned
              in your career with a student who is hungry to learn it. You teach them how presentations
              actually get built, how assessments get handled, how professionals think through problems.
              The kind of stuff no classroom teaches.
            </p>

            {/* Key details - horizontal layout */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-dark/[0.06] rounded-xl overflow-hidden">
              {[
                { label: 'Time', value: '9 to 11 PM', detail: 'US evening hours' },
                { label: 'Duration', value: '1 to 3 hrs', detail: 'Per session' },
                { label: 'Format', value: 'Over Zoom', detail: 'From your couch' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  className="bg-surface p-6"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: EASE }}
                >
                  <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-dark/25 mb-2">{item.label}</p>
                  <p className="text-xl font-semibold text-dark tracking-[-0.02em]">{item.value}</p>
                  <p className="text-[13px] text-dark/35 mt-0.5">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual element - connection diagram */}
          <motion.div
            className="lg:col-span-5 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
          >
            <div className="relative w-full max-w-xs" aria-hidden="true">
              <svg viewBox="0 0 300 400" className="w-full" fill="none">
                {/* Top entity */}
                <rect x="50" y="20" width="200" height="100" rx="16" fill="#154ba8" opacity="0.06" />
                <rect x="60" y="30" width="180" height="80" rx="12" fill="#154ba8" opacity="0.06" />
                <text x="150" y="65" textAnchor="middle" fill="#154ba8" fontSize="11" fontWeight="600" opacity="0.6">JOB SEEKER</text>
                <text x="150" y="85" textAnchor="middle" fill="#154ba8" fontSize="9" opacity="0.35">United States</text>

                {/* Connection dots */}
                {Array.from({ length: 7 }, (_, i) => (
                  <circle
                    key={i}
                    cx="150"
                    cy={145 + i * 16}
                    r={3 - Math.abs(i - 3) * 0.3}
                    fill="#feb800"
                    opacity={0.25 + (i / 6) * 0.5}
                  />
                ))}

                {/* Center logo */}
                <circle cx="150" cy="200" r="28" fill="#154ba8" />
                <text x="150" y="206" textAnchor="middle" fill="#feb800" fontSize="18" fontWeight="700">Z</text>

                {/* Connection dots bottom */}
                {Array.from({ length: 7 }, (_, i) => (
                  <circle
                    key={i}
                    cx="150"
                    cy={240 + i * 16}
                    r={3 - Math.abs(i - 3) * 0.3}
                    fill="#feb800"
                    opacity={0.5 - (i / 6) * 0.25}
                  />
                ))}

                {/* Bottom entity */}
                <rect x="50" y="280" width="200" height="100" rx="16" fill="#154ba8" opacity="0.06" />
                <rect x="60" y="290" width="180" height="80" rx="12" fill="#154ba8" opacity="0.06" />
                <text x="150" y="325" textAnchor="middle" fill="#154ba8" fontSize="11" fontWeight="600" opacity="0.6">STUDENT</text>
                <text x="150" y="345" textAnchor="middle" fill="#154ba8" fontSize="9" opacity="0.35">India</text>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
