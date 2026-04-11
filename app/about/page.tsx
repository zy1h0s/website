'use client'

import { motion } from 'framer-motion'
import { Eye, TrendingUp, Zap, Unlock } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import DotPattern from '@/components/ui/DotPattern'
import { VALUES, TEAM_MEMBERS } from '@/lib/constants'

const iconMap: Record<string, React.ElementType> = {
  Eye,
  TrendingUp,
  Zap,
  Unlock,
}

export default function AboutPage() {
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
              About Zytheq
            </h1>
            <p className="mt-4 text-lg text-white/60 max-w-xl mx-auto">
              The platform where job seekers and students grow together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="prose prose-lg"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-dark mb-8">
              Two problems. One solution.
            </h2>
            <div className="space-y-6 text-gray-medium leading-relaxed text-lg">
              <p>
                It started with watching two things happen at the same time. On one side, talented
                professionals in the US were drowning in the job market. Spending hours every day
                on applications, customizing resumes that got auto-rejected, writing cover letters
                nobody read. Good people, stuck in a brutal loop.
              </p>
              <p>
                On the other side, students in India were finishing degrees with impressive grades
                and absolutely no idea how real companies actually work. They had never seen a
                proper business presentation, never navigated a workplace tool, never had someone
                from the industry sit down and say, "Here is how this actually works."
              </p>
              <p>
                The idea was simple. What if the people who need help finding jobs could get that
                help for free, and in return, they would spend a few hours sharing their knowledge
                with students who desperately need it? Not a transaction. Not charity. Just two
                groups of people helping each other.
              </p>
              <p>
                That is Zytheq. We built a team that handles the entire job search, from resume
                optimization to recruiter outreach, for US candidates. And in exchange, those
                candidates give back by mentoring Indian students in real-world skills. No fees.
                No hidden costs. A value exchange that makes both sides better.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-28 bg-gray-light">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What we stand for"
            subtitle="Not corporate values on a wall. These are the principles we make decisions by."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map((value, i) => {
              const Icon = iconMap[value.icon]
              return (
                <motion.div
                  key={value.title}
                  className="bg-white rounded-2xl p-7 border border-gray-border"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-dark mb-2">{value.title}</h3>
                  <p className="text-gray-medium leading-relaxed text-[15px]">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="The team"
            subtitle="Real people doing the work behind the scenes."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member, i) => (
              <motion.div
                key={member.name}
                className="bg-gray-light rounded-2xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">{member.initials}</span>
                </div>
                <h3 className="font-bold text-dark">{member.name}</h3>
                <p className="text-gray-medium text-sm mt-1">{member.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
