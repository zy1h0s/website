'use client'

import { motion } from 'framer-motion'
import DotPattern from '@/components/ui/DotPattern'

const EASE = [0.22, 1, 0.36, 1] as const

const sections = [
  {
    title: '1. Information We Collect',
    content: 'We collect information you provide directly to us, including your name, email address, phone number, resume, career information, and any other information you choose to provide when using our platform. We also collect technical data such as your IP address, browser type, and device information when you visit our site.',
  },
  {
    title: '2. How We Use Your Information',
    content: 'We use the information we collect to provide, maintain, and improve our services, to process your applications, match you with appropriate opportunities or mentors, and to communicate with you about your account and our services. We may also use your information to send you updates about new features or opportunities that may interest you.',
  },
  {
    title: '3. Information Sharing',
    content: 'We do not sell your personal information. We may share your information with potential employers or recruiters only with your consent and as part of our job placement services. We may also share information with service providers who assist us in operating our platform, subject to confidentiality obligations.',
  },
  {
    title: '4. Data Security',
    content: 'We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or electronic storage is completely secure.',
  },
  {
    title: '5. Your Rights',
    content: 'You may access, update, or delete your personal information at any time by contacting us. You may also opt out of receiving promotional communications from us by following the unsubscribe instructions in those messages.',
  },
  {
    title: '6. Contact Us',
    content: 'If you have questions about this privacy policy, please contact us at hello@zytheq.com.',
  },
]

export default function PrivacyPage() {
  return (
    <>
      <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 bg-primary-deeper overflow-hidden grain">
        <DotPattern className="opacity-[0.025]" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} className="max-w-2xl">
            <span className="inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-white/30 mb-5">
              <span className="w-6 h-px bg-accent/50" />Legal
            </span>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-semibold text-white tracking-[-0.04em] leading-[1.05]">
              Privacy Policy
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-28 lg:py-36 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
            <div className="lg:col-span-7">
              <p className="text-[13px] font-medium uppercase tracking-[0.1em] text-dark/25 mb-12">
                Last updated: April 2026
              </p>
              <div className="space-y-12">
                {sections.map((section, i) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: EASE }}
                  >
                    <h2 className="text-[18px] font-semibold text-dark tracking-[-0.02em] mb-3">{section.title}</h2>
                    <p className="text-[15px] text-dark/45 leading-[1.8]">{section.content}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <div className="lg:sticky lg:top-28 space-y-8">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-dark/25 mb-1">Questions?</p>
                  <a href="mailto:hello@zytheq.com" className="text-dark font-medium hover:text-primary transition-colors">
                    hello@zytheq.com
                  </a>
                </div>
                <div className="border-t border-dark/[0.06] pt-6">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-dark/25 mb-1">Also see</p>
                  <a href="/terms" className="text-dark font-medium hover:text-primary transition-colors">
                    Terms of Service
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
