import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, // port 465 = SSL
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

interface EmailOptions {
  to: string
  subject: string
  html: string
  from?: string
  replyTo?: string
}

export async function sendEmail({ to, subject, html, from, replyTo }: EmailOptions) {
  try {
    const result = await transporter.sendMail({
      from: from || `"Zytheq" <${process.env.EMAIL_CANDIDATE}>`,
      to,
      subject,
      html,
      replyTo,
    })
    console.log('Email sent:', result.messageId)
    return { success: true, messageId: result.messageId }
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
  const roleMessages: Record<string, string> = {
    candidate: 'Our team will start working on your resume and job applications right away.',
    student: 'We will match you with a mentor shortly. Get ready to learn real-world skills!',
    recruiter: 'We will reach out with details about our candidate pipeline.',
  }

  return sendEmail({
    to: data.email,
    subject: `Welcome to Zytheq, ${data.name}!`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
        <div style="background: linear-gradient(135deg, #0a2d66, #0e3878); padding: 32px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Welcome to Zytheq!</h1>
          <p style="color: rgba(255,255,255,0.5); margin: 8px 0 0 0; font-size: 14px;">You are all set, ${data.name}.</p>
        </div>
        <div style="border: 1px solid #e8eaed; border-top: none; padding: 32px; border-radius: 0 0 12px 12px;">
          <p style="font-size: 16px; color: #0a0a0a;">${roleMessages[data.role] || 'Welcome aboard!'}</p>
          <p style="color: #6b7280; font-size: 14px; margin-top: 16px;">If you have any questions, reply to this email or reach us at contact@zytheq.com.</p>
          <div style="margin-top: 24px; text-align: center;">
            <a href="https://zytheq.com/login" style="display: inline-block; background: #feb800; color: #0a0a0a; padding: 12px 32px; border-radius: 999px; text-decoration: none; font-weight: 600; font-size: 14px;">Go to Dashboard</a>
          </div>
        </div>
      </div>
    `,
  })
}
