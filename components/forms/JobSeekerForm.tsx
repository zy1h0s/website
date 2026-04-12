'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { validateEmail, validatePhone, validateUrl, cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

const salaryRanges = [
  { value: '40-60', label: '$40,000 - $60,000' }, { value: '60-80', label: '$60,000 - $80,000' },
  { value: '80-100', label: '$80,000 - $100,000' }, { value: '100-130', label: '$100,000 - $130,000' },
  { value: '130-160', label: '$130,000 - $160,000' }, { value: '160-200', label: '$160,000 - $200,000' },
  { value: '200+', label: '$200,000+' }, { value: 'flexible', label: 'Flexible / Open to discuss' },
]

const experienceLevels = [
  { value: '0-1', label: '0-1 years' }, { value: '1-3', label: '1-3 years' },
  { value: '3-5', label: '3-5 years' }, { value: '5-10', label: '5-10 years' }, { value: '10+', label: '10+ years' },
]

export default function JobSeekerForm() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', linkedin: '', currentRole: '', experience: '',
    targetRoles: '', locations: '', salary: '', notes: '', agreement: false,
  })

  const update = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value })
    setErrors({ ...errors, [field]: '' })
  }

  const validateStep = (s: number) => {
    const e: Record<string, string> = {}
    if (s === 1) {
      if (!formData.name.trim()) e.name = 'Name is required'
      if (!formData.email) e.email = 'Email is required'
      else if (!validateEmail(formData.email)) e.email = 'Please enter a valid email'
      if (!formData.phone) e.phone = 'Phone is required'
      else if (!validatePhone(formData.phone)) e.phone = 'Please enter a valid phone number'
      if (formData.linkedin && !validateUrl(formData.linkedin)) e.linkedin = 'Please enter a valid URL'
    }
    if (s === 2) {
      if (!formData.currentRole.trim()) e.currentRole = 'Current role is required'
      if (!formData.experience) e.experience = 'Please select your experience level'
      if (!formData.targetRoles.trim()) e.targetRoles = 'Please enter at least one target role'
    }
    if (s === 3) { if (!formData.agreement) e.agreement = 'Please agree to the terms' }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const nextStep = () => { if (validateStep(step)) setStep(step + 1) }
  const prevStep = () => setStep(step - 1)

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validateStep(3)) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20 rounded-2xl ring-1 ring-dark/[0.04] bg-surface">
        <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-6 h-6 text-emerald-600" />
        </div>
        <h3 className="text-xl font-semibold text-dark mb-2 tracking-[-0.02em]">Welcome to Zytheq</h3>
        <p className="text-dark/40 text-[15px] max-w-sm mx-auto">Our team will review your profile and reach out within 48 hours.</p>
      </motion.div>
    )
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold transition-all duration-500',
                s <= step ? 'bg-dark text-white' : 'ring-1 ring-dark/10 text-dark/25'
              )}>{s}</div>
              {s < 3 && <div className={cn('w-8 sm:w-12 h-px transition-colors duration-500', s < step ? 'bg-dark' : 'bg-dark/10')} />}
            </div>
          ))}
          <span className="ml-3 text-[13px] text-dark/30 font-medium">
            {step === 1 ? 'Basics' : step === 2 ? 'Career' : 'Final'}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4, ease: EASE }} className="space-y-7">
              <Input label="Full name" required placeholder="John Smith" value={formData.name}
                onChange={(e) => update('name', e.target.value)} error={errors.name} />
              <Input label="Email" type="email" required placeholder="you@example.com" value={formData.email}
                onChange={(e) => update('email', e.target.value)} error={errors.email} />
              <Input label="Phone" type="tel" required placeholder="+1 (555) 123-4567" value={formData.phone}
                onChange={(e) => update('phone', e.target.value)} error={errors.phone} />
              <Input label="LinkedIn URL" type="url" placeholder="https://linkedin.com/in/yourprofile" value={formData.linkedin}
                onChange={(e) => update('linkedin', e.target.value)} error={errors.linkedin} helperText="Optional, but helps us start faster" />
              <div className="flex justify-end pt-4">
                <Button type="button" onClick={nextStep} variant="dark" icon={<ArrowRight className="w-3.5 h-3.5" />}>Next</Button>
              </div>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4, ease: EASE }} className="space-y-7">
              <Input label="Current role/field" required placeholder="e.g., Software Engineer" value={formData.currentRole}
                onChange={(e) => update('currentRole', e.target.value)} error={errors.currentRole} />
              <Select label="Years of experience" required options={experienceLevels} placeholder="Select range" value={formData.experience}
                onChange={(e) => update('experience', e.target.value)} error={errors.experience} />
              <Input label="Target roles" required placeholder="e.g., Product Manager, Senior Developer" value={formData.targetRoles}
                onChange={(e) => update('targetRoles', e.target.value)} error={errors.targetRoles} helperText="Separate multiple roles with commas" />
              <Input label="Preferred locations" placeholder="e.g., Remote, NYC, Austin" value={formData.locations}
                onChange={(e) => update('locations', e.target.value)} />
              <Select label="Salary range" options={salaryRanges} placeholder="Select range" value={formData.salary}
                onChange={(e) => update('salary', e.target.value)} />
              <div className="flex justify-between pt-4">
                <Button type="button" onClick={prevStep} variant="ghost" icon={<ArrowLeft className="w-3.5 h-3.5" />} iconPosition="left">Back</Button>
                <Button type="button" onClick={nextStep} variant="dark" icon={<ArrowRight className="w-3.5 h-3.5" />}>Next</Button>
              </div>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4, ease: EASE }} className="space-y-7">
              <div>
                <label className="block text-[13px] font-medium mb-2 tracking-[-0.01em] uppercase text-dark/50">Upload your resume</label>
                <input type="file" accept=".pdf,.doc,.docx" className="w-full text-sm text-dark/40" />
                <p className="mt-2 text-[13px] text-dark/30">PDF or Word document, max 5MB</p>
              </div>
              <Textarea label="Anything else we should know?" placeholder="Your situation, preferences, or anything helpful..."
                value={formData.notes} onChange={(e) => update('notes', e.target.value)} />
              <div>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" checked={formData.agreement}
                    onChange={(e) => update('agreement', e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-dark/15 text-primary focus:ring-primary/30 cursor-pointer" />
                  <span className="text-[14px] text-dark/40 group-hover:text-dark/55 transition-colors">
                    I understand the Zytheq model and am willing to participate in student training sessions.
                  </span>
                </label>
                {errors.agreement && <p className="mt-2 text-[13px] text-red-500 font-medium">{errors.agreement}</p>}
              </div>
              <div className="flex justify-between pt-4">
                <Button type="button" onClick={prevStep} variant="ghost" icon={<ArrowLeft className="w-3.5 h-3.5" />} iconPosition="left">Back</Button>
                <Button type="submit" variant="accent" size="lg">Submit Application</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  )
}
