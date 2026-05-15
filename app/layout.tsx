import { Cormorant_Garamond, Inter } from 'next/font/google';
import '../styles/globals.css';
import '../styles/tokens.css';

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
      </head>
      <body className="bg-black text-text-primary font-body antialiased min-h-screen">
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
