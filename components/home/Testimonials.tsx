'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import SectionHeading from '@/components/ui/SectionHeading'

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', checkScroll, { passive: true })
    checkScroll()
    return () => el.removeEventListener('scroll', checkScroll)
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = scrollRef.current.clientWidth * 0.7
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-primary overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Real people. Real results."
          subtitle="From candidates who got placed, students who grew, and recruiters who noticed."
          light
        />

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                className="flex-shrink-0 w-[320px] sm:w-[380px] snap-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: Math.min(i * 0.05, 0.3), duration: 0.4 }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 h-full border border-white/10 hover:bg-white/15 transition-colors duration-300">
                  <Quote className="w-8 h-8 text-accent/50 mb-4" />
                  <p className="text-white/90 leading-relaxed mb-6 text-[15px]">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-accent text-xs font-bold">
                        {t.role[0]}
                      </span>
                    </div>
                    <div>
                      <p className="text-white/80 text-sm font-medium">{t.role}</p>
                      <p className="text-white/40 text-xs">{t.location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={cn(
                'w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200',
                canScrollLeft
                  ? 'bg-white/15 text-white hover:bg-accent hover:text-dark cursor-pointer'
                  : 'bg-white/5 text-white/20 cursor-not-allowed'
              )}
              aria-label="Scroll testimonials left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={cn(
                'w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200',
                canScrollRight
                  ? 'bg-white/15 text-white hover:bg-accent hover:text-dark cursor-pointer'
                  : 'bg-white/5 text-white/20 cursor-not-allowed'
              )}
              aria-label="Scroll testimonials right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
