'use client'

import { motion } from 'framer-motion'
import DotPattern from '@/components/ui/DotPattern'

const EASE = [0.22, 1, 0.36, 1] as const

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: 'By accessing and using the Zytheq platform, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.',
  },
  {
    title: '2. The Zytheq Model',
    content: 'Zytheq provides job search assistance to US-based candidates in exchange for their participation in student mentoring sessions. By signing up as a job seeker, you agree to participate in the training program as outlined during your onboarding. Students receive mentorship at no cost and agree to attend scheduled sessions.',
  },
  {
    title: '3. User Responsibilities',
    content: 'You are responsible for providing accurate information, maintaining the confidentiality of your account, and honoring your commitments to mentoring sessions as agreed upon. Misrepresentation of qualifications, experience, or identity may result in removal from the platform.',
  },
  {
    title: '4. No Guarantee of Employment',
    content: 'While we work diligently to help you find employment, Zytheq does not guarantee job placement. Our services are designed to maximize your chances, but hiring decisions rest with employers. We provide tools, preparation, and outreach, not employment contracts.',
  },
  {
    title: '5. Intellectual Property',
    content: 'All content, branding, and materials on the Zytheq platform are the property of Zytheq. Users may not reproduce, distribute, or create derivative works from our content without written permission.',
  },
  {
    title: '6. Termination',
    content: 'We reserve the right to suspend or terminate your account if you violate these terms, fail to meet your mentoring commitments, or engage in conduct that is harmful to other users or the platform.',
  },
  {
    title: '7. Contact',
    content: 'For questions about these terms, contact us at hello@zytheq.com.',
  },
]

export default function TermsPage() {
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
              Terms of Service
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
                  <a href="/privacy" className="text-dark font-medium hover:text-primary transition-colors">
                    Privacy Policy
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
