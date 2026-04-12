'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  onChange?: (rating: number) => void
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
}

const sizes = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4.5 h-4.5',
  lg: 'w-5.5 h-5.5',
}

export default function StarRating({ rating, onChange, size = 'md', interactive = false }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5" role={interactive ? 'radiogroup' : 'img'} aria-label={interactive ? 'Rating' : `${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onChange?.(star)}
          className={cn(
            'transition-all duration-150',
            interactive && 'cursor-pointer hover:scale-125',
            !interactive && 'cursor-default'
          )}
          aria-label={interactive ? `${star} star${star !== 1 ? 's' : ''}` : undefined}
          role={interactive ? 'radio' : undefined}
          aria-checked={interactive ? star === rating : undefined}
          tabIndex={interactive ? 0 : -1}
        >
          <Star
            className={cn(
              sizes[size],
              star <= rating
                ? 'fill-accent text-accent drop-shadow-[0_0_3px_rgba(254,184,0,0.3)]'
                : 'fill-dark/8 text-dark/8'
            )}
          />
        </button>
      ))}
    </div>
  )
}
