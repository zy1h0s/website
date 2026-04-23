'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="min-h-screen relative flex flex-col gradient-mesh overflow-hidden">
        {/* Orbs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="orb orb-primary w-[500px] h-[500px] top-[-15%] right-[-10%]" />
          <div className="orb orb-accent w-[400px] h-[400px] bottom-[5%] left-[-15%]" />
          <div className="orb orb-purple w-[350px] h-[350px] top-[50%] right-[30%]" />
        </div>
        <div className="grain absolute inset-0 pointer-events-none" />

        {/* Minimal header */}
        <header className="relative z-10 px-6 sm:px-10 py-5">
          <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Zytheq home">
            <Image src="/z.png" alt="Zytheq" width={36} height={36} className="w-9 h-9" priority />
            <span className="text-white font-semibold text-[15px] tracking-[-0.02em]">Zytheq</span>
          </Link>
        </header>

        {/* Content */}
        <main className="relative z-10 flex-1 flex items-center justify-center px-5 py-8 sm:py-12">
          {children}
        </main>

        {/* Footer */}
        <footer className="relative z-10 text-center py-5">
          <p className="text-[12px] text-white/20">© 2026 Zytheq. All rights reserved.</p>
        </footer>
      </div>
  )
}
