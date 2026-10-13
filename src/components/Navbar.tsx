import React, { useState } from 'react';
import { Youtube, SlidersHorizontal, Menu, X } from 'lucide-react';
import { ChannelConfig } from '../types/retro';

interface NavbarProps {
  channelConfig: ChannelConfig;
  onOpenConfig: () => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

const NAV_LINKS = [
  { id: 'programas', label: 'Programas', href: '#programas' },
  { id: 'podcasts', label: 'Podcasts', href: '#podcasts' },
  { id: 'reportajes', label: 'Reportajes & Entrevistas', href: '#reportajes' },
  { id: 'cortos', label: 'Cápsulas', href: '#cortos' },
];

export const Navbar: React.FC<NavbarProps> = ({
  channelConfig,
  onOpenConfig,
  activeCategory,
  onSelectCategory,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkClass = (id: string, mobile: boolean) =>
    `whitespace-nowrap transition-colors ${
      mobile ? 'block py-3 px-2 text-base border-b border-[#2b180d]' : ''
    } ${
      activeCategory === id
        ? 'text-[#f59e0b] font-semibold'
        : 'text-[#d6c7b2] hover:text-[#faf5ec]'
    }`;

  const handleNavClick = (id: string) => {
    onSelectCategory(id);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#160d08]/95 backdrop-blur-md border-b-2 border-[#3f2314]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 lg:gap-8">

        {/* Logo / wordmark */}
        <a
          href="#top"
          className="flex items-center gap-2 group whitespace-nowrap shrink-0"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="w-4 h-4 bg-[#f59e0b] shadow-[2px_2px_0px_#000000] inline-block" aria-hidden="true"></span>
          <span className="font-pixel text-sm sm:text-base font-bold tracking-tight text-[#faf5ec] group-hover:text-[#f59e0b] transition-colors">
            retrobrownie
          </span>
          <span className="hidden sm:inline font-crt text-xs text-[#d97706] tracking-wider uppercase">
            [TV & PODCAST]
          </span>
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Principal" className="hidden md:flex items-center gap-6 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => handleNavClick(link.id)}
              aria-current={activeCategory === link.id ? 'page' : undefined}
              className={linkClass(link.id, false)}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={onOpenConfig}
            className="flex items-center gap-1.5 text-xs text-[#a89582] hover:text-[#f59e0b] whitespace-nowrap transition-colors cursor-pointer"
            title="Vincular con tu canal de YouTube"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Configurar Canal</span>
          </button>
        </nav>

        {/* Primary action + mobile menu toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={channelConfig.subscribeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-button px-3 sm:px-3.5 py-2 bg-[#d97706] hover:bg-[#b45309] text-black font-semibold text-xs flex items-center gap-2 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          >
            <Youtube className="w-4 h-4 fill-black" aria-hidden="true" />
            <span className="font-bold hidden sm:inline">Suscribirse en YouTube</span>
            <span className="font-bold sm:hidden">Suscribirse</span>
          </a>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="md:hidden p-2 border-2 border-[#3f2314] bg-[#25150c] text-[#faf5ec] cursor-pointer"
          >
            {isMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {isMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Principal móvil"
          className="md:hidden border-t-2 border-[#3f2314] bg-[#160d08] px-4 pb-4"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => handleNavClick(link.id)}
              aria-current={activeCategory === link.id ? 'page' : undefined}
              className={linkClass(link.id, true)}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setIsMenuOpen(false);
              onOpenConfig();
            }}
            className="flex items-center gap-2 w-full py-3 px-2 text-sm text-[#a89582] hover:text-[#f59e0b] transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
            <span>Configurar Canal</span>
          </button>
        </nav>
      )}
    </header>
  );
};
