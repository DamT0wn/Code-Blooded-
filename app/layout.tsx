import type { Metadata } from 'next';
import { Poppins, JetBrains_Mono, Source_Serif_4 } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const sourceSerif = Source_Serif_4({
  variable: '--font-source-serif',
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Verdant Ledger — Carbon Credit Trust & Verification Platform',
  description:
    'Verify the impact. Track the credit. Trust the carbon. A decentralized marketplace where every tonne of CO₂ carries evidence — from satellite pixel to blockchain ledger.',
  keywords: [
    'carbon credits',
    'blockchain',
    'MRV',
    'satellite verification',
    'carbon market',
    'trust',
    'ESG',
  ],
  openGraph: {
    title: 'Verdant Ledger — Carbon Credit Trust & Verification Platform',
    description: 'Evidence > Trust. Trust > Trade.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ backgroundColor: 'var(--color-bg-void)' }}>
        {/* Full-screen video background — sits at z-0 behind everything */}
        <video
          id="global-video-bg"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div id="app-root" className="flex flex-col min-h-full flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
