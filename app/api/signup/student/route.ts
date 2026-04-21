import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { sendStudentApplicationNotification, sendWelcomeEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name, email, phone, college,
      field_of_study, graduation_year,
      learning_goals, experience_level,
      preferred_schedule, additional_notes
    } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    // Save to Supabase
    const supabase = createAdminClient()
    const { error: dbError } = await supabase
      .from('student_applications')
      .insert({
        name, email, phone: phone || '',
        college: college || '',
        field_of_study: field_of_study || '',
        graduation_year: graduation_year || '',
        learning_goals: learning_goals || '',
        experience_level: experience_level || '',
        preferred_schedule: preferred_schedule || '',
        additional_notes: additional_notes || '',
      })

    if (dbError) {
      console.error('DB error:', dbError)
      return NextResponse.json({ error: 'Failed to save application' }, { status: 500 })
    }

    // Send notification to team
    await sendStudentApplicationNotification({ name, email, college })

    // Send welcome email to student
    await sendWelcomeEmail({ name, email, role: 'student' })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Student API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
