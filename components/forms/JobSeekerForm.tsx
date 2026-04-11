'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { validateEmail, validatePhone, validateUrl } from '@/lib/utils'
import { cn } from '@/lib/utils'

const salaryRanges = [
  { value: '40-60', label: '$40,000 - $60,000' },
  { value: '60-80', label: '$60,000 - $80,000' },
  { value: '80-100', label: '$80,000 - $100,000' },
  { value: '100-130', label: '$100,000 - $130,000' },
  { value: '130-160', label: '$130,000 - $160,000' },
  { value: '160-200', label: '$160,000 - $200,000' },
  { value: '200+', label: '$200,000+' },
  { value: 'flexible', label: 'Flexible / Open to discuss' },
]

const experienceLevels = [
  { value: '0-1', label: '0-1 years' },
  { value: '1-3', label: '1-3 years' },
  { value: '3-5', label: '3-5 years' },
  { value: '5-10', label: '5-10 years' },
  { value: '10+', label: '10+ years' },
]

export default function JobSeekerForm() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    currentRole: '',
    experience: '',
    targetRoles: '',
    locations: '',
    salary: '',
    notes: '',
    agreement: false,
  })

  const update = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value })
    setErrors({ ...errors, [field]: '' })
  }

  const validateStep = (s: number) => {
    const newErrors: Record<string, string> = {}

    if (s === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required'
      if (!formData.email) newErrors.email = 'Email is required'
      else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email'
      if (!formData.phone) newErrors.phone = 'Phone is required'
      else if (!validatePhone(formData.phone)) newErrors.phone = 'Please enter a valid phone number'
      if (formData.linkedin && !validateUrl(formData.linkedin)) newErrors.linkedin = 'Please enter a valid URL'
    }

    if (s === 2) {
      if (!formData.currentRole.trim()) newErrors.currentRole = 'Current role is required'
      if (!formData.experience) newErrors.experience = 'Please select your experience level'
      if (!formData.targetRoles.trim()) newErrors.targetRoles = 'Please enter at least one target role'
    }

    if (s === 3) {
      if (!formData.agreement) newErrors.agreement = 'Please agree to the terms'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(step)) setStep(step + 1)
  }

  const prevStep = () => setStep(step - 1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(3)) return
    // TODO: POST to /api/signup/job-seeker when backend is ready
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 bg-white rounded-2xl border border-gray-border"
      >
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-dark mb-3">Welcome to Zytheq</h3>
        <p className="text-gray-medium max-w-md mx-auto">
          Our team will review your profile and reach out within 48 hours.
          Keep an eye on your email.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-border">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors',
                s <= step ? 'bg-primary text-white' : 'bg-gray-light text-gray-medium'
              )}>
                {s}
              </div>
              <span className="hidden sm:inline text-sm font-medium text-gray-medium">
                {s === 1 ? 'Basics' : s === 2 ? 'Career' : 'Final'}
              </span>
            </div>
          ))}
        </div>
        <div className="h-1.5 bg-gray-light rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <h3 className="text-xl font-bold text-dark">Your information</h3>
              <Input
                label="Full name"
                required
                placeholder="John Smith"
                value={formData.name}
                onChange={(e) => update('name', e.target.value)}
                error={errors.name}
              />
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
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => update('phone', e.target.value)}
                error={errors.phone}
              />
              <Input
                label="LinkedIn URL"
                type="url"
                placeholder="https://linkedin.com/in/yourprofile"
                value={formData.linkedin}
                onChange={(e) => update('linkedin', e.target.value)}
                error={errors.linkedin}
                helperText="Optional, but helps us get started faster"
              />

              <div className="flex justify-end pt-2">
                <Button type="button" onClick={nextStep} variant="primary">
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <h3 className="text-xl font-bold text-dark">Career details</h3>
              <Input
                label="Current role/field"
                required
                placeholder="e.g., Software Engineer, Marketing Manager"
                value={formData.currentRole}
                onChange={(e) => update('currentRole', e.target.value)}
                error={errors.currentRole}
              />
              <Select
                label="Years of experience"
                required
                options={experienceLevels}
                placeholder="Select range"
                value={formData.experience}
                onChange={(e) => update('experience', e.target.value)}
                error={errors.experience}
              />
              <Input
                label="Target roles"
                required
                placeholder="e.g., Product Manager, Senior Developer, Data Analyst"
                value={formData.targetRoles}
                onChange={(e) => update('targetRoles', e.target.value)}
                error={errors.targetRoles}
                helperText="Separate multiple roles with commas"
              />
              <Input
                label="Preferred locations"
                placeholder="e.g., Remote, NYC, San Francisco, Austin"
                value={formData.locations}
                onChange={(e) => update('locations', e.target.value)}
              />
              <Select
                label="Salary range"
                options={salaryRanges}
                placeholder="Select range"
                value={formData.salary}
                onChange={(e) => update('salary', e.target.value)}
              />

              <div className="flex justify-between pt-2">
                <Button type="button" onClick={prevStep} variant="ghost">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button type="button" onClick={nextStep} variant="primary">
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <h3 className="text-xl font-bold text-dark">Almost there</h3>

              <div>
                <label className="block text-sm font-medium text-dark-secondary mb-1.5">
                  Upload your resume
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="w-full text-sm text-gray-medium file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary-dark file:cursor-pointer file:transition-colors"
                />
                <p className="mt-1.5 text-sm text-gray-medium">PDF or Word document, max 5MB</p>
              </div>

              <Textarea
                label="Anything else we should know?"
                placeholder="Tell us about your situation, preferences, or anything that would help us serve you better..."
                value={formData.notes}
                onChange={(e) => update('notes', e.target.value)}
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
                    I understand the Zytheq model and am willing to participate in student training sessions as part of the value exchange.
                  </span>
                </label>
                {errors.agreement && <p className="mt-1.5 text-sm text-red-600">{errors.agreement}</p>}
              </div>

              <div className="flex justify-between pt-2">
                <Button type="button" onClick={prevStep} variant="ghost">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button type="submit" variant="accent" size="lg">
                  Submit Application
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  )
}
