'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { REVIEWS } from '@/lib/constants'
import ReviewCard from '@/components/reviews/ReviewCard'
import RatingBreakdown from '@/components/reviews/RatingBreakdown'
import ReviewForm from '@/components/reviews/ReviewForm'
import DotPattern from '@/components/ui/DotPattern'
import { useAuth } from '@/lib/auth-context'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const
const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Job Seekers', value: 'seeker' },
  { label: 'Students', value: 'student' },
  { label: 'Recruiters', value: 'recruiter' },
]

export default function ReviewsPage() {
  const [filter, setFilter] = useState('all')
  const { user } = useAuth()
  const filtered = filter === 'all' ? REVIEWS : REVIEWS.filter((r) => r.type === filter)

  // Split into 3 columns for masonry
  const cols: typeof REVIEWS[] = [[], [], []]
  filtered.forEach((r, i) => cols[i % 3].push(r))

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 bg-primary-deeper overflow-hidden grain">
        <DotPattern className="opacity-[0.025]" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-white/30 mb-5">
              <span className="w-6 h-px bg-accent/50" />
              Reviews
            </span>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-semibold text-white tracking-[-0.04em] leading-[1.05]">
              What people say<br />about Zytheq
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Rating overview */}
      <section className="py-16 sm:py-20 bg-white border-b border-dark/[0.04]">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10">
          <RatingBreakdown reviews={REVIEWS} />
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 sm:py-28 bg-surface">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-12">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={cn(
                  'px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300 cursor-pointer',
                  filter === f.value
                    ? 'bg-dark text-white'
                    : 'text-dark/35 ring-1 ring-dark/[0.06] hover:ring-dark/15 hover:text-dark/60'
                )}
              >
                {f.label}
                <span className="ml-1.5 opacity-40">
                  {f.value === 'all' ? REVIEWS.length : REVIEWS.filter(r => r.type === f.value).length}
                </span>
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
            {cols.map((col, colIdx) => (
              <div key={colIdx} className={cn('space-y-4', colIdx === 1 && 'hidden md:block lg:mt-8', colIdx === 2 && 'hidden lg:block mt-4')}>
                {col.map((review, i) => (
                  <ReviewCard
                    key={review.id}
                    text={review.text}
                    role={review.role}
                    location={review.location}
                    rating={review.rating}
                    date={review.date}
                    verified={review.verified}
                    response={review.response}
                    index={i}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Form */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-primary/50 mb-5">
              <span className="w-6 h-px bg-primary/30" />
              Leave a review
            </span>
            <h2 className="font-display text-[2rem] sm:text-[2.5rem] font-semibold text-dark tracking-[-0.035em] leading-[1.08]">
              Share your experience
            </h2>
            <p className="mt-3 text-[15px] text-dark/40">
              Only verified Zytheq users can submit reviews.
            </p>
          </motion.div>
          {user ? (
            <ReviewForm />
          ) : (
            <div className="bg-surface rounded-xl p-10 text-center ring-1 ring-dark/[0.04]">
              <p className="text-dark/50 text-[15px]">
                Please <a href="/login" className="text-primary font-semibold hover:underline">log in</a> to add a review.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
