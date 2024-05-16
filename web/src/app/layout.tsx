// src/app/layout.tsx
import './globals.css';
import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav>
          <ul>
            <li>
              <Link href="/home">Home</Link>
            </li>
            <li>
              <Link href="/order-book">Order Book</Link>
            </li>
            <li>
              <Link href="/random-orders">Random Orders</Link>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
