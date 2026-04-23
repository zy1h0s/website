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

  // Extremely email-safe, clean typography stack
  const baseStyles = `
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    color: #e4e4e7;
    line-height: 1.6;
    margin: 0;
    padding: 0;
  `
  
  const containerStyles = `
    max-width: 580px;
    margin: 0 auto;
    background-color: #0a0a0a;
    border: 1px solid #27272a;
    border-radius: 12px;
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
    font-size: 24px;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 20px 0;
    letter-spacing: -0.01em;
  `

  const textStyles = `
    font-size: 15px;
    color: #a1a1aa;
    margin-bottom: 20px;
    line-height: 1.6;
  `

  const buttonStyles = `
    display: inline-block;
    background-color: #feb800;
    color: #0a0a0a;
    padding: 12px 28px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    font-size: 15px;
    margin-top: 16px;
  `

  // Text-based logo to completely avoid the "?" broken image issue in email clients
  const logoHtml = `
    <div style="margin-bottom: 32px;">
      <span style="font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">Zytheq</span><span style="color: #feb800; font-size: 24px; font-weight: 700;">.</span>
    </div>
  `

  if (data.role === 'candidate') {
    subject = "Welcome to Zytheq! We are thrilled to have you."
    htmlContent = `
      <div style="background-color: #000000; padding: 40px 20px; ${baseStyles}">
        <div style="${containerStyles}">
          <div style="${headerStyles}">
            ${logoHtml}
            <h1 style="${headingStyles}">Welcome to the community!</h1>
          </div>
          <div style="${bodyStyles}">
            <p style="${textStyles}">Hi <strong>${data.name}</strong>,</p>
            <p style="${textStyles}">We are so excited to have you on board.</p>
            <p style="${textStyles}">We know firsthand how exhausting and isolating the job search can be. That's exactly why we built Zytheq—to take the heavy lifting off your plate so you can focus on what actually matters.</p>
            <p style="${textStyles}">While our team gets to work reviewing your profile and searching for your perfect role, you'll be giving back by mentoring a student who is eager to learn from your experience. It's a true win-win.</p>
            <p style="${textStyles}">We'll be in touch soon with your first mentorship match and an update on your job applications. In the meantime, head over to your dashboard to complete your onboarding!</p>
            
            <div style="text-align: center; margin-top: 10px;">
              <a href="https://zytheq.com/dashboard/candidate" style="${buttonStyles}">Go to Dashboard</a>
            </div>
          </div>
        </div>
      </div>
    `
  } else if (data.role === 'student') {
    subject = "Welcome to Zytheq Mentorship!"
    htmlContent = `
      <div style="background-color: #000000; padding: 40px 20px; ${baseStyles}">
        <div style="${containerStyles}">
          <div style="${headerStyles}">
            ${logoHtml}
            <h1 style="${headingStyles}">Welcome to the community!</h1>
          </div>
          <div style="${bodyStyles}">
            <p style="${textStyles}">Hi <strong>${data.name}</strong>,</p>
            <p style="${textStyles}">We are absolutely thrilled to welcome you to Zytheq.</p>
            <p style="${textStyles}">Learning the skills you need to land your dream job shouldn't be a mystery. We're here to connect you directly with experienced professionals in the US who genuinely want to help you succeed.</p>
            <p style="${textStyles}">Through 1-on-1 mentorship sessions, you'll gain real-world insights, practice your skills, and build the confidence you need to launch your career.</p>
            <p style="${textStyles}">To get started, head over to your dashboard and complete your skills profile so we can match you with the perfect mentor!</p>
            
            <div style="text-align: center; margin-top: 10px;">
              <a href="https://zytheq.com/dashboard/student" style="${buttonStyles}">Complete Profile</a>
            </div>
          </div>
        </div>
      </div>
    `
  } else {
    // Recruiter
    subject = "Welcome to Zytheq! Let's find your next great hire."
    htmlContent = `
      <div style="background-color: #000000; padding: 40px 20px; ${baseStyles}">
        <div style="${containerStyles}">
          <div style="${headerStyles}">
            ${logoHtml}
            <h1 style="${headingStyles}">Welcome to Zytheq!</h1>
          </div>
          <div style="${bodyStyles}">
            <p style="${textStyles}">Hi <strong>${data.name}</strong>,</p>
            <p style="${textStyles}">We are absolutely delighted to partner with you.</p>
            <p style="${textStyles}">Finding top-tier talent shouldn't be a headache, and it certainly shouldn't cost a fortune in agency fees. We created Zytheq to give you direct access to pre-vetted, high-performing candidates who are actively demonstrating their leadership by mentoring the next generation.</p>
            <p style="${textStyles}">We've curated a talent pipeline specifically tailored for your needs. Head over to your dashboard to start exploring, and please reach out if there's anything we can do to help you find your next great hire!</p>
            
            <div style="text-align: center; margin-top: 10px;">
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
