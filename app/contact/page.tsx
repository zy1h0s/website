'use client'

import { motion } from 'framer-motion'
import { Mail, Clock, MapPin } from 'lucide-react'
import ContactForm from '@/components/forms/ContactForm'
import DotPattern from '@/components/ui/DotPattern'
import Accordion from '@/components/ui/Accordion'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@zytheq.com' },
  { icon: Clock, label: 'Response time', value: 'We typically respond within 24 hours' },
  { icon: MapPin, label: 'Location', value: 'United States & India' },
]

const contactFaq = [
  {
    question: 'Can I schedule a call?',
    answer: 'Yes. Send us a message through the form or email us directly, and we will set up a time that works for you. We do free consultation calls for anyone who wants to learn more before committing.',
  },
  {
    question: 'Where are you based?',
    answer: 'Our team operates across the United States and India. We work remotely, which means we can support candidates and students in any time zone.',
  },
  {
    question: 'I am a recruiter. How do I partner with you?',
    answer: 'We would love to hear from you. Select "Recruiter" in the form and tell us about your hiring needs. We will follow up with details on how our candidate pipeline works.',
  },
]

export default function ContactPage() {
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
              Get in touch
            </h1>
            <p className="mt-4 text-lg text-white/60 max-w-xl mx-auto">
              Questions, partnerships, or just curious. We are here.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            <div className="lg:col-span-2">
              <div className="space-y-6">
                {contactInfo.map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-dark text-sm">{item.label}</p>
                      <p className="text-gray-medium">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 pt-10 border-t border-gray-border">
                <h3 className="font-bold text-dark mb-4">Common questions</h3>
                <Accordion items={contactFaq} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
