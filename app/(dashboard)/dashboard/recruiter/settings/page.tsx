'use client'

import DashboardPageShell from '@/components/dashboard/DashboardPageShell'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Save } from 'lucide-react'

export default function RecruiterSettingsPage() {
  const { user } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [company, setCompany] = useState('Acme Corp')
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <DashboardPageShell role="recruiter" title="Settings" description="Manage your account and company preferences.">
      <div className="max-w-2xl">
        <form onSubmit={handleSave} className="rounded-2xl bg-white ring-1 ring-dark/[0.05] p-6 sm:p-8 space-y-6">
          <h3 className="text-[14px] font-bold text-dark mb-2">Profile Information</h3>
          <Input label="Full name" value={name} onChange={e => setName(e.target.value)} />
          <Input label="Work email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Company" value={company} onChange={e => setCompany(e.target.value)} />
          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" variant="dark" size="md" icon={<Save className="w-3.5 h-3.5" />} iconPosition="left">{saved ? 'Saved!' : 'Save changes'}</Button>
            {saved && <span className="text-[13px] text-emerald-600 font-medium">Changes saved successfully</span>}
          </div>
        </form>
        <div className="rounded-2xl bg-white ring-1 ring-dark/[0.05] p-6 sm:p-8 mt-6">
          <h3 className="text-[14px] font-bold text-dark mb-4">Notifications</h3>
          <div className="space-y-4">
            {['New candidate matches', 'Interview confirmations', 'Weekly pipeline digest', 'Candidate status changes'].map((pref, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-dark/15 text-primary focus:ring-primary/30 cursor-pointer" />
                <span className="text-[14px] text-dark/55 group-hover:text-dark/70 transition-colors">{pref}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </DashboardPageShell>
  )
}
