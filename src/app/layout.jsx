import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from 'next/font/google';
import Providers from '@/components/Providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { profile } from '@/data/profile';
import './globals.css';

// Display: Bricolage Grotesque (characterful headings) · Body: Instrument Sans · Accents: JetBrains Mono
const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const sans = Instrument_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: profile.seo.title,
  description: profile.seo.description,
  authors: [{ name: profile.name }],
  keywords: ['Omkar Sanjay Gaikwad', 'software developer', 'Java', 'Spring Boot', '.NET', 'REST APIs', 'microservices', 'portfolio'],
  openGraph: {
    type: 'website',
    url: '/',
    title: profile.seo.title,
    description: profile.seo.description,
    siteName: `${profile.name} — Portfolio`,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: profile.seo.title,
    description: profile.seo.description,
  },
  // Favicon: src/app/icon.svg (placeholder) · OG image: src/app/opengraph-image.jsx
};

export const viewport = {
  themeColor: '#0D0E10',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        {/* Background layers: static drafting grid + amber grid revealed around the cursor */}
        <div aria-hidden="true" className="page-grid pointer-events-none fixed inset-0 z-0" />
        <div aria-hidden="true" className="grid-reveal pointer-events-none fixed inset-0 z-0" />

        <Providers>
          <Navbar />
          <main id="main" tabIndex={-1} className="relative z-[1]">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
