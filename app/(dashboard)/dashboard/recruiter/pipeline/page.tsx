'use client'

import DashboardPageShell from '@/components/dashboard/DashboardPageShell'
import { cn } from '@/lib/utils'

const stages = ['New', 'Screening', 'Shortlisted', 'Interview', 'Offer']

const candidates = [
  { name: 'Sarah Kim', role: 'Frontend Engineer', exp: '4 yrs', stage: 'Interview', location: 'NYC', score: 92 },
  { name: 'Michael Rodriguez', role: 'Backend Developer', exp: '6 yrs', stage: 'Screening', location: 'Austin', score: 85 },
  { name: 'James Thompson', role: 'Product Manager', exp: '8 yrs', stage: 'Shortlisted', location: 'Remote', score: 88 },
  { name: 'Angela Wu', role: 'UX Designer', exp: '3 yrs', stage: 'New', location: 'SF', score: 79 },
  { name: 'David Park', role: 'Data Engineer', exp: '5 yrs', stage: 'Interview', location: 'Seattle', score: 91 },
  { name: 'Lisa Chen', role: 'Full Stack Dev', exp: '4 yrs', stage: 'Offer', location: 'Remote', score: 94 },
  { name: 'Ryan O\'Brien', role: 'DevOps Engineer', exp: '7 yrs', stage: 'Screening', location: 'Chicago', score: 82 },
  { name: 'Priya Patel', role: 'QA Engineer', exp: '3 yrs', stage: 'New', location: 'Remote', score: 76 },
]

const stageColors: Record<string, string> = {
  New: 'bg-dark/[0.06] text-dark/50',
  Screening: 'bg-primary/10 text-primary',
  Shortlisted: 'bg-accent/15 text-accent-dark',
  Interview: 'bg-blue-50 text-blue-600',
  Offer: 'bg-emerald-50 text-emerald-600',
}

export default function RecruiterPipelinePage() {
  return (
    <DashboardPageShell role="recruiter" title="Pipeline" description="Manage your candidate pipeline across all stages.">
      {/* Stage summary */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        {stages.map(stage => {
          const count = candidates.filter(c => c.stage === stage).length
          return (
            <div key={stage} className="rounded-xl bg-white ring-1 ring-dark/[0.05] p-4 text-center">
              <p className="text-[1.5rem] font-bold text-dark tracking-[-0.02em]">{count}</p>
              <p className="text-[11px] font-medium text-dark/30 uppercase tracking-[0.06em] mt-0.5">{stage}</p>
            </div>
          )
        })}
      </div>

      {/* Candidate list */}
      <div className="rounded-2xl bg-white ring-1 ring-dark/[0.05] overflow-hidden">
        <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 border-b border-dark/[0.04] text-[11px] font-bold uppercase tracking-[0.08em] text-dark/25">
          <div className="col-span-3">Candidate</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-2">Location</div>
          <div className="col-span-1">Score</div>
          <div className="col-span-2">Stage</div>
          <div className="col-span-2">Action</div>
        </div>
        {candidates.map((c, i) => (
          <div key={i} className={cn('px-4 sm:px-6 py-4', i < candidates.length - 1 && 'border-b border-dark/[0.04]')}>
            {/* Mobile card */}
            <div className="sm:hidden">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-primary/[0.08] flex items-center justify-center text-[11px] font-bold text-primary flex-shrink-0">
                    {c.name.split(' ').map(w => w[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-dark truncate">{c.name}</p>
                    <p className="text-[12px] text-dark/35 truncate">{c.role} · {c.exp}</p>
                  </div>
                </div>
                <span className={cn('inline-flex px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.04em] flex-shrink-0', stageColors[c.stage])}>{c.stage}</span>
              </div>
              <div className="flex items-center justify-between mt-2 ml-12">
                <p className="text-[12px] text-dark/35">{c.location} · Score: <span className="font-bold text-dark">{c.score}</span></p>
                <div className="flex gap-3">
                  <button className="text-[12px] font-medium text-primary">View</button>
                  <button className="text-[12px] font-medium text-dark/30">Move</button>
                </div>
              </div>
            </div>

            {/* Desktop row */}
            <div className="hidden sm:grid grid-cols-12 gap-4 items-center">
              <div className="col-span-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/[0.08] flex items-center justify-center text-[11px] font-bold text-primary flex-shrink-0">
                  {c.name.split(' ').map(w => w[0]).join('')}
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-dark">{c.name}</p>
                  <p className="text-[12px] text-dark/35">{c.exp} experience</p>
                </div>
              </div>
              <div className="col-span-2"><p className="text-[13px] text-dark/55">{c.role}</p></div>
              <div className="col-span-2"><p className="text-[13px] text-dark/55">{c.location}</p></div>
              <div className="col-span-1"><span className="text-[13px] font-bold text-dark">{c.score}</span></div>
              <div className="col-span-2">
                <span className={cn('inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.04em]', stageColors[c.stage])}>{c.stage}</span>
              </div>
              <div className="col-span-2 flex gap-2">
                <button className="text-[12px] font-medium text-primary hover:text-primary-dark transition-colors">View</button>
                <button className="text-[12px] font-medium text-dark/30 hover:text-dark/60 transition-colors">Move</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardPageShell>
  )
}
