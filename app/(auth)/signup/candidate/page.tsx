'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle, Eye, EyeOff, Briefcase } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import AuthCard from '@/components/auth/AuthCard'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import { validateEmail, validatePhone, cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const
const STEPS = ['Account', 'Career', 'Preferences', 'Done']

const salaryRanges = [
  { value: '40-60', label: '$40k – $60k' }, { value: '60-80', label: '$60k – $80k' },
  { value: '80-100', label: '$80k – $100k' }, { value: '100-130', label: '$100k – $130k' },
  { value: '130-160', label: '$130k – $160k' }, { value: '160-200', label: '$160k – $200k' },
  { value: '200+', label: '$200k+' }, { value: 'flexible', label: 'Flexible' },
]
const experienceLevels = [
  { value: '0-1', label: '0–1 years' }, { value: '1-3', label: '1–3 years' },
  { value: '3-5', label: '3–5 years' }, { value: '5-10', label: '5–10 years' }, { value: '10+', label: '10+ years' },
]

export default function CandidateSignupPage() {
  const { signup } = useAuth()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [showPw, setShowPw] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '',
    currentRole: '', experience: '', targetRoles: '', locations: '', salary: '',
    linkedin: '', notes: '', agreement: false,
  })

  const set = (k: string, v: string | boolean) => { setForm({ ...form, [k]: v }); setErrors({ ...errors, [k]: '' }) }

  const validate = (s: number) => {
    const e: Record<string, string> = {}
    if (s === 1) {
      if (!form.name.trim()) e.name = 'Required'
      if (!form.email) e.email = 'Required'
      else if (!validateEmail(form.email)) e.email = 'Invalid email'
      if (!form.password) e.password = 'Required'
      else if (form.password.length < 6) e.password = 'Min 6 characters'
      if (!form.phone) e.phone = 'Required'
      else if (!validatePhone(form.phone)) e.phone = 'Invalid number'
    }
    if (s === 2) {
      if (!form.currentRole.trim()) e.currentRole = 'Required'
      if (!form.experience) e.experience = 'Required'
      if (!form.targetRoles.trim()) e.targetRoles = 'Required'
    }
    if (s === 3) {
      if (!form.agreement) e.agreement = 'Please agree to continue'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const [isLoading, setIsLoading] = useState(false)
  const [signupError, setSignupError] = useState('')

  const next = () => { if (validate(step)) setStep(step + 1) }
  const prev = () => setStep(step - 1)

  const handleFinish = async () => {
    if (!validate(3)) return
    setIsLoading(true)
    setSignupError('')
    const result = await signup({ email: form.email, password: form.password, name: form.name, role: 'candidate' })
    if (result.success) {
      setStep(4)
    } else {
      setSignupError(result.error || 'Signup failed')
    }
    setIsLoading(false)
  }

  return (
    <motion.div className="w-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
      <AuthCard className="max-w-[540px]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-primary" />
          </div>
          <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-dark/30">Candidate Signup</span>
        </div>

        {/* Progress */}
        {step < 4 && (
          <div className="flex items-center gap-1.5 mb-8 mt-4">
            {STEPS.slice(0, 3).map((label, i) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-400',
                  i + 1 <= step ? 'bg-dark text-white' : 'ring-1 ring-dark/10 text-dark/20'
                )}>{i + 1}</div>
                <span className={cn('text-[11px] font-medium hidden sm:block', i + 1 <= step ? 'text-dark/60' : 'text-dark/20')}>{label}</span>
                {i < 2 && <div className={cn('w-6 h-px', i + 1 < step ? 'bg-dark' : 'bg-dark/10')} />}
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35, ease: EASE }} className="space-y-5">
              <Input label="Full name" required placeholder="Alex Morgan" value={form.name} onChange={e => set('name', e.target.value)} error={errors.name} />
              <Input label="Email" type="email" required placeholder="you@email.com" value={form.email} onChange={e => set('email', e.target.value)} error={errors.email} />
              <div className="relative">
                <Input label="Password" type={showPw ? 'text' : 'password'} required placeholder="Min 6 characters" value={form.password} onChange={e => set('password', e.target.value)} error={errors.password} />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-0 top-8 p-2 text-dark/30 hover:text-dark/60 transition-colors" aria-label={showPw ? 'Hide' : 'Show'}>
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <Input label="Phone" type="tel" required placeholder="+1 (555) 123-4567" value={form.phone} onChange={e => set('phone', e.target.value)} error={errors.phone} />
              <div className="flex justify-end pt-2">
                <Button type="button" onClick={next} variant="dark" icon={<ArrowRight className="w-3.5 h-3.5" />}>Continue</Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35, ease: EASE }} className="space-y-5">
              <Input label="Current role" required placeholder="e.g., Software Engineer" value={form.currentRole} onChange={e => set('currentRole', e.target.value)} error={errors.currentRole} />
              <Select label="Experience" required options={experienceLevels} placeholder="Select" value={form.experience} onChange={e => set('experience', e.target.value)} error={errors.experience} />
              <Input label="Target roles" required placeholder="e.g., Senior Dev, Tech Lead" value={form.targetRoles} onChange={e => set('targetRoles', e.target.value)} error={errors.targetRoles} helperText="Comma-separated" />
              <Input label="Preferred locations" placeholder="e.g., Remote, NYC" value={form.locations} onChange={e => set('locations', e.target.value)} />
              <Select label="Salary range" options={salaryRanges} placeholder="Select" value={form.salary} onChange={e => set('salary', e.target.value)} />
              <div className="flex justify-between pt-2">
                <Button type="button" onClick={prev} variant="ghost" icon={<ArrowLeft className="w-3.5 h-3.5" />} iconPosition="left">Back</Button>
                <Button type="button" onClick={next} variant="dark" icon={<ArrowRight className="w-3.5 h-3.5" />}>Continue</Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35, ease: EASE }} className="space-y-5">
              <Input label="LinkedIn URL" type="url" placeholder="https://linkedin.com/in/you" value={form.linkedin} onChange={e => set('linkedin', e.target.value)} helperText="Optional" />
              <div>
                <label className="block text-[13px] font-medium mb-2 uppercase text-dark/50">Resume</label>
                <input type="file" accept=".pdf,.doc,.docx" className="w-full text-sm text-dark/40" />
                <p className="mt-1.5 text-[12px] text-dark/25">PDF or Word, max 5MB</p>
              </div>
              <Textarea label="Anything else?" placeholder="Goals, preferences, timeline..." value={form.notes} onChange={e => set('notes', e.target.value)} />
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" checked={form.agreement} onChange={e => set('agreement', e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-dark/15 text-primary focus:ring-primary/30 cursor-pointer" />
                <span className="text-[13px] text-dark/40 group-hover:text-dark/55 transition-colors leading-relaxed">I understand the Zytheq model and agree to participate in student mentoring sessions.</span>
              </label>
              {errors.agreement && <p className="text-[13px] text-red-500 font-medium">{errors.agreement}</p>}
              {signupError && <p className="text-[13px] text-red-500 font-medium text-center py-2 px-3 rounded-lg bg-red-50 ring-1 ring-red-100">{signupError}</p>}
              <div className="flex justify-between pt-2">
                <Button type="button" onClick={prev} variant="ghost" icon={<ArrowLeft className="w-3.5 h-3.5" />} iconPosition="left">Back</Button>
                <Button type="button" onClick={handleFinish} variant="accent" size="lg" disabled={isLoading}>{isLoading ? 'Creating...' : 'Create Account'}</Button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: EASE }} className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-7 h-7 text-emerald-500" />
              </div>
              <h2 className="text-[1.5rem] font-semibold text-dark tracking-[-0.02em] mb-2">You&apos;re all set!</h2>
              <p className="text-[14px] text-dark/40 mb-8 max-w-sm mx-auto">Your account has been created. Our team will review your profile and start working on your job search.</p>
              <Button variant="dark" size="lg" href="/dashboard/candidate" icon={<ArrowRight className="w-4 h-4" />}>Go to Dashboard</Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Login link */}
        {step < 4 && (
          <div className="mt-6 text-center">
            <p className="text-[13px] text-dark/40">Already have an account? <a href="/login" className="font-semibold text-primary hover:text-primary-dark transition-colors">Sign in</a></p>
          </div>
        )}
      </AuthCard>
    </motion.div>
  )
}
