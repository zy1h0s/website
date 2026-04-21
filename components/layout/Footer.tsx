'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const footerColumns = [
  {
    title: 'Platform',
    links: [
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'For Job Seekers', href: '/get-started' },
      { label: 'For Students', href: '/join-as-student' },
      { label: 'Reviews', href: '/reviews' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'LinkedIn', href: '#', external: true },
      { label: 'X / Twitter', href: '#', external: true },
      { label: 'Instagram', href: '#', external: true },
      { label: 'hello@zytheq.com', href: 'mailto:hello@zytheq.com' },
    ],
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-dark text-white overflow-hidden" role="contentinfo">
      {/* Top accent line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
        {/* Main footer */}
        <div className="pt-20 pb-16 lg:pt-24 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand column */}
            <motion.div
              className="lg:col-span-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <Image src="/z.png" alt="Zytheq" width={32} height={32} className="w-8 h-8" />
                <span className="text-lg font-semibold tracking-[-0.02em]">Zytheq</span>
              </div>
              <p className="text-white/35 text-[15px] leading-relaxed max-w-xs mb-8">
                Do great in this competitive market. We handle the search. You change a life.
              </p>
              <Link
                href="/get-started"
                className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:gap-3 transition-all duration-300 animated-underline"
              >
                Start your journey <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

            {/* Link columns — 2-col on mobile, 3-col on sm, inline on lg */}
            <div className="lg:col-span-6 lg:col-start-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
              {footerColumns.map((col, i) => (
                <motion.div
                  key={col.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
                >
                  <h3 className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/25 mb-5">
                    {col.title}
                  </h3>
                  <ul className="space-y-3">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        {'external' in link && link.external ? (
                          <a
                            href={link.href}
                            className="inline-flex items-center gap-1 text-white/50 hover:text-accent transition-colors text-[14px]"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.label}
                          >
                            {link.label}
                            <ArrowUpRight className="w-3 h-3 opacity-50" />
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-white/50 hover:text-accent transition-colors text-[14px]"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-[13px]">
            &copy; {currentYear} Zytheq. All rights reserved.
          </p>
          <p className="text-white/15 text-[12px] tracking-[0.05em] uppercase">
            Built with purpose
          </p>
        </div>
      </div>
    </footer>
  )
}
