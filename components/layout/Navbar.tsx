'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const navBg = scrolled || !isHome
    ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-border/50'
    : 'bg-transparent'

  const linkColor = scrolled || !isHome ? 'text-dark-secondary' : 'text-white'
  const linkHover = scrolled || !isHome ? 'hover:text-primary' : 'hover:text-accent'

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          navBg
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            <Link href="/" className="flex-shrink-0 relative z-10" aria-label="Zytheq home">
              <Image
                src="/z.png"
                alt="Zytheq"
                width={40}
                height={40}
                className="w-9 h-9 sm:w-10 sm:h-10"
                priority
              />
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-[15px] font-medium transition-colors duration-200',
                    linkColor,
                    linkHover,
                    pathname === link.href && (scrolled || !isHome ? 'text-primary' : 'text-accent')
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:block">
              <Button
                variant="accent"
                size="sm"
                href="/get-started"
              >
                Get Started
              </Button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                'lg:hidden relative z-10 p-2 rounded-lg transition-colors',
                isOpen ? 'text-white' : linkColor
              )}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden bg-primary"
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 36px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 40px) 36px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 36px)' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'text-2xl font-semibold transition-colors',
                      pathname === link.href ? 'text-accent' : 'text-white hover:text-accent'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mt-4"
              >
                <Button
                  variant="accent"
                  size="lg"
                  href="/get-started"
                  className="min-w-[200px]"
                >
                  Get Started
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
