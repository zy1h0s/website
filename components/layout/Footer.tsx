import Link from 'next/link'
import Image from 'next/image'
import { Globe, Share2, ExternalLink } from 'lucide-react'

const footerLinks = {
  Platform: [
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'For Job Seekers', href: '/get-started' },
    { label: 'For Students', href: '/join-as-student' },
    { label: 'Reviews', href: '/reviews' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

const socialLinks = [
  { icon: Globe, label: 'LinkedIn', href: '#' },
  { icon: Share2, label: 'X (Twitter)', href: '#' },
  { icon: ExternalLink, label: 'Instagram', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-dark text-white" role="contentinfo">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/z.png"
                  alt="Zytheq"
                  width={36}
                  height={36}
                  className="w-9 h-9"
                />
                <span className="text-xl font-bold tracking-tight">Zytheq</span>
              </div>
              <p className="text-white/50 text-sm max-w-xs leading-relaxed mb-6">
                Do great in this competitive market.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-accent hover:text-dark transition-all duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">
                  {title}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-white/60 hover:text-accent transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            &copy; 2025 Zytheq. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Built with purpose.
          </p>
        </div>
      </div>
    </footer>
  )
}
