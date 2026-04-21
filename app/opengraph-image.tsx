import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Zytheq - We run your job search while you mentor the next generation'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a2d66 0%, #0e3878 30%, #1a1145 60%, #0d1f4a 100%)',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Background orbs */}
        <div style={{
          position: 'absolute', top: '-50px', right: '-50px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26,91,196,0.3), transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-30px', left: '-30px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(254,184,0,0.15), transparent 70%)',
        }} />

        {/* Logo circle */}
        <div style={{
          width: '80px', height: '80px', borderRadius: '20px',
          background: 'rgba(254, 184, 0, 0.1)',
          border: '1px solid rgba(254, 184, 0, 0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '32px',
        }}>
          <span style={{ fontSize: '40px', fontWeight: 700, color: '#feb800' }}>Z</span>
        </div>

        {/* Title */}
        <div style={{
          fontSize: '64px', fontWeight: 700, color: 'white',
          textAlign: 'center', letterSpacing: '-0.04em', lineHeight: 1.1,
          marginBottom: '16px',
        }}>
          Zytheq
        </div>

        {/* Subtitle */}
        <div style={{
          fontSize: '24px', color: 'rgba(255,255,255,0.4)',
          textAlign: 'center', maxWidth: '600px', lineHeight: 1.5,
        }}>
          We run your job search. You change a student&apos;s life.
        </div>

        {/* Bottom accent line */}
        <div style={{
          position: 'absolute', bottom: '40px',
          width: '80px', height: '3px', borderRadius: '2px',
          background: 'linear-gradient(90deg, #feb800, #ffa726)',
        }} />
      </div>
    ),
    { ...size }
  )
}
