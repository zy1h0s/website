'use client'

import { motion } from 'framer-motion'
import { UserPlus, Rocket, Users, Trophy } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Sign up and share your goals',
    description: 'Tell us about your career, your target roles, and what you are looking for. Upload your resume and we take it from there.',
  },
  {
    number: '02',
    icon: Rocket,
    title: 'We take over your job search',
    description: 'Our team optimizes your resume, builds your LinkedIn presence, and starts applying on your behalf. You get weekly updates on everything.',
  },
  {
    number: '03',
    icon: Users,
    title: 'You give back to a student',
    description: 'Spend 1 to 3 hours in the evening (9 to 11 PM your time) training an Indian student over Zoom. Teach them what you know. We provide the structure.',
  },
  {
    number: '04',
    icon: Trophy,
    title: 'You land offers. They grow.',
    description: 'You get interviews, offers, and a new role. Your student gains real-world skills and confidence. The cycle continues for the next person.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="How it works"
          subtitle="Four steps. No complexity. No fine print."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px border-t-2 border-dashed border-primary/15 z-0" />
              )}

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-4xl font-bold text-primary/10 font-display">{step.number}</span>
                </div>
                <h3 className="text-lg font-bold text-dark mb-3">{step.title}</h3>
                <p className="text-gray-medium leading-relaxed text-[15px]">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
