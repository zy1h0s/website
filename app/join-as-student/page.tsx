'use client'

import { motion } from 'framer-motion'
import StudentForm from '@/components/forms/StudentForm'
import DotPattern from '@/components/ui/DotPattern'

export default function JoinAsStudentPage() {
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
              Learn from real professionals
            </h1>
            <p className="mt-4 text-lg text-white/60 max-w-xl mx-auto">
              Get matched with a US-based mentor who will teach you the skills that actually matter in the workplace.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 sm:py-24 bg-gray-light">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <StudentForm />
        </div>
      </section>
    </>
  )
}
