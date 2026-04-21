'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useRef } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

export default function OfferLetter3D() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Raw mouse values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smoothed with spring for silky feel
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  // Map mouse position to rotation (subtle range: -12 to 12 degrees)
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12])
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10])

  // Slight parallax shift for floating badges
  const badgeShiftX = useTransform(smoothX, [-0.5, 0.5], [-8, 8])
  const badgeShiftY = useTransform(smoothY, [-0.5, 0.5], [-6, 6])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    // Normalize to -0.5 to 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex lg:col-span-5 items-center justify-center relative cursor-magnetic mt-12 lg:mt-0 px-4 sm:px-0"
      style={{ perspective: '1400px' }}
    >
      <motion.div
        className="relative will-change-transform"
        initial={{ opacity: 0, scale: 0.85, rotateY: -30, rotateX: 15 }}
        animate={{
          opacity: 1,
          scale: 1,
          rotateY: [null, 14, -8, 5, -2, 0],
          rotateX: [null, -6, 4, -2, 1, 0],
        }}
        transition={{
          delay: 0.5,
          duration: 2.4,
          ease: [0.22, 1, 0.36, 1],
          rotateY: { delay: 0.5, duration: 2.8, ease: 'easeOut', times: [0, 0.25, 0.45, 0.65, 0.82, 1] },
          rotateX: { delay: 0.5, duration: 2.8, ease: 'easeOut', times: [0, 0.25, 0.45, 0.65, 0.82, 1] },
        }}
        style={{
          transformStyle: 'preserve-3d',
          rotateY,
          rotateX,
        }}
      >
        {/* Ambient warm glow behind card */}
        <div
          className="absolute -z-10 rounded-full pointer-events-none"
          style={{
            inset: '-60px',
            background: 'radial-gradient(circle, rgba(254,184,0,0.12) 0%, rgba(26,91,196,0.06) 50%, transparent 75%)',
          }}
        />

        {/* Ground shadow — creates the "floating above surface" 3D illusion */}
        <div
          className="absolute -z-10 pointer-events-none"
          style={{
            bottom: '-32px',
            left: '10%',
            right: '10%',
            height: '60px',
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.12) 40%, transparent 75%)',
            filter: 'blur(12px)',
            borderRadius: '50%',
          }}
        />

        {/* === THE OFFER LETTER === */}
        <div
          className="relative w-full max-w-[320px] sm:max-w-[360px] bg-white rounded-2xl overflow-hidden select-none"
          style={{
            boxShadow: `
              0 0 0 1px rgba(255,255,255,0.15),
              0 1px 2px rgba(0,0,0,0.12),
              0 4px 8px rgba(0,0,0,0.12),
              0 12px 24px rgba(0,0,0,0.15),
              0 24px 48px -8px rgba(0,0,0,0.25),
              0 48px 80px -16px rgba(0,0,0,0.3),
              0 0 40px -8px rgba(255,255,255,0.06)
            `,
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Top accent bar */}
          <div className="h-[3px] bg-gradient-to-r from-primary via-primary-light to-accent" />

          {/* Letter content */}
          <div className="px-8 pt-7 pb-8">
            {/* Company header */}
            <div className="flex items-center justify-between mb-7">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-sm">
                  <span className="text-white text-[11px] font-bold tracking-wide">Z</span>
                </div>
                <div>
                  <span className="text-[12px] font-bold text-dark tracking-[-0.01em]">Zytheq</span>
                  <p className="text-[9px] text-dark/30 font-medium -mt-0.5">Career Services</p>
                </div>
              </div>
              <span className="text-[10px] text-dark/20 font-medium tabular-nums">04 / 2026</span>
            </div>

            {/* Title */}
            <h4 className="text-[20px] font-bold text-dark tracking-[-0.03em] leading-tight">
              Offer of Employment
            </h4>
            <p className="text-[12px] text-dark/35 font-medium mt-1 mb-6">Software Engineer · Full-Time</p>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-dark/[0.08] via-dark/[0.04] to-transparent mb-6" />

            {/* Offer details */}
            <div className="space-y-4 mb-7">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" strokeWidth={2.5} />
                </div>
                <div className="flex-1 flex items-baseline justify-between">
                  <span className="text-[13px] font-semibold text-dark/75">Base Salary</span>
                  <span className="text-[13px] font-bold text-dark tabular-nums">$225,000</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" strokeWidth={2.5} />
                </div>
                <div className="flex-1 flex items-baseline justify-between">
                  <span className="text-[13px] font-semibold text-dark/75">Start Date</span>
                  <span className="text-[13px] font-bold text-dark">May 12, 2026</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" strokeWidth={2.5} />
                </div>
                <div className="flex-1 flex items-baseline justify-between">
                  <span className="text-[13px] font-semibold text-dark/75">Location</span>
                  <span className="text-[13px] font-bold text-dark">Remote · US</span>
                </div>
              </div>
            </div>

            {/* Signature area */}
            <div className="h-px bg-dark/[0.06] mb-5" />
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] text-dark/20 font-medium mb-1">Authorized by</p>
                <div className="w-24 h-px bg-dark/10" />
              </div>
              {/* Accept badge */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 ring-1 ring-emerald-200/60">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" strokeWidth={2.5} />
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.06em]">Accepted</span>
              </div>
            </div>
          </div>
        </div>

        {/* === FLOATING NOTIFICATION — TOP RIGHT === */}
        <motion.div
          className="absolute -top-5 -right-4 sm:-right-12 z-10"
          initial={{ opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8, ease: EASE }}
          style={{ x: badgeShiftX, y: badgeShiftY, transform: 'translateZ(40px)' }}
        >
          <div
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white ring-1 ring-white/20"
            style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.15), 0 12px 32px -4px rgba(0,0,0,0.25), 0 0 24px -4px rgba(255,255,255,0.04)' }}
          >
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" strokeWidth={2.5} />
            </div>
            <span className="text-[11px] font-bold text-dark/75">Interview scheduled</span>
          </div>
        </motion.div>

        {/* === FLOATING BADGE — BOTTOM LEFT === */}
        <motion.div
          className="absolute -bottom-4 -left-4 sm:-left-10 z-10"
          initial={{ opacity: 0, scale: 0.7, y: -16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8, ease: EASE }}
          style={{ x: badgeShiftX, y: badgeShiftY, transform: 'translateZ(30px)' }}
        >
          <div
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white ring-1 ring-white/20"
            style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.15), 0 12px 32px -4px rgba(0,0,0,0.25), 0 0 24px -4px rgba(255,255,255,0.04)' }}
          >
            <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center">
              <span className="text-[10px] font-bold text-accent-dark">★</span>
            </div>
            <span className="text-[11px] font-bold text-dark/75">86% placement rate</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
