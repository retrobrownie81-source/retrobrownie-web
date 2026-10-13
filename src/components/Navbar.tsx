import React from 'react';
import { Youtube, SlidersHorizontal } from 'lucide-react';
import { ChannelConfig } from '../types/retro';

interface NavbarProps {
  channelConfig: ChannelConfig;
  onOpenConfig: () => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  channelConfig,
  onOpenConfig,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#160d08]/95 backdrop-blur-md border-b-2 border-[#3f2314]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark in display face */}
        <a 
          href="#top" 
          className="flex items-center gap-2 group whitespace-nowrap shrink-0"
        >
          <span className="w-4 h-4 bg-[#f59e0b] shadow-[2px_2px_0px_#000000] inline-block"></span>
          <span className="font-pixel text-sm sm:text-base font-bold tracking-tight text-[#faf5ec] group-hover:text-[#f59e0b] transition-colors">
            retrobrownie
          </span>
          <span className="hidden sm:inline font-crt text-xs text-[#d97706] tracking-wider uppercase">
            [TV & PODCAST]
          </span>
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a
            href="#programas"
            onClick={() => onSelectCategory('programas')}
            className={`whitespace-nowrap transition-colors ${
              activeCategory === 'programas'
                ? 'text-[#f59e0b] font-semibold'
                : 'text-[#d6c7b2] hover:text-[#faf5ec]'
            }`}
          >
            Programas
          </a>
          <a
            href="#podcasts"
            onClick={() => onSelectCategory('podcasts')}
            className={`whitespace-nowrap transition-colors ${
              activeCategory === 'podcasts'
                ? 'text-[#f59e0b] font-semibold'
                : 'text-[#d6c7b2] hover:text-[#faf5ec]'
            }`}
          >
            Podcasts
          </a>
          <a
            href="#reportajes"
            onClick={() => onSelectCategory('reportajes')}
            className={`whitespace-nowrap transition-colors ${
              activeCategory === 'reportajes'
                ? 'text-[#f59e0b] font-semibold'
                : 'text-[#d6c7b2] hover:text-[#faf5ec]'
            }`}
          >
            Reportajes & Entrevistas
          </a>
          <a
            href="#cortos"
            onClick={() => onSelectCategory('cortos')}
            className={`whitespace-nowrap transition-colors ${
              activeCategory === 'cortos'
                ? 'text-[#f59e0b] font-semibold'
                : 'text-[#d6c7b2] hover:text-[#faf5ec]'
            }`}
          >
            Cápsulas
          </a>
          <button
            onClick={onOpenConfig}
            className="flex items-center gap-1.5 text-xs text-[#a89582] hover:text-[#f59e0b] whitespace-nowrap transition-colors cursor-pointer"
            title="Vincular con tu canal de YouTube"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Configurar Canal</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={channelConfig.subscribeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-button px-3.5 py-2 bg-[#d97706] hover:bg-[#b45309] text-black font-semibold text-xs flex items-center gap-2 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          >
            <Youtube className="w-4 h-4 fill-black" />
            <span className="font-bold">Suscribirse en YouTube</span>
          </a>
        </div>

      </div>
    </header>
  );
};
