'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'shadow-[0_2px_20px_rgba(0,0,0,0.15)]'
            : ''
        )}
        style={{ background: 'linear-gradient(135deg, #0a2d66 0%, #0e3878 50%, #0d1f4a 100%)' }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-[68px] sm:h-[76px]">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 relative z-10 flex items-center gap-2.5" aria-label="Zytheq home">
              <Image
                src="/z.png"
                alt="Zytheq"
                width={48}
                height={48}
                className="w-11 h-11 sm:w-12 sm:h-12"
                priority
              />
              <span className="font-semibold text-[15px] tracking-[-0.02em] hidden sm:block text-white">
                Zytheq
              </span>
            </Link>

            {/* Desktop nav - centered */}
            <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {NAV_LINKS.map((link) => {
                const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'relative px-4 py-2 text-[14px] font-medium tracking-[-0.01em] transition-colors duration-200 rounded-full',
                      isActive ? 'text-accent bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                        layoutId="nav-indicator"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3 relative z-10">
              <Link
                href="/login"
                className="px-4 py-2 text-[14px] font-medium rounded-full transition-colors duration-200 text-white/60 hover:text-white hover:bg-white/[0.06]"
              >
                Login
              </Link>
              <Button
                variant="accent"
                size="sm"
                href="/get-started"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                'lg:hidden relative z-[60] w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-full transition-colors',
                isOpen ? 'bg-white/10' : 'bg-white/10'
              )}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <span className={cn(
                'w-5 h-[1.5px] rounded-full transition-all duration-300 bg-white',
                isOpen && 'rotate-45 translate-y-[3.25px]'
              )} />
              <span className={cn(
                'w-5 h-[1.5px] rounded-full transition-all duration-300 bg-white',
                isOpen && '-rotate-45 -translate-y-[3.25px]'
              )} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu - full takeover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 gradient-mesh"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              style={{ transformOrigin: 'top' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="relative flex flex-col justify-between min-h-screen px-8 pt-28 pb-12">
              <div className="space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'block py-3 text-[2rem] font-display font-semibold tracking-[-0.03em] transition-colors',
                        (link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)) ? 'text-accent' : 'text-white/70 hover:text-white'
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="space-y-3"
              >
                <Button variant="ghost" size="lg" href="/login" fullWidth className="text-white/70 hover:text-white ring-1 ring-white/10">
                  Login
                </Button>
                <Button variant="accent" size="lg" href="/get-started" fullWidth icon={<ArrowRight className="w-4 h-4" />}>
                  Get Started
                </Button>
                <p className="text-white/25 text-[13px] text-center pt-2">hello@zytheq.com</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
