'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  UserPlus, FileText, Globe, Send, BarChart3, Trophy,
  GraduationCap, Users, BookOpen, Lightbulb, Calendar,
  ClipboardList, MessageSquare, Target, ArrowRight
} from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import DotPattern from '@/components/ui/DotPattern'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

const seekerSteps = [
  { icon: UserPlus, title: 'Create your profile', description: 'Tell us about your career history, target roles, preferred locations, and salary expectations. Upload your current resume so we can see where you are starting from.' },
  { icon: FileText, title: 'We rebuild your resume', description: 'Our team rewrites and redesigns your resume from scratch. We optimize it for ATS systems, highlight the right achievements, and make sure it represents what you bring.' },
  { icon: Globe, title: 'LinkedIn gets an overhaul', description: 'We rework your headline, summary, experience, and skills. We start targeted connection campaigns and suggest content strategies that make recruiters notice you.' },
  { icon: Send, title: 'Applications go out', description: 'We apply to roles that match your profile. Not random jobs. Targeted, researched positions at companies where your skills actually fit.' },
  { icon: BarChart3, title: 'Weekly progress reports', description: 'Every week you get a full report: how many applications, which companies, responses, and what we are adjusting. You always know what is happening.' },
  { icon: Users, title: 'Student mentoring begins', description: 'You get matched with an Indian student. Sessions happen 9 to 11 PM your time, 1 to 3 hours. We provide the structure, you bring the knowledge.' },
  { icon: Trophy, title: 'Interviews and offers', description: 'As interviews come in, we help you prepare. Mock interviews, company research, question banks. When offers arrive, we help with negotiation.' },
]

const studentSteps = [
  { icon: GraduationCap, title: 'Apply to the program', description: 'Fill out a quick application with your college, field of study, and what you want to learn. We accept students who show genuine interest in growing.' },
  { icon: Target, title: 'Get matched with a mentor', description: 'We pair you with a US professional whose experience aligns with your interests. Tech gets tech. Marketing gets marketing.' },
  { icon: Calendar, title: 'Sessions are scheduled', description: 'Sessions happen in the evenings (India time). Your mentor and you agree on a schedule that works for both.' },
  { icon: BookOpen, title: 'Structured curriculum', description: 'Zytheq provides session frameworks covering real-world skills: presentations, workplace tools, assessments, professional communication.' },
  { icon: Lightbulb, title: 'Learn by doing', description: 'These are not lectures. Your mentor gives you real scenarios, walks you through them, and has you practice. You learn the way professionals work.' },
  { icon: ClipboardList, title: 'Track your progress', description: 'After each session, you reflect on what you learned. Zytheq tracks your growth and helps your mentor adjust the curriculum.' },
  { icon: MessageSquare, title: 'Graduate with real skills', description: 'By the end, you have practical skills that make you stand out. Real-world capability, not textbook theory.' },
]

const weeklyTimeline = [
  { day: 'Mon', task: 'Resume sent to 15 targeted roles', accent: false },
  { day: 'Tue', task: 'LinkedIn outreach to 8 recruiters', accent: false },
  { day: 'Wed', task: 'Follow-ups on pending applications', accent: false },
  { day: 'Thu', task: 'New job matches researched and queued', accent: false },
  { day: 'Fri', task: 'Weekly progress report + student session', accent: true },
]

export default function HowItWorksPage() {
  const [activeTrack, setActiveTrack] = useState<'seekers' | 'students'>('seekers')
  const steps = activeTrack === 'seekers' ? seekerSteps : studentSteps

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 bg-primary-deeper overflow-hidden grain">
        <DotPattern className="opacity-[0.025]" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-white/30 mb-5">
              <span className="w-6 h-px bg-accent/50" />
              How it works
            </span>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-semibold text-white tracking-[-0.04em] leading-[1.05]">
              A clear path from<br />sign-up to success.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Track Toggle + Steps */}
      <section className="py-24 sm:py-32 lg:py-40 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          {/* Toggle */}
          <div className="flex mb-16 sm:mb-20">
            <div className="inline-flex ring-1 ring-dark/[0.06] rounded-full p-1">
              {(['seekers', 'students'] as const).map((track) => (
                <button
                  key={track}
                  onClick={() => setActiveTrack(track)}
                  className={cn(
                    'px-6 py-2.5 rounded-full text-[14px] font-medium transition-all duration-300 cursor-pointer',
                    activeTrack === track
                      ? 'bg-dark text-white'
                      : 'text-dark/40 hover:text-dark'
                  )}
                >
                  {track === 'seekers' ? 'For Job Seekers' : 'For Students'}
                </button>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="max-w-3xl">
            {steps.map((step, i) => (
              <motion.div
                key={`${activeTrack}-${i}`}
                className="relative flex gap-6 sm:gap-8"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.6, ease: EASE }}
              >
                {/* Left: icon + line */}
                <div className="flex flex-col items-center">
                  <div className="w-11 h-11 rounded-xl bg-surface ring-1 ring-dark/[0.05] flex items-center justify-center flex-shrink-0 relative z-10">
                    <step.icon className="w-4.5 h-4.5 text-primary/60" />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-dark/[0.05] my-2" />
                  )}
                </div>

                {/* Right: content */}
                <div className="pb-12 sm:pb-14">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-dark/20 mb-1.5">
                    Step {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="text-lg sm:text-xl font-semibold text-dark tracking-[-0.02em] mb-2">{step.title}</h3>
                  <p className="text-dark/45 text-[15px] leading-[1.7] max-w-lg">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Timeline */}
      <section className="py-24 sm:py-32 bg-surface">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <SectionHeading tag="A typical week" title="What happens behind the scenes" align="left" />

          <div className="max-w-2xl space-y-0">
            {weeklyTimeline.map((item, i) => (
              <motion.div
                key={item.day}
                className={`flex items-center gap-5 py-5 border-t ${item.accent ? 'border-accent/20' : 'border-dark/[0.05]'}`}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: EASE }}
              >
                <span className={`text-[13px] font-semibold uppercase tracking-[0.05em] w-10 flex-shrink-0 ${item.accent ? 'text-accent' : 'text-dark/25'}`}>
                  {item.day}
                </span>
                <p className="text-dark/55 text-[15px]">{item.task}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32 bg-primary-deeper grain">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <h2 className="font-display text-[2rem] sm:text-[2.75rem] font-semibold text-white tracking-[-0.035em] leading-[1.08]">
              Ready to get started?
            </h2>
            <p className="mt-4 text-white/35 text-[17px]">Pick your path. We handle the rest.</p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button variant="accent" size="lg" href="/get-started" icon={<ArrowRight className="w-4 h-4" />}>
                I need a job
              </Button>
              <Button variant="ghost" size="lg" href="/join-as-student" className="text-white/40 hover:text-white hover:bg-white/[0.06]">
                I want to learn
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
