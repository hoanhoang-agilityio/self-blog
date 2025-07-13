import './globals.css';

import { Providers } from './providers';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="p-20">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
