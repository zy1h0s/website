'use client'

import DashboardPageShell from '@/components/dashboard/DashboardPageShell'
import { FileText, Download, RefreshCw, CheckCircle2 } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function ResumePage() {
  return (
    <DashboardPageShell role="candidate" title="Resume" description="Your resume is managed and optimized by our career team.">
      {/* Current resume */}
      <div className="rounded-2xl bg-white ring-1 ring-dark/[0.05] p-6 sm:p-8 mb-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/[0.06] flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-[16px] font-semibold text-dark">Alex_Morgan_Resume_v3.pdf</h3>
              <p className="text-[12px] text-dark/35 mt-0.5">Last updated Apr 16, 2026 · ATS-optimized</p>
              <div className="flex items-center gap-1.5 mt-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-[12px] font-medium text-emerald-600">ATS score: 92/100</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" icon={<Download className="w-3.5 h-3.5" />} iconPosition="left">Download</Button>
            <Button variant="secondary" size="sm" icon={<RefreshCw className="w-3.5 h-3.5" />} iconPosition="left">Request update</Button>
          </div>
        </div>
      </div>

      {/* Version history */}
      <div className="rounded-2xl bg-white ring-1 ring-dark/[0.05] p-6 sm:p-8">
        <h3 className="text-[14px] font-bold text-dark mb-5">Version History</h3>
        <div className="space-y-4">
          {[
            { version: 'v3', date: 'Apr 16, 2026', note: 'Optimized for frontend engineering roles, added React/Next.js keywords' },
            { version: 'v2', date: 'Apr 8, 2026', note: 'Restructured experience section, improved action verbs' },
            { version: 'v1', date: 'Apr 2, 2026', note: 'Initial version uploaded by candidate' },
          ].map((v, i) => (
            <div key={i} className="flex items-start gap-3 py-3 border-b border-dark/[0.04] last:border-0">
              <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center flex-shrink-0">
                <span className="text-[11px] font-bold text-dark/40">{v.version}</span>
              </div>
              <div className="flex-1">
                <p className="text-[13px] text-dark/65">{v.note}</p>
                <p className="text-[11px] text-dark/25 mt-0.5">{v.date}</p>
              </div>
              <button className="text-[12px] font-medium text-primary hover:text-primary-dark transition-colors flex-shrink-0">Download</button>
            </div>
          ))}
        </div>
      </div>
    </DashboardPageShell>
  )
}
