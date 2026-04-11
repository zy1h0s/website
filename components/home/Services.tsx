'use client'

import { motion } from 'framer-motion'
import { FileText, Globe, Target, Send, MessageSquare, BarChart3 } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { SERVICES } from '@/lib/constants'

const iconMap: Record<string, React.ElementType> = {
  FileText,
  Linkedin: Globe,
  Target,
  Send,
  MessageSquare,
  BarChart3,
}

export default function Services() {
  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-gray-light">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What we actually do for you"
          subtitle="Not vague promises. These are the specific things our team handles while you focus on what matters."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon]
            return (
              <motion.div
                key={service.title}
                className="bg-white rounded-2xl p-7 border border-gray-border transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: 'easeOut' }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-dark mb-2">{service.title}</h3>
                <p className="text-gray-medium leading-relaxed text-[15px]">{service.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
