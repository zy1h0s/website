'use client'

import { motion } from 'framer-motion'
import DotPattern from '@/components/ui/DotPattern'

export default function PrivacyPage() {
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
              Privacy Policy
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
            {/* TODO: Replace with full privacy policy content */}
            <h2 className="font-display text-2xl font-bold text-dark mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-gray-medium leading-relaxed mb-4">
              We collect information you provide directly to us, including your name, email address, phone number,
              resume, career information, and any other information you choose to provide when using our platform.
            </p>

            <h2 className="font-display text-2xl font-bold text-dark mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-medium leading-relaxed mb-4">
              We use the information we collect to provide, maintain, and improve our services, to process your
              applications, match you with appropriate opportunities or mentors, and to communicate with you.
            </p>

            <h2 className="font-display text-2xl font-bold text-dark mt-8 mb-4">3. Information Sharing</h2>
            <p className="text-gray-medium leading-relaxed mb-4">
              We do not sell your personal information. We may share your information with potential employers
              or recruiters only with your consent and as part of our job placement services.
            </p>

            <h2 className="font-display text-2xl font-bold text-dark mt-8 mb-4">4. Data Security</h2>
            <p className="text-gray-medium leading-relaxed mb-4">
              We take reasonable measures to help protect your personal information from loss, theft, misuse,
              and unauthorized access, disclosure, alteration, and destruction.
            </p>

            <h2 className="font-display text-2xl font-bold text-dark mt-8 mb-4">5. Contact Us</h2>
            <p className="text-gray-medium leading-relaxed">
              If you have questions about this privacy policy, please contact us at hello@zytheq.com.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
