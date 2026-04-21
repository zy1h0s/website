import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { sendJobApplicationNotification, sendWelcomeEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name, email, phone, linkedin_url,
      current_title, years_experience, target_roles,
      preferred_locations, salary_range, availability,
      additional_notes
    } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    // Save to Supabase
    const supabase = createAdminClient()
    const { error: dbError } = await supabase
      .from('job_applications')
      .insert({
        name, email, phone: phone || '',
        linkedin_url: linkedin_url || '',
        current_title: current_title || '',
        years_experience: years_experience || '',
        target_roles: target_roles || '',
        preferred_locations: preferred_locations || '',
        salary_range: salary_range || '',
        availability: availability || '',
        additional_notes: additional_notes || '',
      })

    if (dbError) {
      console.error('DB error:', dbError)
      return NextResponse.json({ error: 'Failed to save application' }, { status: 500 })
    }

    // Send notification to team
    await sendJobApplicationNotification({ name, email, targetRoles: target_roles })

    // Send welcome email to applicant
    await sendWelcomeEmail({ name, email, role: 'candidate' })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Job seeker API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
