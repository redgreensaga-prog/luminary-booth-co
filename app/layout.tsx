import '../styles/globals.css';
import '../styles/tokens.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-black text-text-primary font-body antialiased min-h-screen">
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}