import { Cormorant_Garamond, Inter } from 'next/font/google';
import '../styles/globals.css';
import '../styles/tokens.css';
import ScrollProgress from '@/components/utility/ScrollProgress';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${cormorantGaramond.variable} ${inter.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Luminary Booth Co.",
              "description": "Luxury photo booth rental in Los Angeles",
              "url": "https://luminaryboothco.com",
              "areaServed": "Los Angeles, CA",
              "priceRange": "$$$",
              "serviceType": "Photo Booth Rental"
            })
          }}
        />
      </head>
      <body className="bg-black-green text-text-primary font-body antialiased min-h-screen">
        <ScrollProgress />
        <svg
          aria-hidden="true"
          className="grain-overlay"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="grain-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-filter)" opacity="1" />
        </svg>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
