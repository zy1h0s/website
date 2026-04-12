'use client'

import { motion } from 'framer-motion'
import StarRating from '@/components/ui/StarRating'

const EASE = [0.22, 1, 0.36, 1] as const

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
      className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-10 sm:gap-16 items-center"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="text-center sm:text-left">
        <div className="text-[4rem] font-display font-semibold text-dark tracking-[-0.04em] leading-none">{avg.toFixed(1)}</div>
        <div className="mt-2"><StarRating rating={Math.round(avg)} size="md" /></div>
        <p className="text-[13px] text-dark/30 mt-2 font-medium">Based on {total}+ reviews</p>
      </div>

      <div className="space-y-3">
        {breakdown.map((b, i) => (
          <div key={b.star} className="flex items-center gap-4">
            <span className="text-[13px] font-medium text-dark/30 w-3 text-right">{b.star}</span>
            <div className="flex-1 h-1.5 bg-dark/[0.04] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${b.percentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 + i * 0.05, ease: EASE }}
              />
            </div>
            <span className="text-[12px] text-dark/25 w-8 text-right">{b.percentage}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
