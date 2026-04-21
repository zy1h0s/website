'use client'

import DashboardPageShell from '@/components/dashboard/DashboardPageShell'
import Button from '@/components/ui/Button'
import { Plus, MapPin, Users, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

const positions = [
  { title: 'Senior Frontend Engineer', department: 'Engineering', location: 'Remote', type: 'Full-time', applicants: 23, status: 'Active', posted: 'Apr 14' },
  { title: 'Product Manager', department: 'Product', location: 'NYC', type: 'Full-time', applicants: 18, status: 'Active', posted: 'Apr 10' },
  { title: 'UX Designer', department: 'Design', location: 'SF / Remote', type: 'Full-time', applicants: 31, status: 'Active', posted: 'Apr 8' },
  { title: 'Data Analyst', department: 'Analytics', location: 'Austin', type: 'Full-time', applicants: 12, status: 'Paused', posted: 'Apr 2' },
]

export default function RecruiterPositionsPage() {
  return (
    <DashboardPageShell role="recruiter" title="Positions" description="Manage your open job positions.">
      <div className="flex justify-end mb-6">
        <Button variant="dark" size="md" icon={<Plus className="w-4 h-4" />} iconPosition="left">Post new role</Button>
      </div>

      <div className="space-y-3">
        {positions.map((p, i) => (
          <div key={i} className="rounded-xl bg-white ring-1 ring-dark/[0.05] p-5 hover:ring-primary/10 transition-all">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h4 className="text-[16px] font-semibold text-dark">{p.title}</h4>
                <p className="text-[12px] text-dark/35 mt-0.5">{p.department} · {p.type}</p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1.5 text-dark/40">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="text-[12px]">{p.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-dark/40">
                    <Users className="w-3.5 h-3.5" />
                    <span className="text-[12px]">{p.applicants} applicants</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-dark/40">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-[12px]">Posted {p.posted}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={cn(
                  'text-[10px] font-bold uppercase tracking-[0.06em] px-2.5 py-1 rounded-full',
                  p.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-dark/[0.06] text-dark/40'
                )}>{p.status}</span>
                <button className="text-[12px] font-medium text-primary hover:text-primary-dark transition-colors">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardPageShell>
  )
}
