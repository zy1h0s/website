'use client'

import { motion } from 'framer-motion'
import DotPattern from '@/components/ui/DotPattern'

export default function TermsPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-primary overflow-hidden">
        <DotPattern className="opacity-[0.03]" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Terms of Service
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-medium text-lg leading-relaxed mb-6">
              Last updated: April 2026
            </p>
            {/* TODO: Replace with full terms of service content */}
            <h2 className="font-display text-2xl font-bold text-dark mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-medium leading-relaxed mb-4">
              By accessing and using the Zytheq platform, you agree to be bound by these Terms of Service.
              If you do not agree with any part of these terms, you may not use our services.
            </p>

            <h2 className="font-display text-2xl font-bold text-dark mt-8 mb-4">2. The Zytheq Model</h2>
            <p className="text-gray-medium leading-relaxed mb-4">
              Zytheq provides job search assistance to US-based candidates in exchange for their participation
              in student mentoring sessions. By signing up as a job seeker, you agree to participate in the
              training program as outlined during your onboarding.
            </p>

            <h2 className="font-display text-2xl font-bold text-dark mt-8 mb-4">3. User Responsibilities</h2>
            <p className="text-gray-medium leading-relaxed mb-4">
              You are responsible for providing accurate information, maintaining the confidentiality of your
              account, and honoring your commitments to mentoring sessions as agreed upon.
            </p>

            <h2 className="font-display text-2xl font-bold text-dark mt-8 mb-4">4. No Guarantee of Employment</h2>
            <p className="text-gray-medium leading-relaxed mb-4">
              While we work diligently to help you find employment, Zytheq does not guarantee job placement.
              Our services are designed to maximize your chances, but hiring decisions rest with employers.
            </p>

            <h2 className="font-display text-2xl font-bold text-dark mt-8 mb-4">5. Contact</h2>
            <p className="text-gray-medium leading-relaxed">
              For questions about these terms, contact us at hello@zytheq.com.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
