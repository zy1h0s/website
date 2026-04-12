'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import JobSeekerForm from '@/components/forms/JobSeekerForm'
import DotPattern from '@/components/ui/DotPattern'

const EASE = [0.22, 1, 0.36, 1] as const

export default function GetStartedPage() {
  return (
    <>
      <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 bg-primary-deeper overflow-hidden grain">
        <DotPattern className="opacity-[0.025]" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} className="max-w-2xl">
            <span className="inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-white/30 mb-5">
              <span className="w-6 h-px bg-accent/50" />For Job Seekers
            </span>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-semibold text-white tracking-[-0.04em] leading-[1.05]">
              Let us handle your job search
            </h1>
            <p className="mt-5 text-[17px] text-white/40 leading-relaxed max-w-lg">
              Fill out this form and our team takes it from here. Takes about 3 minutes.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-28 lg:py-36 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
            <div className="lg:col-span-7">
              <JobSeekerForm />
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <div className="lg:sticky lg:top-28 space-y-10">
                <div className="space-y-6">
                  {[
                    { label: 'Time to complete', value: 'About 3 minutes' },
                    { label: 'Response time', value: 'Within 48 hours' },
                    { label: 'Cost', value: 'Completely free' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: EASE }}
                    >
                      <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-dark/25 mb-1">{item.label}</p>
                      <p className="text-dark font-medium">{item.value}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-dark/[0.06] pt-8">
                  <p className="text-[13px] font-semibold text-dark/40 mb-4">What happens next?</p>
                  <div className="space-y-4">
                    {[
                      'We review your profile and career goals',
                      'You get matched with a dedicated career team',
                      'We start sourcing and applying on your behalf',
                    ].map((text, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full ring-1 ring-dark/10 flex items-center justify-center text-[11px] font-semibold text-dark/30 mt-0.5">
                          {i + 1}
                        </span>
                        <p className="text-[14px] text-dark/50 leading-relaxed">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-dark/[0.06] pt-8">
                  <a href="/how-it-works" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-dark/40 hover:text-dark transition-colors">
                    Learn how Zytheq works <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
