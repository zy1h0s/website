'use client'

import { motion } from 'framer-motion'
import { FileText, Globe, Target, Send, MessageSquare, BarChart3 } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { SERVICES } from '@/lib/constants'

const EASE = [0.22, 1, 0.36, 1] as const

const iconMap: Record<string, React.ElementType> = {
  FileText,
  Linkedin: Globe,
  Target,
  Send,
  MessageSquare,
  BarChart3,
}

// Bento grid layout - each card gets a unique span
const gridConfig = [
  'sm:col-span-2 lg:col-span-4',   // wide
  'sm:col-span-1 lg:col-span-2',   // normal
  'sm:col-span-1 lg:col-span-2',   // normal
  'sm:col-span-1 lg:col-span-2',   // normal
  'sm:col-span-1 lg:col-span-2',   // normal
  'sm:col-span-2 lg:col-span-4',   // wide
]

export default function Services() {
  return (
    <section className="relative py-24 sm:py-32 lg:py-40 bg-dark overflow-hidden grain">
      {/* Dot grid accent */}
      <div className="absolute top-0 left-0 w-48 h-48 dot-grid-accent opacity-[0.08] pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
        <SectionHeading
          tag="What we do"
          title="What we actually handle for you"
          subtitle="Not vague promises. These are the specific things our team does while you focus on what matters."
          light
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-4">
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon]
            const isWide = i === 0 || i === 5
            return (
              <motion.div
                key={service.title}
                className={`group relative rounded-2xl p-7 sm:p-8 transition-all duration-500 ${gridConfig[i]}
                  bg-white/[0.04] ring-1 ring-white/[0.06] hover:bg-white/[0.07] hover:ring-white/[0.10]`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.06, duration: 0.7, ease: EASE }}
              >
                <div className={`flex ${isWide ? 'flex-row items-start gap-6' : 'flex-col'}`}>
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 mb-5 group-hover:bg-accent/20 transition-colors duration-500">
                    <Icon className="w-4.5 h-4.5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold tracking-[-0.01em] mb-2">{service.title}</h3>
                    <p className="text-white/35 text-[14px] leading-[1.7] group-hover:text-white/50 transition-colors duration-500">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
