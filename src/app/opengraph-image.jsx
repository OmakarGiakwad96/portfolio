import { ImageResponse } from 'next/og';
import { profile } from '@/data/profile';

// Generated Open Graph image — no image file needed.
export const alt = profile.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#0D0E10',
          color: '#ECE9E2',
          backgroundImage:
            'linear-gradient(rgba(44,47,53,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(44,47,53,0.6) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, color: '#E8A33D', letterSpacing: 6 }}>
          ~/ {profile.role.toUpperCase()}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 92, fontWeight: 700, lineHeight: 1 }}>{profile.name}</div>
          <div style={{ display: 'flex', fontSize: 32, color: '#9A9DA3', marginTop: 28, maxWidth: 900 }}>
            Mechanical Engineer turned Software Developer · Java · .NET · APIs · Microservices
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 22, color: '#9A9DA3' }}>{profile.location}</div>
      </div>
    ),
    size,
  );
}
