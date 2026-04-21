'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useAuth, UserRole } from '@/lib/auth-context'
import AuthCard from '@/components/auth/AuthCard'
import RoleTabs from '@/components/auth/RoleTabs'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

const EASE = [0.22, 1, 0.36, 1] as const

const roleConfig: Record<UserRole, { heading: string; sub: string }> = {
  candidate: { heading: 'Welcome back', sub: 'Sign in to track your job search progress' },
  student: { heading: 'Welcome back', sub: 'Sign in to continue your learning journey' },
  recruiter: { heading: 'Welcome back', sub: 'Sign in to access your talent pipeline' },
}

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [role, setRole] = useState<UserRole>('candidate')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Please fill in all fields'); return }
    setIsLoading(true)
    const result = await login(email, password)
    if (result.success && result.user) {
      router.push(`/dashboard/${result.user.role}`)
    } else {
      setError(result.error || 'Login failed')
      setIsLoading(false)
    }
  }

  const cfg = roleConfig[role]

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <AuthCard>
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-[1.75rem] font-semibold text-dark tracking-[-0.03em] mb-1.5">{cfg.heading}</h1>
          <p className="text-[14px] text-dark/40">{cfg.sub}</p>
        </div>

        {/* Role tabs */}
        <RoleTabs activeRole={role} onRoleChange={(r) => { setRole(r); setError('') }} />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder={`${role}@zytheq.com`}
            value={email}
            onChange={e => { setEmail(e.target.value); setError('') }}
            required
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPw ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError('') }}
              required
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-0 top-8 p-2 text-dark/30 hover:text-dark/60 transition-colors"
              aria-label={showPw ? 'Hide password' : 'Show password'}
            >
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[13px] text-red-500 font-medium text-center py-2 px-3 rounded-lg bg-red-50 ring-1 ring-red-100"
            >
              {error}
            </motion.p>
          )}

          <Button
            type="submit"
            variant="dark"
            size="lg"
            fullWidth
            disabled={isLoading}
            icon={!isLoading ? <ArrowRight className="w-4 h-4" /> : undefined}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        {/* Info note */}
        <div className="mt-6 p-3.5 rounded-xl bg-surface ring-1 ring-dark/[0.04]">
          <p className="text-[12px] text-dark/45 leading-relaxed">
            Sign in with your Zytheq account. New here? <a href={`/signup/${role}`} className="font-semibold text-primary hover:text-primary-dark transition-colors">Create an account</a> to get started.
          </p>
        </div>

        {/* Sign up link */}
        <div className="mt-6 text-center">
          <p className="text-[13px] text-dark/40">
            Don&apos;t have an account?{' '}
            <a href={`/signup/${role}`} className="font-semibold text-primary hover:text-primary-dark transition-colors">
              Sign up
            </a>
          </p>
        </div>
      </AuthCard>
    </motion.div>
  )
}
