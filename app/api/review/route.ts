import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // TODO: Integrate with backend service (Supabase, Airtable, etc.)
    // 1. Verify the email exists in the users table
    // 2. Store the review as "pending verification"
    // 3. Send admin notification for manual approval
    // Example:
    // const user = await supabase.from('users').select().eq('email', body.email).single()
    // if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    // await supabase.from('reviews').insert({ ...body, status: 'pending' })

    console.log('Review submission:', body)

    return NextResponse.json(
      { success: true, message: 'Review submitted for verification' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
