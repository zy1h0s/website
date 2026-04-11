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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    message: '',
  })

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email'
    if (!formData.type) newErrors.type = 'Please select an option'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    // TODO: POST to /api/contact when backend is ready
    setSubmitted(true)
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12 bg-white rounded-2xl border border-gray-border"
        >
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-dark mb-2">Message sent</h3>
          <p className="text-gray-medium">We will get back to you within 24 hours.</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-border space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Input
            label="Name"
            required
            placeholder="Your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
          />

          <Input
            label="Email"
            type="email"
            required
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
          />

          <Select
            label="I am a..."
            required
            options={[
              { value: 'seeker', label: 'Job Seeker' },
              { value: 'student', label: 'Student' },
              { value: 'recruiter', label: 'Recruiter' },
              { value: 'other', label: 'Other' },
            ]}
            placeholder="Select an option"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            error={errors.type}
          />

          <Textarea
            label="Message"
            required
            placeholder="How can we help?"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            error={errors.message}
          />

          <Button type="submit" variant="primary" size="lg" fullWidth>
            Send Message
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
