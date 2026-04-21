'use client'

import { TESTIMONIALS } from '@/lib/constants'

function TestimonialCard({ testimonial }: { testimonial: typeof TESTIMONIALS[0] }) {
  const typeColors: Record<string, { bg: string; text: string; label: string }> = {
    seeker: { bg: 'bg-primary/8', text: 'text-primary/70', label: 'Job Seeker' },
    student: { bg: 'bg-accent/10', text: 'text-accent-dark', label: 'Student' },
    recruiter: { bg: 'bg-emerald-50', text: 'text-emerald-600', label: 'Recruiter' },
  }
  const badge = typeColors[testimonial.type] || typeColors.seeker

  return (
    <div className="flex-shrink-0 w-[340px] sm:w-[380px] mx-2 whitespace-normal">
      <div className="rounded-2xl p-6 sm:p-7 bg-white ring-1 ring-dark/[0.04] hover:ring-primary/10 transition-all duration-500 hover:shadow-[0_4px_32px_-8px_rgba(21,75,168,0.08)] h-full">
        {/* Quote mark */}
        <div className="text-primary/[0.06] text-[4rem] font-display leading-none -mb-6 select-none">&ldquo;</div>
        <p className="text-dark/60 text-[15px] leading-[1.7] mb-5">
          {testimonial.text}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center ring-1 ring-primary/[0.06]">
              <span className="text-primary/60 text-[11px] font-bold">{testimonial.role[0]}{testimonial.location[0]}</span>
            </div>
            <div>
              <p className="text-[13px] font-medium text-dark/70">{testimonial.role}</p>
              <p className="text-[12px] text-dark/30">{testimonial.location}</p>
            </div>
          </div>
          <span className={`text-[10px] font-semibold uppercase tracking-[0.08em] px-2.5 py-1 rounded-full ${badge.bg} ${badge.text}`}>
            {badge.label}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  // We use the full TESTIMONIALS array directly now.

  return (
    <section className="relative py-24 sm:py-32 lg:py-40 bg-surface overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-primary/50 mb-5">
            <span className="w-6 h-px bg-primary/30" />
            Testimonials
          </span>
          <h2 className="font-display text-[2rem] sm:text-[2.75rem] lg:text-[3.5rem] font-semibold text-dark tracking-[-0.035em] leading-[1.08]">
            Real people.<br />Real results.
          </h2>
          <p className="mt-5 text-[17px] text-dark/40 leading-[1.7] max-w-lg">
            From candidates who got placed, students who grew, and recruiters who noticed.
          </p>
        </div>

        {/* Auto-scrolling row */}
        <div className="marquee-fade-edges overflow-hidden pb-4">
          <div className="animate-marquee whitespace-nowrap flex w-max" style={{ animationDuration: '140s' }}>
            {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <TestimonialCard key={`rt-${i}`} testimonial={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
