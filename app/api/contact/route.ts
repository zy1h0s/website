import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // TODO: Integrate with backend service (Supabase, Airtable, etc.)
    // Example:
    // await supabase.from('contacts').insert(body)
    // await sendEmail({ to: 'hello@zytheq.com', subject: 'New Contact', body })

    console.log('Contact form submission:', body)

    return NextResponse.json(
      { success: true, message: 'Message received' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
