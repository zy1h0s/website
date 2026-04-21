'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle, Eye, EyeOff, Building2 } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import AuthCard from '@/components/auth/AuthCard'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import { validateEmail, cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const
const STEPS = ['Account', 'Company', 'Hiring', 'Done']

const companySizes = [
  { value: '1-10', label: '1–10' }, { value: '11-50', label: '11–50' },
  { value: '51-200', label: '51–200' }, { value: '201-1000', label: '201–1,000' },
  { value: '1000+', label: '1,000+' },
]
const industries = [
  { value: 'tech', label: 'Technology' }, { value: 'finance', label: 'Finance' },
  { value: 'healthcare', label: 'Healthcare' }, { value: 'retail', label: 'Retail / E-commerce' },
  { value: 'consulting', label: 'Consulting' }, { value: 'other', label: 'Other' },
]
const hiringVolumes = [
  { value: '1-5', label: '1–5 / quarter' }, { value: '6-15', label: '6–15 / quarter' },
  { value: '16-50', label: '16–50 / quarter' }, { value: '50+', label: '50+ / quarter' },
]

export default function RecruiterSignupPage() {
  const { signup } = useAuth()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [showPw, setShowPw] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    name: '', email: '', password: '', company: '',
    companySize: '', industry: '', website: '', hiringVolume: '',
    rolesHiring: '', preferredExp: '', notes: '', agreement: false,
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
      if (!form.company.trim()) e.company = 'Required'
    }
    if (s === 2) {
      if (!form.companySize) e.companySize = 'Required'
      if (!form.industry) e.industry = 'Required'
    }
    if (s === 3) {
      if (!form.rolesHiring.trim()) e.rolesHiring = 'Required'
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
    const result = await signup({ email: form.email, password: form.password, name: form.name, role: 'recruiter' })
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
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-dark/30">Recruiter Signup</span>
        </div>

        {step < 4 && (
          <div className="flex items-center gap-1.5 mb-8 mt-4">
            {STEPS.slice(0, 3).map((label, i) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className={cn('w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-400', i + 1 <= step ? 'bg-dark text-white' : 'ring-1 ring-dark/10 text-dark/20')}>{i + 1}</div>
                <span className={cn('text-[11px] font-medium hidden sm:block', i + 1 <= step ? 'text-dark/60' : 'text-dark/20')}>{label}</span>
                {i < 2 && <div className={cn('w-6 h-px', i + 1 < step ? 'bg-dark' : 'bg-dark/10')} />}
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35, ease: EASE }} className="space-y-5">
              <Input label="Full name" required placeholder="Jordan Lee" value={form.name} onChange={e => set('name', e.target.value)} error={errors.name} />
              <Input label="Work email" type="email" required placeholder="you@company.com" value={form.email} onChange={e => set('email', e.target.value)} error={errors.email} />
              <div className="relative">
                <Input label="Password" type={showPw ? 'text' : 'password'} required placeholder="Min 6 characters" value={form.password} onChange={e => set('password', e.target.value)} error={errors.password} />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-0 top-8 p-2 text-dark/30 hover:text-dark/60 transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <Input label="Company name" required placeholder="e.g., Acme Corp" value={form.company} onChange={e => set('company', e.target.value)} error={errors.company} />
              <div className="flex justify-end pt-2">
                <Button type="button" onClick={next} variant="dark" icon={<ArrowRight className="w-3.5 h-3.5" />}>Continue</Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35, ease: EASE }} className="space-y-5">
              <Select label="Company size" required options={companySizes} placeholder="Select" value={form.companySize} onChange={e => set('companySize', e.target.value)} error={errors.companySize} />
              <Select label="Industry" required options={industries} placeholder="Select" value={form.industry} onChange={e => set('industry', e.target.value)} error={errors.industry} />
              <Input label="Company website" type="url" placeholder="https://company.com" value={form.website} onChange={e => set('website', e.target.value)} helperText="Optional" />
              <Select label="Hiring volume" options={hiringVolumes} placeholder="Select" value={form.hiringVolume} onChange={e => set('hiringVolume', e.target.value)} />
              <div className="flex justify-between pt-2">
                <Button type="button" onClick={prev} variant="ghost" icon={<ArrowLeft className="w-3.5 h-3.5" />} iconPosition="left">Back</Button>
                <Button type="button" onClick={next} variant="dark" icon={<ArrowRight className="w-3.5 h-3.5" />}>Continue</Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35, ease: EASE }} className="space-y-5">
              <Input label="Roles you hire for" required placeholder="e.g., Engineers, PMs, Designers" value={form.rolesHiring} onChange={e => set('rolesHiring', e.target.value)} error={errors.rolesHiring} helperText="Comma-separated" />
              <Input label="Preferred candidate experience" placeholder="e.g., 3-5 years" value={form.preferredExp} onChange={e => set('preferredExp', e.target.value)} />
              <Textarea label="Additional notes" placeholder="Anything specific about your hiring needs..." value={form.notes} onChange={e => set('notes', e.target.value)} />
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" checked={form.agreement} onChange={e => set('agreement', e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-dark/15 text-primary focus:ring-primary/30 cursor-pointer" />
                <span className="text-[13px] text-dark/40 group-hover:text-dark/55 transition-colors leading-relaxed">I agree to Zytheq&apos;s recruiter terms and understand how the candidate pipeline works.</span>
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
              <h2 className="text-[1.5rem] font-semibold text-dark tracking-[-0.02em] mb-2">Account created!</h2>
              <p className="text-[14px] text-dark/40 mb-8 max-w-sm mx-auto">You now have access to our pre-vetted candidate pipeline. Let&apos;s find your next great hire.</p>
              <Button variant="dark" size="lg" href="/dashboard/recruiter" icon={<ArrowRight className="w-4 h-4" />}>Go to Dashboard</Button>
            </motion.div>
          )}
        </AnimatePresence>

        {step < 4 && (
          <div className="mt-6 text-center">
            <p className="text-[13px] text-dark/40">Already have an account? <a href="/login" className="font-semibold text-primary hover:text-primary-dark transition-colors">Sign in</a></p>
          </div>
        )}
      </AuthCard>
    </motion.div>
  )
}
