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
  { value: 'social', label: 'Social Media' }, { value: 'friend', label: 'Friend / Word of Mouth' },
  { value: 'college', label: 'College / University' }, { value: 'other', label: 'Other' },
]

export default function StudentForm() {
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', college: '', field: '', gradYear: '', wantToLearn: '', heardFrom: '', agreement: false,
  })
  const update = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value })
    setErrors({ ...errors, [field]: '' })
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!formData.name.trim()) e.name = 'Name is required'
    if (!formData.email) e.email = 'Email is required'
    else if (!validateEmail(formData.email)) e.email = 'Please enter a valid email'
    if (!formData.phone) e.phone = 'Phone is required'
    else if (!validatePhone(formData.phone)) e.phone = 'Please enter a valid phone number'
    if (!formData.college.trim()) e.college = 'College is required'
    if (!formData.field.trim()) e.field = 'Field of study is required'
    if (!formData.gradYear) e.gradYear = 'Please select your graduation year'
    if (!formData.wantToLearn.trim()) e.wantToLearn = 'Please tell us what you want to learn'
    if (!formData.agreement) e.agreement = 'Please agree to the commitment'
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
          <h3 className="text-xl font-semibold text-dark mb-2 tracking-[-0.02em]">You are in</h3>
          <p className="text-dark/40 text-[15px] max-w-sm mx-auto">We will match you with a mentor and reach out with next steps.</p>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={handleSubmit} className="space-y-7" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Input label="Full name" required placeholder="Your full name" value={formData.name}
            onChange={(e) => update('name', e.target.value)} error={errors.name} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input label="Email" type="email" required placeholder="you@example.com" value={formData.email}
              onChange={(e) => update('email', e.target.value)} error={errors.email} />
            <Input label="Phone" type="tel" required placeholder="+91 98765 43210" value={formData.phone}
              onChange={(e) => update('phone', e.target.value)} error={errors.phone} />
          </div>
          <Input label="College / University" required placeholder="e.g., Delhi University" value={formData.college}
            onChange={(e) => update('college', e.target.value)} error={errors.college} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input label="Field of study" required placeholder="e.g., Computer Science" value={formData.field}
              onChange={(e) => update('field', e.target.value)} error={errors.field} />
            <Select label="Graduation year" required options={gradYears} placeholder="Select year" value={formData.gradYear}
              onChange={(e) => update('gradYear', e.target.value)} error={errors.gradYear} />
          </div>
          <Textarea label="What do you most want to learn?" required placeholder="Skills, tools, or knowledge areas that interest you..."
            value={formData.wantToLearn} onChange={(e) => update('wantToLearn', e.target.value)} error={errors.wantToLearn} />
          <Select label="How did you hear about Zytheq?" options={hearAbout} placeholder="Select an option" value={formData.heardFrom}
            onChange={(e) => update('heardFrom', e.target.value)} />
          <div>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input type="checkbox" checked={formData.agreement}
                onChange={(e) => update('agreement', e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-dark/15 text-primary focus:ring-primary/30 cursor-pointer" />
              <span className="text-[14px] text-dark/40 group-hover:text-dark/55 transition-colors">
                I commit to attending scheduled sessions and making the most of this opportunity.
              </span>
            </label>
            {errors.agreement && <p className="mt-2 text-[13px] text-red-500 font-medium">{errors.agreement}</p>}
          </div>
          <Button type="submit" variant="accent" size="lg" fullWidth>Submit Application</Button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
