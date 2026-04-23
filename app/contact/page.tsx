'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import ContactForm from '@/components/forms/ContactForm'
import DotPattern from '@/components/ui/DotPattern'
import Accordion from '@/components/ui/Accordion'

const EASE = [0.22, 1, 0.36, 1] as const

const contactFaq = [
  { question: 'Can I schedule a call?', answer: 'Yes. Send us a message or email us directly, and we will set up a time that works. We do free consultation calls for anyone who wants to learn more before committing.' },
  { question: 'Where are you based?', answer: 'Our team operates across the United States and India. We work remotely, which means we support candidates and students in any time zone.' },
  { question: 'I am a recruiter. How do I partner with you?', answer: 'Select "Recruiter" in the form and tell us about your hiring needs. We will follow up with details on how our candidate pipeline works.' },
]

export default function ContactPage() {
  return (
    <>
      <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 bg-primary-deeper overflow-hidden grain">
        <DotPattern className="opacity-[0.025]" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} className="max-w-2xl">
            <span className="inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-white/30 mb-5">
              <span className="w-6 h-px bg-accent/50" />Contact
            </span>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-semibold text-white tracking-[-0.04em] leading-[1.05]">
              Get in touch
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-28 lg:py-36 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <div className="lg:sticky lg:top-28 space-y-10">
                {/* Contact details */}
                <div className="space-y-6">
                  {[
                    { label: 'Email', value: 'contact@zytheq.com', href: 'mailto:contact@zytheq.com' },
                    { label: 'Response time', value: 'Within 24 hours' },
                    { label: 'Location', value: 'United States & India' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: EASE }}
                    >
                      <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-dark/25 mb-1">{item.label}</p>
                      {'href' in item && item.href ? (
                        <a href={item.href} className="text-dark font-medium inline-flex items-center gap-1 hover:text-primary transition-colors">
                          {item.value} <ArrowUpRight className="w-3 h-3 opacity-40" />
                        </a>
                      ) : (
                        <p className="text-dark font-medium">{item.value}</p>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-dark/[0.06] pt-8">
                  <p className="text-[13px] font-semibold text-dark/40 mb-4">Common questions</p>
                  <Accordion items={contactFaq} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
