import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vincenzo Ceccarelli Grimaldi | Intelligent Energy Systems',
  description: 'Architect of AI-Driven Digital Twins, Agentic Middleware and Next-Generation Smart Grids | RWTH Aachen University',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
