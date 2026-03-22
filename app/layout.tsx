import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vincenzo Ceccarelli Grimaldi | AI-Native Energy Infrastructure',
  description: 'RWTH Aachen Engineer • NeuralBridge • GridOS • DERIM | Strategic AI Infrastructure Consulting',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-zinc-950 text-zinc-100 antialiased">
        {/* === PROFESSIONAL STICKY NAVBAR (Amazon/Facebook quality — no CTA) === */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <a href="#" className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                  <span className="text-white font-black text-3xl tracking-tighter">V</span>
                </div>
                <span className="font-semibold text-2xl tracking-tighter">Vincenzo Grimaldi</span>
              </a>

              {/* Desktop Navigation — smooth scroll links */}
              <div className="hidden md:flex items-center gap-10 text-sm font-medium">
                <a href="#about" className="nav-link text-zinc-300 hover:text-white">About</a>
                <a href="#strengths" className="nav-link text-zinc-300 hover:text-white">Core Strengths</a>
                <a href="#initiatives" className="nav-link text-zinc-300 hover:text-white">Flagship Initiatives</a>
                <a href="#phd" className="nav-link text-zinc-300 hover:text-white">PhD Resources</a>
                <a href="#inspiration" className="nav-link text-zinc-300 hover:text-white">Inspiration</a>
              </div>

              {/* Empty space — CTA button fully removed */}
              <div className="w-40"></div>
            </div>
          </div>
        </nav>

        {children}

        {/* === PROFESSIONAL FOOTER (unchanged) === */}
        <footer className="bg-zinc-950 border-t border-zinc-800 pt-20 pb-12 mt-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                    <span className="text-white font-black text-2xl">V</span>
                  </div>
                  <span className="font-semibold text-xl">Vincenzo Grimaldi</span>
                </div>
                <p className="text-zinc-400 max-w-xs">Architect of intelligent energy systems for the AI era.</p>
              </div>

              <div>
                <h4 className="font-semibold mb-6 text-zinc-300">Quick Navigation</h4>
                <div className="space-y-3 text-sm text-zinc-400">
                  <a href="#about" className="block hover:text-cyan-400 transition-colors">About Me</a>
                  <a href="#initiatives" className="block hover:text-cyan-400 transition-colors">Flagship Projects</a>
                  <a href="#phd" className="block hover:text-cyan-400 transition-colors">PhD Resources</a>
                  <a href="#inspiration" className="block hover:text-cyan-400 transition-colors">Inspiration Sources</a>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-6 text-zinc-300">Connect</h4>
                <p className="text-zinc-400 mb-8">
                  vincenzo@grimaldi.engineering<br />
                  RWTH Aachen University Alumnus
                </p>
                <a href="https://github.com/iceccarelli" target="_blank" className="text-3xl hover:text-cyan-400 transition-colors">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>

            <div className="mt-20 pt-8 border-t border-zinc-800 text-center text-xs text-zinc-500">
              © {new Date().getFullYear()} Vincenzo Ceccarelli Grimaldi. All Rights Reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
