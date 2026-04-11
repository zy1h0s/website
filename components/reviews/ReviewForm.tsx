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
    userType: '',
    email: '',
    month: '',
    year: '',
    experience: '',
    city: '',
    role: '',
    confirmed: false,
  })

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.userType) newErrors.userType = 'Please select your role'
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email'
    if (!formData.month || !formData.year) newErrors.date = 'Please select when you used Zytheq'
    if (rating === 0) newErrors.rating = 'Please select a rating'
    if (!formData.experience) newErrors.experience = 'Please share your experience'
    else if (formData.experience.length < 50) newErrors.experience = `Minimum 50 characters (${formData.experience.length}/50)`
    if (!formData.confirmed) newErrors.confirmed = 'Please confirm you have used Zytheq'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    // TODO: POST to /api/review when backend is integrated
    setSubmitted(true)
  }

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-border">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-dark mb-2">Thank you</h3>
            <p className="text-gray-medium">
              Your review will be verified and published within 48 hours.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div>
              <h3 className="text-xl font-bold text-dark mb-1">Share your experience</h3>
              <p className="text-sm text-gray-medium">
                Only verified Zytheq users can submit reviews. Your email will be used for verification only.
              </p>
            </div>

            <Select
              label="I was a..."
              required
              options={[
                { value: 'seeker', label: 'Job Seeker' },
                { value: 'student', label: 'Student' },
                { value: 'recruiter', label: 'Recruiter' },
              ]}
              placeholder="Select your role"
              value={formData.userType}
              onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
              error={errors.userType}
            />

            <Input
              label="Your registered email with Zytheq"
              type="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
            />

            <div>
              <label className="block text-sm font-medium text-dark-secondary mb-1.5">
                When did you use Zytheq? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <Select
                  label=""
                  options={months}
                  placeholder="Month"
                  value={formData.month}
                  onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                />
                <Select
                  label=""
                  options={years}
                  placeholder="Year"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                />
              </div>
              {errors.date && <p className="mt-1.5 text-sm text-red-600">{errors.date}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-secondary mb-1.5">
                Your rating <span className="text-red-500">*</span>
              </label>
              <StarRating rating={rating} onChange={setRating} interactive size="lg" />
              {errors.rating && <p className="mt-1.5 text-sm text-red-600">{errors.rating}</p>}
            </div>

            <Textarea
              label="Your experience"
              required
              placeholder="Tell us about your experience with Zytheq (minimum 50 characters)..."
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              error={errors.experience}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="City (optional)"
                placeholder="e.g., Chicago"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
              <Input
                label="Your role/field (optional)"
                placeholder="e.g., Software Engineer"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </div>

            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.confirmed}
                  onChange={(e) => setFormData({ ...formData, confirmed: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded border-gray-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-medium">
                  I confirm I have used Zytheq&apos;s services and this review is based on my genuine experience.
                </span>
              </label>
              {errors.confirmed && <p className="mt-1.5 text-sm text-red-600">{errors.confirmed}</p>}
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth>
              Submit Review
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
