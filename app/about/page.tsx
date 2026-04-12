'use client'

import { motion } from 'framer-motion'
import { Eye, TrendingUp, Zap, Unlock } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import DotPattern from '@/components/ui/DotPattern'
import { VALUES, TEAM_MEMBERS } from '@/lib/constants'

const EASE = [0.22, 1, 0.36, 1] as const

const iconMap: Record<string, React.ElementType> = { Eye, TrendingUp, Zap, Unlock }

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 bg-primary-deeper overflow-hidden grain">
        <DotPattern className="opacity-[0.025]" />
        <div className="absolute top-0 bottom-0 left-[8%] w-px bg-white/[0.04]" />
        <div className="absolute top-0 bottom-0 right-[8%] w-px bg-white/[0.04]" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-white/30 mb-5">
              <span className="w-6 h-px bg-accent/50" />
              About
            </span>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-semibold text-white tracking-[-0.04em] leading-[1.05]">
              Two problems.<br />One solution.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 sm:py-32 lg:py-40 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <div className="space-y-7 text-dark/55 text-[17px] leading-[1.75] tracking-[-0.01em]">
                <p className="text-dark/80 text-[1.3rem] sm:text-[1.5rem] leading-[1.55] font-display tracking-[-0.02em]">
                  It started with watching two things happen at the same time.
                </p>
                <p>
                  On one side, talented professionals in the US were drowning in the job market.
                  Spending hours every day on applications, customizing resumes that got auto-rejected,
                  writing cover letters nobody read. Good people, stuck in a brutal loop.
                </p>
                <p>
                  On the other side, students in India were finishing degrees with impressive grades
                  and absolutely no idea how real companies actually work. They had never seen a
                  proper business presentation, never navigated a workplace tool, never had someone
                  from the industry sit down and say, &ldquo;Here is how this actually works.&rdquo;
                </p>
                <p>
                  The idea was simple. What if the people who need help finding jobs could get that
                  help for free, and in return, they would spend a few hours sharing their knowledge
                  with students who desperately need it? Not a transaction. Not charity. Just two
                  groups of people helping each other.
                </p>
                <p>
                  That is Zytheq. We built a team that handles the entire job search for US candidates.
                  And in exchange, those candidates give back by mentoring Indian students in real-world
                  skills. No fees. No hidden costs. A value exchange that makes both sides better.
                </p>
              </div>
            </motion.div>

            {/* Right side - pull quote */}
            <motion.div
              className="lg:col-span-4 lg:col-start-9"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
            >
              <div className="lg:sticky lg:top-28">
                <div className="border-l-2 border-accent pl-6 py-2">
                  <p className="font-display text-[1.5rem] text-dark/70 leading-[1.4] tracking-[-0.02em] italic">
                    &ldquo;Not a transaction. Not charity. Just two groups of people helping each other.&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 sm:py-32 lg:py-40 bg-surface">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <SectionHeading tag="Our values" title="What we stand for" align="left" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-dark/[0.05] rounded-2xl overflow-hidden">
            {VALUES.map((value, i) => {
              const Icon = iconMap[value.icon]
              return (
                <motion.div
                  key={value.title}
                  className="bg-white p-8 sm:p-10 group"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.7, ease: EASE }}
                >
                  <Icon className="w-5 h-5 text-primary/40 mb-5 group-hover:text-primary transition-colors duration-500" />
                  <h3 className="text-lg font-semibold text-dark tracking-[-0.02em] mb-3">{value.title}</h3>
                  <p className="text-dark/40 text-[15px] leading-[1.7]">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 sm:py-32 lg:py-40 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <SectionHeading tag="The team" title="Real people behind the scenes" align="left" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {TEAM_MEMBERS.map((member, i) => (
              <motion.div
                key={member.name}
                className="group"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.6, ease: EASE }}
              >
                <div className="aspect-square rounded-2xl bg-surface flex items-center justify-center mb-4 ring-1 ring-dark/[0.04] group-hover:ring-primary/10 transition-all duration-500">
                  <span className="text-2xl font-display font-semibold text-dark/15 group-hover:text-primary/30 transition-colors duration-500">
                    {member.initials}
                  </span>
                </div>
                <h3 className="font-medium text-dark text-[14px] tracking-[-0.01em]">{member.name}</h3>
                <p className="text-dark/35 text-[13px] mt-0.5 leading-snug">{member.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
