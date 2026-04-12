'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import StarRating from '@/components/ui/StarRating'
import { formatDate } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

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
      className="group"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: Math.min(index * 0.03, 0.2), duration: 0.7, ease: EASE }}
    >
      <div className="rounded-2xl p-6 sm:p-7 bg-white ring-1 ring-dark/[0.04] hover:ring-primary/10 transition-all duration-500 hover:shadow-[0_4px_32px_-8px_rgba(21,75,168,0.06)]">
        <div className="flex items-center justify-between mb-4">
          <StarRating rating={rating} size="sm" />
          <div className="flex items-center gap-2">
            {verified && (
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                Verified
              </span>
            )}
            <span className="text-[12px] text-dark/20">{formatDate(new Date(date))}</span>
          </div>
        </div>

        <p className="text-dark/60 text-[15px] leading-[1.7] mb-5">
          &ldquo;{text}&rdquo;
        </p>

        <div className="flex items-center gap-3 pt-4 border-t border-dark/[0.04]">
          <div className="w-7 h-7 rounded-full bg-primary/[0.05] flex items-center justify-center">
            <span className="text-primary/50 text-[10px] font-bold">{role[0]}</span>
          </div>
          <p className="text-[13px] font-medium text-dark/50">{role}, {location}</p>
        </div>

        {response && (
          <div className="mt-4 rounded-xl bg-surface p-4 border-l-2 border-primary/30">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary/50 mb-1">Zytheq</p>
            <p className="text-[13px] text-dark/40 leading-[1.65]">{response}</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
