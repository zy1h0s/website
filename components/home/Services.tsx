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

const gridConfig = [
  'sm:col-span-2 lg:col-span-4',
  'sm:col-span-1 lg:col-span-2',
  'sm:col-span-1 lg:col-span-2',
  'sm:col-span-1 lg:col-span-2',
  'sm:col-span-1 lg:col-span-2',
  'sm:col-span-2 lg:col-span-4',
]

export default function Services() {
  return (
    <section className="relative py-24 sm:py-32 lg:py-40 bg-dark overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="orb orb-primary w-[400px] h-[400px] top-[-5%] left-[-5%] opacity-40" />
        <div className="orb orb-accent w-[300px] h-[300px] bottom-[10%] right-[-5%] opacity-30" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
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
                className={`group relative rounded-2xl p-7 sm:p-8 card-hover gradient-border ${gridConfig[i]}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.06, duration: 0.7, ease: EASE }}
              >
                <div className={`flex ${isWide ? 'flex-row items-start gap-6' : 'flex-col'}`}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center flex-shrink-0 mb-5 group-hover:from-accent/30 group-hover:to-accent/10 transition-all duration-500 ring-1 ring-accent/10">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold tracking-[-0.01em] mb-2 text-[16px]">{service.title}</h3>
                    <p className="text-white/30 text-[14px] leading-[1.7] group-hover:text-white/50 transition-colors duration-500">
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
