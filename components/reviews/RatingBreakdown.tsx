'use client'

import { motion } from 'framer-motion'
import StarRating from '@/components/ui/StarRating'

interface RatingBreakdownProps {
  reviews: { rating: number }[]
}

export default function RatingBreakdown({ reviews }: RatingBreakdownProps) {
  const total = reviews.length
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / total
  const breakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length
    return { star, count, percentage: Math.round((count / total) * 100) }
  })

  return (
    <motion.div
      className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 mb-6">
        <div className="text-center sm:text-left">
          <div className="text-5xl font-bold text-dark font-display">{avg.toFixed(1)}</div>
          <div className="mt-1">
            <StarRating rating={Math.round(avg)} size="md" />
          </div>
          <p className="text-sm text-gray-medium mt-1">Based on {total}+ reviews</p>
        </div>

        <div className="flex-1 space-y-2">
          {breakdown.map((b) => (
            <div key={b.star} className="flex items-center gap-3">
              <span className="text-sm font-medium text-dark w-3">{b.star}</span>
              <div className="flex-1 h-2.5 bg-gray-light rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${b.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
              <span className="text-sm text-gray-medium w-10 text-right">{b.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
