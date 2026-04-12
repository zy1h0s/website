'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import StarRating from '@/components/ui/StarRating'
import Button from '@/components/ui/Button'
import { validateEmail } from '@/lib/utils'

const months = Array.from({ length: 12 }, (_, i) => {
  const d = new Date(2025, i)
  return { value: `${i + 1}`, label: d.toLocaleString('default', { month: 'long' }) }
})
const years = ['2025', '2026'].map((y) => ({ value: y, label: y }))

export default function ReviewForm() {
  const [submitted, setSubmitted] = useState(false)
  const [rating, setRating] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    userType: '', email: '', month: '', year: '', experience: '', city: '', role: '', confirmed: false,
  })

  const validate = () => {
    const e: Record<string, string> = {}
    if (!formData.userType) e.userType = 'Please select your role'
    if (!formData.email) e.email = 'Email is required'
    else if (!validateEmail(formData.email)) e.email = 'Please enter a valid email'
    if (!formData.month || !formData.year) e.date = 'Please select when you used Zytheq'
    if (rating === 0) e.rating = 'Please select a rating'
    if (!formData.experience) e.experience = 'Please share your experience'
    else if (formData.experience.length < 50) e.experience = `Minimum 50 characters (${formData.experience.length}/50)`
    if (!formData.confirmed) e.confirmed = 'Please confirm you have used Zytheq'
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
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 rounded-2xl ring-1 ring-dark/[0.04] bg-surface"
        >
          <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-xl font-semibold text-dark mb-2 tracking-[-0.02em]">Thank you</h3>
          <p className="text-dark/40 text-[15px]">Your review will be verified and published within 48 hours.</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          className="space-y-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Select label="I was a..." required options={[
            { value: 'seeker', label: 'Job Seeker' },
            { value: 'student', label: 'Student' },
            { value: 'recruiter', label: 'Recruiter' },
          ]} placeholder="Select your role" value={formData.userType}
            onChange={(e) => setFormData({ ...formData, userType: e.target.value })} error={errors.userType} />

          <Input label="Your registered email with Zytheq" type="email" required placeholder="you@example.com"
            value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} error={errors.email} />

          <div>
            <label className="block text-[13px] font-medium mb-2 tracking-[-0.01em] uppercase text-dark/50">
              When did you use Zytheq? <span className="text-accent">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <Select label="" options={months} placeholder="Month"
                value={formData.month} onChange={(e) => setFormData({ ...formData, month: e.target.value })} />
              <Select label="" options={years} placeholder="Year"
                value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} />
            </div>
            {errors.date && <p className="mt-2 text-[13px] text-red-500 font-medium">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-[13px] font-medium mb-3 tracking-[-0.01em] uppercase text-dark/50">
              Your rating <span className="text-accent">*</span>
            </label>
            <StarRating rating={rating} onChange={setRating} interactive size="lg" />
            {errors.rating && <p className="mt-2 text-[13px] text-red-500 font-medium">{errors.rating}</p>}
          </div>

          <Textarea label="Your experience" required placeholder="Tell us about your experience with Zytheq (minimum 50 characters)..."
            value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} error={errors.experience} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input label="City (optional)" placeholder="e.g., Chicago"
              value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
            <Input label="Your role/field (optional)" placeholder="e.g., Software Engineer"
              value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
          </div>

          <div>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input type="checkbox" checked={formData.confirmed}
                onChange={(e) => setFormData({ ...formData, confirmed: e.target.checked })}
                className="mt-0.5 w-4 h-4 rounded border-dark/15 text-primary focus:ring-primary/30 cursor-pointer" />
              <span className="text-[14px] text-dark/40 group-hover:text-dark/55 transition-colors">
                I confirm I have used Zytheq&apos;s services and this review is based on my genuine experience.
              </span>
            </label>
            {errors.confirmed && <p className="mt-2 text-[13px] text-red-500 font-medium">{errors.confirmed}</p>}
          </div>

          <Button type="submit" variant="dark" size="lg" fullWidth>Submit Review</Button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
