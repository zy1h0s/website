'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  UserPlus, FileText, Globe, Send, BarChart3, Trophy,
  GraduationCap, Users, BookOpen, Lightbulb, Calendar,
  ClipboardList, MessageSquare, Target
} from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import DotPattern from '@/components/ui/DotPattern'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const seekerSteps = [
  {
    icon: UserPlus,
    title: 'Create your profile',
    description: 'Tell us about your career history, target roles, preferred locations, and salary expectations. Upload your current resume so we can see where you are starting from.',
  },
  {
    icon: FileText,
    title: 'We rebuild your resume',
    description: 'Our team rewrites and redesigns your resume from scratch. We optimize it for ATS systems, highlight the right achievements, and make sure it actually represents what you bring to the table.',
  },
  {
    icon: Globe,
    title: 'LinkedIn gets an overhaul',
    description: 'We rework your headline, summary, experience section, and skills. We start targeted connection campaigns and suggest content strategies that make recruiters notice you.',
  },
  {
    icon: Send,
    title: 'Applications go out',
    description: 'We apply to roles that match your profile. Not random jobs. Targeted, researched positions at companies where your skills actually fit. We also reach out directly to recruiters and hiring managers.',
  },
  {
    icon: BarChart3,
    title: 'Weekly progress reports',
    description: 'Every week you get a full report: how many applications sent, which companies, what responses came back, and what we are adjusting. You always know what is happening.',
  },
  {
    icon: Users,
    title: 'Student mentoring begins',
    description: 'You get matched with an Indian student. Sessions happen 9 to 11 PM your time, 1 to 3 hours. We provide the structure, you bring the knowledge. Share what you know about your industry.',
  },
  {
    icon: Trophy,
    title: 'Interviews and offers',
    description: 'As interviews come in, we help you prepare. Mock interviews, company research, question banks. When offers arrive, we can help with negotiation strategy too.',
  },
]

const studentSteps = [
  {
    icon: GraduationCap,
    title: 'Apply to the program',
    description: 'Fill out a quick application with your college, field of study, and what you want to learn. We review applications and accept students who show genuine interest in growing.',
  },
  {
    icon: Target,
    title: 'Get matched with a mentor',
    description: 'We pair you with a US professional whose experience aligns with your interests. If you want to learn about tech, you get someone in tech. Marketing, finance, design, same thing.',
  },
  {
    icon: Calendar,
    title: 'Sessions are scheduled',
    description: 'Sessions happen in the evenings (India time, mornings). Your mentor and you agree on a schedule that works for both. Typically 1 to 3 hours per session.',
  },
  {
    icon: BookOpen,
    title: 'Structured curriculum',
    description: 'You do not go in blind. Zytheq provides session frameworks covering real-world skills: building presentations, using workplace tools, handling assessments, professional communication.',
  },
  {
    icon: Lightbulb,
    title: 'Learn by doing',
    description: 'These are not lectures. Your mentor gives you real scenarios, walks you through how they would handle them, and has you practice. You learn the way professionals actually work.',
  },
  {
    icon: ClipboardList,
    title: 'Track your progress',
    description: 'After each session, you reflect on what you learned. Zytheq tracks your growth across skills and helps your mentor adjust the curriculum to where you need the most help.',
  },
  {
    icon: MessageSquare,
    title: 'Graduate with real skills',
    description: 'By the end of your mentorship, you have practical skills that make you stand out. Not theoretical knowledge from a textbook, but real-world capability.',
  },
]

const weeklyTimeline = [
  { day: 'Monday', task: 'Resume sent to 15 targeted roles', color: 'bg-primary' },
  { day: 'Tuesday', task: 'LinkedIn outreach to 8 recruiters', color: 'bg-primary-light' },
  { day: 'Wednesday', task: 'Follow-ups on pending applications', color: 'bg-primary' },
  { day: 'Thursday', task: 'New job matches researched and queued', color: 'bg-primary-light' },
  { day: 'Friday', task: 'Weekly progress report delivered + student session', color: 'bg-accent' },
]

export default function HowItWorksPage() {
  const [activeTrack, setActiveTrack] = useState<'seekers' | 'students'>('seekers')
  const steps = activeTrack === 'seekers' ? seekerSteps : studentSteps

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
              How Zytheq works
            </h1>
            <p className="mt-4 text-lg text-white/60 max-w-xl mx-auto">
              A clear path from sign-up to success. For both sides.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Track Toggle */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-gray-light rounded-xl p-1.5">
              <button
                onClick={() => setActiveTrack('seekers')}
                className={cn(
                  'px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer',
                  activeTrack === 'seekers'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-medium hover:text-dark'
                )}
              >
                For Job Seekers
              </button>
              <button
                onClick={() => setActiveTrack('students')}
                className={cn(
                  'px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer',
                  activeTrack === 'students'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-medium hover:text-dark'
                )}
              >
                For Students
              </button>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            {steps.map((step, i) => (
              <motion.div
                key={`${activeTrack}-${i}`}
                className="relative flex gap-6 pb-12 last:pb-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                {/* Timeline line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-[27px] top-14 w-0.5 h-[calc(100%-56px)] bg-gray-border" />
                )}

                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center relative z-10">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>

                <div className="pt-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-primary/40 uppercase tracking-wider">
                      Step {i + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-2">{step.title}</h3>
                  <p className="text-gray-medium leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Timeline */}
      <section className="py-20 sm:py-28 bg-gray-light">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="A typical week with Zytheq"
            subtitle="Here is what happens behind the scenes while you go about your life."
          />

          <div className="max-w-2xl mx-auto space-y-4">
            {weeklyTimeline.map((item, i) => (
              <motion.div
                key={item.day}
                className="flex items-center gap-4 bg-white rounded-xl p-5 border border-gray-border"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <div className={cn('w-3 h-3 rounded-full flex-shrink-0', item.color)} />
                <div className="flex-1">
                  <span className="font-bold text-dark text-sm">{item.day}</span>
                  <p className="text-gray-medium text-[15px]">{item.task}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-primary">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Ready to get started?
            </h2>
            <p className="mt-4 text-white/60 text-lg">
              Pick your path and we will take it from there.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="accent" size="lg" href="/get-started">
                I need a job
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href="/join-as-student"
                className="border-white/30 text-white hover:bg-white hover:text-primary"
              >
                I want to learn
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
