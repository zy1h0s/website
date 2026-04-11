'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import StarRating from '@/components/ui/StarRating'
import { formatDate } from '@/lib/utils'

interface ReviewCardProps {
  text: string
  role: string
  location: string
  rating: number
  date: string
  verified: boolean
  response: string | null
  index: number
}

export default function ReviewCard({ text, role, location, rating, date, verified, response, index }: ReviewCardProps) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 border border-gray-border"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.4 }}
    >
      <div className="flex items-start justify-between mb-3">
        <StarRating rating={rating} size="sm" />
        {verified && (
          <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Verified
          </span>
        )}
      </div>

      <p className="text-dark-secondary leading-relaxed text-[15px] mb-4">
        &ldquo;{text}&rdquo;
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-gray-border/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary text-xs font-bold">{role[0]}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-dark">{role}, {location}</p>
          </div>
        </div>
        <span className="text-xs text-gray-medium">{formatDate(new Date(date))}</span>
      </div>

      {response && (
        <div className="mt-4 bg-gray-light rounded-xl p-4 border-l-2 border-primary">
          <p className="text-xs font-semibold text-primary mb-1">Zytheq Response</p>
          <p className="text-sm text-gray-medium leading-relaxed">{response}</p>
        </div>
      )}
    </motion.div>
  )
}
