'use client'

import Hero from '@/components/home/Hero'
import ProblemSection from '@/components/home/ProblemSection'
import HowItWorks from '@/components/home/HowItWorks'
import Services from '@/components/home/Services'
import GiveBack from '@/components/home/GiveBack'
import Testimonials from '@/components/home/Testimonials'
import ForRecruiters from '@/components/home/ForRecruiters'
import Stats from '@/components/home/Stats'
import FAQ from '@/components/home/FAQ'
import HomeCTA from '@/components/home/HomeCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <Services />
      <GiveBack />
      <Testimonials />
      <ForRecruiters />
      <Stats />
      <FAQ />
      <HomeCTA />
    </>
  )
}
