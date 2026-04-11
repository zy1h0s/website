'use client'

import { motion } from 'framer-motion'
import { Clock, Video, BookOpen } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

function ConnectionGraphic() {
  return (
    <div className="relative w-full max-w-md mx-auto" aria-hidden="true">
      <svg viewBox="0 0 400 200" className="w-full" fill="none">
        {/* US Candidate circle */}
        <circle cx="80" cy="100" r="50" fill="#154ba8" opacity="0.1" />
        <circle cx="80" cy="100" r="35" fill="#154ba8" opacity="0.15" />
        <text x="80" y="95" textAnchor="middle" fill="#154ba8" fontSize="11" fontWeight="600">
          Job
        </text>
        <text x="80" y="112" textAnchor="middle" fill="#154ba8" fontSize="11" fontWeight="600">
          Seeker
        </text>

        {/* Dotted connection line */}
        {Array.from({ length: 12 }, (_, i) => (
          <circle
            key={i}
            cx={140 + i * 10}
            cy={100}
            r={2.5}
            fill="#feb800"
            opacity={0.4 + (i / 12) * 0.6}
          />
        ))}

        {/* Zytheq center logo */}
        <circle cx="200" cy="100" r="22" fill="#154ba8" />
        <text x="200" y="105" textAnchor="middle" fill="#feb800" fontSize="16" fontWeight="700">
          Z
        </text>

        {/* Dotted connection line */}
        {Array.from({ length: 12 }, (_, i) => (
          <circle
            key={i}
            cx={230 + i * 10}
            cy={100}
            r={2.5}
            fill="#feb800"
            opacity={0.4 + (i / 12) * 0.6}
          />
        ))}

        {/* Indian Student circle */}
        <circle cx="320" cy="100" r="50" fill="#154ba8" opacity="0.1" />
        <circle cx="320" cy="100" r="35" fill="#154ba8" opacity="0.15" />
        <text x="320" y="95" textAnchor="middle" fill="#154ba8" fontSize="11" fontWeight="600">
          Student
        </text>
        <text x="320" y="112" textAnchor="middle" fill="#154ba8" fontSize="11" fontWeight="600">
          Mentee
        </text>
      </svg>
    </div>
  )
}

export default function GiveBack() {
  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="The give-back model"
          subtitle="The heart of Zytheq. And honestly, the part most people end up loving the most."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg text-gray-medium leading-relaxed mb-6">
              Most people forget what it felt like to not know anything. You probably remember
              someone who gave you a shot, answered your questions, showed you how things actually
              work. That is what you get to be for someone.
            </p>
            <p className="text-lg text-gray-medium leading-relaxed mb-8">
              This is not a burden. It is not payment. It is a few hours a week where you share
              what you have learned in your career with a student who is hungry to learn it. You
              teach them how presentations actually get built, how assessments get handled, how
              professionals think through problems. The kind of stuff no classroom teaches.
            </p>

            <div className="space-y-4">
              {[
                { icon: Clock, text: 'Sessions happen 9 to 11 PM US time, 1 to 3 hours' },
                { icon: Video, text: 'Over Zoom. From your couch. In whatever you are wearing.' },
                { icon: BookOpen, text: 'Zytheq provides session structure, curriculum framework, and platform support' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon className="w-5 h-5 text-accent-dark" />
                  </div>
                  <p className="text-dark-secondary font-medium">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <ConnectionGraphic />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
