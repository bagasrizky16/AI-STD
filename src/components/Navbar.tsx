import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onQuickBook: () => void;
}

const NAV_LINKS = [
  { href: '#destinasi', label: 'Destinasi' },
  { href: '#paket', label: 'Paket' },
  { href: '#galeri', label: 'Galeri' },
  { href: '#lokasi', label: 'Lokasi' },
];

export function Navbar({ onQuickBook }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF7]/95 backdrop-blur-md border-b border-[#1B4332]/10">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10 h-[52px] md:h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#beranda"
          className="text-lg md:text-xl font-extrabold tracking-tight text-[#1B4332] whitespace-nowrap shrink-0"
        >
          Lereng Asri
        </a>

        {/* Zone 2: Concise Single-Line Navigation Links */}
        <nav aria-label="Navigasi Utama" className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] font-semibold text-[#263228] hover:text-[#1B4332] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 py-2"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onQuickBook}
            className="hidden md:inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-[15px] font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Pesan Wisata
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={menuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            className="md:hidden inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-lg text-[#1B4332] hover:bg-[#E9F7E8] transition-colors cursor-pointer"
          >
            {menuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label="Menu Seluler"
          className="md:hidden bg-white border-b border-[#1B4332]/15 px-4 py-3 shadow-[0_6px_16px_-2px_rgba(45,106,79,0.12)]"
        >
          <ul className="flex flex-col divide-y divide-[#1B4332]/10">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleNavClick}
                  className="flex items-center justify-between min-h-[48px] text-[16px] font-semibold text-[#131E15] hover:text-[#2D6A4F]"
                >
                  <span>{link.label}</span>
                  <span className="text-sm text-[#414844]" aria-hidden="true">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="pt-3 mt-1 border-t border-[#1B4332]/10">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onQuickBook();
              }}
              className="w-full min-h-[48px] flex items-center justify-center bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-[15px] font-bold rounded-lg transition-colors cursor-pointer"
            >
              Pesan Paket Wisata
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
