'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import DotPattern from '@/components/ui/DotPattern'

const benefits = [
  'Pre-vetted candidates with optimized, ATS-ready resumes',
  'Strong LinkedIn profiles that reflect real professionalism',
  'Interview-ready talent who have been prepped and briefed',
  'Access to a growing pipeline of motivated, diverse candidates',
  'No sourcing fees for initial introductions',
]

export default function ForRecruiters() {
  return (
    <section className="relative py-20 sm:py-28 lg:py-32 bg-gray-light overflow-hidden">
      <DotPattern variant="accent" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              For Recruiters
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-dark tracking-tight leading-tight mb-6">
              Better candidates. Less work finding them.
            </h2>
            <p className="text-lg text-gray-medium leading-relaxed mb-8">
              Zytheq candidates come prepared. Their resumes are clean, their LinkedIn
              profiles are sharp, and they have been through interview prep before they
              ever reach your desk. Partner with us for access to a pipeline of talent
              that is actually ready.
            </p>
            <Button variant="primary" size="lg" href="/contact">
              Partner with us
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl p-8 border border-gray-border shadow-sm">
              <h3 className="text-lg font-bold text-dark mb-6">What you get</h3>
              <div className="space-y-4">
                {benefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.3 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-medium text-[15px]">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
