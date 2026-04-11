'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { REVIEWS } from '@/lib/constants'
import ReviewCard from '@/components/reviews/ReviewCard'
import RatingBreakdown from '@/components/reviews/RatingBreakdown'
import ReviewForm from '@/components/reviews/ReviewForm'
import DotPattern from '@/components/ui/DotPattern'
import SectionHeading from '@/components/ui/SectionHeading'
import { cn } from '@/lib/utils'

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Job Seekers', value: 'seeker' },
  { label: 'Students', value: 'student' },
  { label: 'Recruiters', value: 'recruiter' },
]

export default function ReviewsPage() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? REVIEWS
    : REVIEWS.filter((r) => r.type === filter)

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-primary overflow-hidden">
        <DotPattern className="opacity-[0.03]" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              What people say about Zytheq
            </h1>
            <p className="mt-4 text-lg text-white/60 max-w-xl mx-auto">
              Real experiences from job seekers, students, and recruiters.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Rating Breakdown */}
      <section className="py-12 sm:py-16 bg-gray-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <RatingBreakdown reviews={REVIEWS} />
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={cn(
                  'px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer',
                  filter === f.value
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-light text-gray-medium hover:bg-gray-border hover:text-dark'
                )}
              >
                {f.label}
                <span className="ml-1.5 text-xs opacity-60">
                  ({f.value === 'all' ? REVIEWS.length : REVIEWS.filter(r => r.type === f.value).length})
                </span>
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((review, i) => (
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
        </div>
      </section>

      {/* Review Form */}
      <section className="py-16 sm:py-24 bg-gray-light">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Share your experience"
            subtitle="Used Zytheq? We would love to hear about it. Only verified users can submit reviews."
          />
          <ReviewForm />
        </div>
      </section>
    </>
  )
}
