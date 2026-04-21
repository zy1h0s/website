'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MobileGate() {
  const [bypassed, setBypassed] = useState(true) // Default true to avoid flash on desktop
  const [showMore, setShowMore] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Only run on client
    const hasBypassed = sessionStorage.getItem('mobile_bypassed') === 'true'
    
    const checkSize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile && !hasBypassed) {
        setBypassed(false)
      } else {
        setBypassed(true)
      }
    }

    checkSize()
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [])

  if (bypassed || !isMobile) return null

  return (
    <div className="fixed inset-0 z-[999999] bg-[#0A0A0A] flex flex-col items-center justify-center p-8 text-center sm:hidden lg:hidden" style={{ display: 'flex' }}>
      <div className="flex-1 flex flex-col justify-center max-w-[320px] mx-auto w-full">
        <h2 className="text-[1.5rem] font-display font-semibold text-white tracking-[-0.02em] leading-[1.2] mb-4">
          Open in PC for better experience
        </h2>
        <p className="text-[14px] text-white/40 leading-[1.6]">
          We have intentionally designed Zytheq for desktop viewing to showcase our platform and dashboards at their highest quality.
        </p>
      </div>

      <div className="mt-auto mb-6 w-full flex flex-col items-center min-h-[50px] justify-end">
        <AnimatePresence mode="wait">
          {!showMore ? (
            <motion.button 
              key="more-btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMore(true)} 
              className="text-[12px] font-medium text-white/20 hover:text-white/40 transition-colors pb-6 pt-4"
            >
              more
            </motion.button>
          ) : (
            <motion.button 
              key="bypass-btn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setBypassed(true)
                sessionStorage.setItem('mobile_bypassed', 'true')
              }} 
              className="text-[13px] font-semibold tracking-wide uppercase text-white/60 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white py-3 px-8 rounded-full transition-all ring-1 ring-white/5 pb-3 mb-4"
            >
              View anyway
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
