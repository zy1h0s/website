'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { validateEmail } from '@/lib/utils'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({ name: '', email: '', type: '', message: '' })

  const validate = () => {
    const e: Record<string, string> = {}
    if (!formData.name.trim()) e.name = 'Name is required'
    if (!formData.email) e.email = 'Email is required'
    else if (!validateEmail(formData.email)) e.email = 'Please enter a valid email'
    if (!formData.type) e.type = 'Please select an option'
    if (!formData.message.trim()) e.message = 'Message is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setSubmitted(true)
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div key="success" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 rounded-2xl ring-1 ring-dark/[0.04] bg-surface">
          <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-xl font-semibold text-dark mb-2 tracking-[-0.02em]">Message sent</h3>
          <p className="text-dark/40 text-[15px]">We will get back to you within 24 hours.</p>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={handleSubmit} className="space-y-7" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Input label="Name" required placeholder="Your full name" value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} error={errors.name} />
          <Input label="Email" type="email" required placeholder="you@example.com" value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} error={errors.email} />
          <Select label="I am a..." required options={[
            { value: 'seeker', label: 'Job Seeker' }, { value: 'student', label: 'Student' },
            { value: 'recruiter', label: 'Recruiter' }, { value: 'other', label: 'Other' },
          ]} placeholder="Select an option" value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })} error={errors.type} />
          <Textarea label="Message" required placeholder="How can we help?" value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })} error={errors.message} />
          <Button type="submit" variant="dark" size="lg" fullWidth>Send Message</Button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
