'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
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
            <div className="relative w-full aspect-[4/5] max-w-sm rounded-2xl overflow-hidden ring-1 ring-dark/10 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                alt="Professional mentorship session"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-dark/10 to-transparent flex flex-col justify-end p-8">
                <p className="text-white font-medium">Mentorship in action</p>
                <p className="text-white/70 text-sm mt-1">US professionals & Indian students</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
