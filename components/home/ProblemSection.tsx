'use client'

import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'
import DotPattern from '@/components/ui/DotPattern'

const painPoints = [
  'Spent 3 hours customizing a resume for a job that auto-rejected you in 10 seconds.',
  'Applied to 200 jobs this month. Got 4 auto-replies and zero humans.',
  'Your LinkedIn has 500+ connections and none of them are helping.',
  'You rehearsed your "tell me about yourself" in the shower again. Still no interview to use it in.',
]

const reliefPoints = [
  'Your resume is already optimized and sent to 40 targeted roles this week. You are watching a movie.',
  'Recruiters are reaching out to you because your LinkedIn actually works now.',
  'You got 3 interview requests this week. You did not apply to any of them yourself.',
  'Your evenings feel meaningful because you are teaching someone real skills over Zoom.',
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' as const },
  }),
}

export default function ProblemSection() {
  return (
    <section id="problem" className="relative py-20 sm:py-28 lg:py-32 bg-gray-light overflow-hidden">
      <DotPattern />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-dark tracking-tight">
            Same person. Different reality.
          </h2>
          <div className="mt-5 flex items-center gap-1.5 justify-center">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="w-2 h-2 rounded-full bg-accent/60" />
            <span className="w-2 h-2 rounded-full bg-accent/30" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <X className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-dark">You, right now</h3>
            </motion.div>
            <div className="space-y-4">
              {painPoints.map((point, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-5 border border-red-100 shadow-sm"
                >
                  <p className="text-gray-medium leading-relaxed text-[15px]">{point}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-dark">You, with Zytheq</h3>
            </motion.div>
            <div className="space-y-4">
              {reliefPoints.map((point, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-5 border border-green-100 shadow-sm"
                >
                  <p className="text-gray-medium leading-relaxed text-[15px]">{point}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
