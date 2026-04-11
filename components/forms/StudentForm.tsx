'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { validateEmail, validatePhone } from '@/lib/utils'

const gradYears = ['2025', '2026', '2027', '2028'].map((y) => ({ value: y, label: y }))

const hearAbout = [
  { value: 'social', label: 'Social Media' },
  { value: 'friend', label: 'Friend / Word of Mouth' },
  { value: 'college', label: 'College / University' },
  { value: 'other', label: 'Other' },
]

export default function StudentForm() {
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    field: '',
    gradYear: '',
    wantToLearn: '',
    heardFrom: '',
    agreement: false,
  })

  const update = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value })
    setErrors({ ...errors, [field]: '' })
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email'
    if (!formData.phone) newErrors.phone = 'Phone is required'
    else if (!validatePhone(formData.phone)) newErrors.phone = 'Please enter a valid phone number'
    if (!formData.college.trim()) newErrors.college = 'College/University is required'
    if (!formData.field.trim()) newErrors.field = 'Field of study is required'
    if (!formData.gradYear) newErrors.gradYear = 'Please select your graduation year'
    if (!formData.wantToLearn.trim()) newErrors.wantToLearn = 'Please tell us what you want to learn'
    if (!formData.agreement) newErrors.agreement = 'Please agree to the commitment'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    // TODO: POST to /api/signup/student when backend is ready
    setSubmitted(true)
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 bg-white rounded-2xl border border-gray-border"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-dark mb-3">You are in</h3>
          <p className="text-gray-medium max-w-md mx-auto">
            We will match you with a mentor and reach out with next steps.
            Check your email.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-border space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-xl font-bold text-dark">Join as a student</h3>

          <Input
            label="Full name"
            required
            placeholder="Your full name"
            value={formData.name}
            onChange={(e) => update('name', e.target.value)}
            error={errors.name}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email"
              type="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => update('email', e.target.value)}
              error={errors.email}
            />
            <Input
              label="Phone"
              type="tel"
              required
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => update('phone', e.target.value)}
              error={errors.phone}
            />
          </div>

          <Input
            label="College / University"
            required
            placeholder="e.g., Delhi University, IIT Bombay"
            value={formData.college}
            onChange={(e) => update('college', e.target.value)}
            error={errors.college}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Field of study"
              required
              placeholder="e.g., Computer Science, Business"
              value={formData.field}
              onChange={(e) => update('field', e.target.value)}
              error={errors.field}
            />
            <Select
              label="Graduation year"
              required
              options={gradYears}
              placeholder="Select year"
              value={formData.gradYear}
              onChange={(e) => update('gradYear', e.target.value)}
              error={errors.gradYear}
            />
          </div>

          <Textarea
            label="What do you most want to learn?"
            required
            placeholder="Tell us what skills, tools, or knowledge areas interest you most..."
            value={formData.wantToLearn}
            onChange={(e) => update('wantToLearn', e.target.value)}
            error={errors.wantToLearn}
          />

          <Select
            label="How did you hear about Zytheq?"
            options={hearAbout}
            placeholder="Select an option"
            value={formData.heardFrom}
            onChange={(e) => update('heardFrom', e.target.value)}
          />

          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agreement}
                onChange={(e) => update('agreement', e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-gray-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-gray-medium">
                I commit to attending scheduled sessions and making the most of this opportunity.
              </span>
            </label>
            {errors.agreement && <p className="mt-1.5 text-sm text-red-600">{errors.agreement}</p>}
          </div>

          <Button type="submit" variant="accent" size="lg" fullWidth>
            Submit Application
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
