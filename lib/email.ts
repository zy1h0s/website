import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailOptions {
  to: string
  subject: string
  html: string
  from?: string
  replyTo?: string
}

export async function sendEmail({ to, subject, html, from, replyTo }: EmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: from || `Zytheq <contact@zytheq.com>`,
      to,
      subject,
      html,
      replyTo: replyTo,
    })

    if (error) {
      console.error('Resend email error:', error)
      return { success: false, error: error.message }
    }

    console.log('Email sent:', data?.id)
    return { success: true, messageId: data?.id }
  } catch (error) {
    console.error('Email error:', error)
    return { success: false, error: String(error) }
  }
}

// Notification to team when someone submits a job application
export async function sendJobApplicationNotification(data: { name: string; email: string; targetRoles?: string }) {
  return sendEmail({
    to: process.env.EMAIL_CANDIDATE || 'candidate@zytheq.com',
    subject: `New Job Application: ${data.name}`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
        <div style="background: linear-gradient(135deg, #0a2d66, #0e3878); padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">New Job Seeker Application</h1>
        </div>
        <div style="border: 1px solid #e8eaed; border-top: none; padding: 24px 32px; border-radius: 0 0 12px 12px;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.targetRoles ? `<p><strong>Target Roles:</strong> ${data.targetRoles}</p>` : ''}
          <p style="color: #6b7280; font-size: 14px; margin-top: 24px;">Review this application in the Supabase dashboard.</p>
        </div>
      </div>
    `,
  })
}

// Notification to team when someone submits a student application
export async function sendStudentApplicationNotification(data: { name: string; email: string; college?: string }) {
  return sendEmail({
    to: process.env.EMAIL_STUDENT || 'student@zytheq.com',
    subject: `New Student Application: ${data.name}`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
        <div style="background: linear-gradient(135deg, #0a2d66, #0e3878); padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">New Student Application</h1>
        </div>
        <div style="border: 1px solid #e8eaed; border-top: none; padding: 24px 32px; border-radius: 0 0 12px 12px;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.college ? `<p><strong>College:</strong> ${data.college}</p>` : ''}
          <p style="color: #6b7280; font-size: 14px; margin-top: 24px;">Review this application in the Supabase dashboard.</p>
        </div>
      </div>
    `,
  })
}

// Notification when someone submits the contact form
export async function sendContactNotification(data: { name: string; email: string; message: string; role?: string }) {
  return sendEmail({
    to: process.env.EMAIL_RECRUITMENT || 'recruitment@zytheq.com',
    subject: `Contact Form: ${data.name}`,
    replyTo: data.email,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
        <div style="background: linear-gradient(135deg, #0a2d66, #0e3878); padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">New Contact Message</h1>
        </div>
        <div style="border: 1px solid #e8eaed; border-top: none; padding: 24px 32px; border-radius: 0 0 12px 12px;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.role ? `<p><strong>Role:</strong> ${data.role}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p style="background: #f5f6f8; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${data.message}</p>
        </div>
      </div>
    `,
  })
}

// Welcome email to the user after signup
export async function sendWelcomeEmail(data: { name: string; email: string; role: string }) {
  let subject = ''
  let htmlContent = ''

  const baseStyles = `
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    color: #f4f4f5;
    line-height: 1.6;
    margin: 0;
    padding: 0;
  `
  
  const containerStyles = `
    max-width: 600px;
    margin: 0 auto;
    background-color: #0a0a0a;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px;
    overflow: hidden;
  `

  const headerStyles = `
    padding: 40px 40px 20px 40px;
    text-align: center;
  `

  const bodyStyles = `
    padding: 0 40px 40px 40px;
  `

  const headingStyles = `
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 28px;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 20px 0;
    letter-spacing: -0.02em;
  `

  const textStyles = `
    font-size: 15px;
    color: rgba(255,255,255,0.7);
    margin-bottom: 24px;
  `

  const buttonStyles = `
    display: inline-block;
    background-color: #feb800;
    color: #0a0a0a;
    padding: 14px 32px;
    border-radius: 999px;
    text-decoration: none;
    font-weight: 600;
    font-size: 15px;
    margin-top: 10px;
  `

  const logoHtml = `
    <div style="margin-bottom: 30px;">
      <img src="https://zytheq.com/z.png" alt="Zytheq Logo" width="48" height="48" style="display: block; margin: 0 auto;" />
    </div>
  `

  if (data.role === 'candidate') {
    subject = "Welcome to Zytheq! Let's get to work."
    htmlContent = `
      <div style="background-color: #000000; padding: 40px 20px;">
        <div style="${containerStyles}">
          <div style="${headerStyles}">
            ${logoHtml}
            <h1 style="${headingStyles}">Your job search is now on autopilot.</h1>
          </div>
          <div style="${bodyStyles}">
            <p style="${textStyles}">Welcome, <strong>${data.name}</strong>. We are thrilled to have you.</p>
            <p style="${textStyles}">You've just taken the smartest step in your career. While you spend a couple of hours a week giving back and mentoring the next generation, our team is working behind the scenes for you.</p>
            
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 24px; margin-bottom: 30px;">
              <h3 style="color: #feb800; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 16px 0;">What happens next?</h3>
              <p style="margin: 0 0 12px 0; font-size: 14px; color: rgba(255,255,255,0.8);"><strong>1. Resume Polish:</strong> We optimize your profile for ATS systems.</p>
              <p style="margin: 0 0 12px 0; font-size: 14px; color: rgba(255,255,255,0.8);"><strong>2. Applications:</strong> We apply to targeted roles on your behalf.</p>
              <p style="margin: 0; font-size: 14px; color: rgba(255,255,255,0.8);"><strong>3. Mentorship:</strong> You get matched with a student to mentor.</p>
            </div>

            <p style="${textStyles}">Head over to your dashboard to complete your onboarding so we can get started right away.</p>
            
            <div style="text-align: center;">
              <a href="https://zytheq.com/dashboard/candidate" style="${buttonStyles}">Go to Dashboard</a>
            </div>
          </div>
        </div>
      </div>
    `
  } else if (data.role === 'student') {
    subject = "Welcome to Zytheq Mentorship!"
    htmlContent = `
      <div style="background-color: #000000; padding: 40px 20px;">
        <div style="${containerStyles}">
          <div style="${headerStyles}">
            ${logoHtml}
            <h1 style="${headingStyles}">Get ready to level up your career.</h1>
          </div>
          <div style="${bodyStyles}">
            <p style="${textStyles}">Welcome, <strong>${data.name}</strong>!</p>
            <p style="${textStyles}">You have taken the first step toward landing your dream job by learning directly from industry professionals working in the US. No more outdated theory—just real-world skills that companies actually hire for.</p>
            
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 24px; margin-bottom: 30px;">
              <h3 style="color: #feb800; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 16px 0;">Your Next Steps</h3>
              <p style="margin: 0 0 12px 0; font-size: 14px; color: rgba(255,255,255,0.8);"><strong>1. Complete Profile:</strong> Tell us what you want to learn.</p>
              <p style="margin: 0 0 12px 0; font-size: 14px; color: rgba(255,255,255,0.8);"><strong>2. Get Matched:</strong> We connect you with a US-based mentor.</p>
              <p style="margin: 0; font-size: 14px; color: rgba(255,255,255,0.8);"><strong>3. Learn & Grow:</strong> Join your 1-on-1 sessions and build your skills.</p>
            </div>

            <p style="${textStyles}">Head over to your dashboard to complete your skills profile so we can match you with the perfect mentor.</p>
            
            <div style="text-align: center;">
              <a href="https://zytheq.com/dashboard/student" style="${buttonStyles}">Complete Profile</a>
            </div>
          </div>
        </div>
      </div>
    `
  } else {
    // Recruiter
    subject = "Access top-tier candidates on Zytheq"
    htmlContent = `
      <div style="background-color: #000000; padding: 40px 20px;">
        <div style="${containerStyles}">
          <div style="${headerStyles}">
            ${logoHtml}
            <h1 style="${headingStyles}">Better candidates. Zero fluff.</h1>
          </div>
          <div style="${bodyStyles}">
            <p style="${textStyles}">Welcome, <strong>${data.name}</strong>.</p>
            <p style="${textStyles}">We are excited to partner with you. Finding great talent is hard, but Zytheq makes it effortless by giving you direct access to highly vetted candidates who are actively giving back through mentorship.</p>
            
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 24px; margin-bottom: 30px;">
              <h3 style="color: #feb800; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 16px 0;">Why Zytheq Candidates?</h3>
              <p style="margin: 0 0 12px 0; font-size: 14px; color: rgba(255,255,255,0.8);">✔ Pre-vetted, high-performing professionals.</p>
              <p style="margin: 0 0 12px 0; font-size: 14px; color: rgba(255,255,255,0.8);">✔ Leadership traits proven through active student mentorship.</p>
              <p style="margin: 0; font-size: 14px; color: rgba(255,255,255,0.8);">✔ Direct access without the usual recruiting agency fees.</p>
            </div>

            <p style="${textStyles}">Jump into your dashboard to view our curated candidate pipeline and start reaching out to your next great hire.</p>
            
            <div style="text-align: center;">
              <a href="https://zytheq.com/dashboard/recruiter" style="${buttonStyles}">View Pipeline</a>
            </div>
          </div>
        </div>
      </div>
    `
  }

  return sendEmail({
    to: data.email,
    subject: subject,
    html: htmlContent,
  })
}
