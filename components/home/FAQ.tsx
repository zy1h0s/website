'use client'

import Accordion from '@/components/ui/Accordion'
import SectionHeading from '@/components/ui/SectionHeading'
import { FAQ_DATA } from '@/lib/constants'

export default function FAQ() {
  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Questions you probably have"
          subtitle="Straight answers. No jargon."
        />
        <Accordion items={FAQ_DATA} />
      </div>
    </section>
  )
}
