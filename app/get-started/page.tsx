'use client'

import { motion } from 'framer-motion'
import JobSeekerForm from '@/components/forms/JobSeekerForm'
import DotPattern from '@/components/ui/DotPattern'

export default function GetStartedPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-primary overflow-hidden">
        <DotPattern className="opacity-[0.03]" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Let us handle your job search
            </h1>
            <p className="mt-4 text-lg text-white/60 max-w-xl mx-auto">
              Fill out this form and our team will take it from here. Takes about 3 minutes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 sm:py-24 bg-gray-light">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <JobSeekerForm />
        </div>
      </section>
    </>
  )
}
