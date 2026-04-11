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
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
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
            'transition-colors',
            interactive && 'cursor-pointer hover:scale-110 active:scale-95',
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
                ? 'fill-accent text-accent'
                : 'fill-transparent text-gray-border'
            )}
          />
        </button>
      ))}
    </div>
  )
}
