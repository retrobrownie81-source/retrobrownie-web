import React from 'react';
import { Youtube, ExternalLink, Headphones, Radio, Tv } from 'lucide-react';
import { ChannelConfig } from '../types/retro';

interface FooterProps {
  channelConfig: ChannelConfig;
  onOpenConfig: () => void;
}

export const Footer: React.FC<FooterProps> = ({ channelConfig, onOpenConfig }) => {
  return (
    <footer className="bg-[#100804] border-t-2 border-[#3f2314] text-[#a89582] text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3.5 h-3.5 bg-[#f59e0b] shadow-[2px_2px_0px_#000000]"></span>
              <span className="font-pixel text-sm text-[#faf5ec]">
                retrobrownie
              </span>
            </div>
            <p className="text-xs text-[#9a8570] leading-relaxed mb-4">
              Canal temático dedicado a la divulgación, análisis y nostalgia del videojuego clásico y el cine de los años 80 y 90.
            </p>
            <a
              href={channelConfig.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f59e0b] hover:underline"
            >
              <Youtube className="w-3.5 h-3.5 fill-[#f59e0b]" />
              <span>Visitar {channelConfig.channelHandle}</span>
            </a>
          </div>

          {/* Navigation Mirrors */}
          <div>
            <h4 className="font-crt text-sm text-[#faf5ec] uppercase tracking-wider mb-3">
              Apartados
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href={channelConfig.programasPlaylistUrl || "https://youtube.com/playlist?list=PL2JvMGcuPgPGDfVPm3ZOUix_j2mPaNTkt&si=gtORTUw2duFOOShw"}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#f59e0b] transition-colors flex items-center gap-1"
                  title="Abrir Playlist de Programas Completos / Retroanálisis en YouTube"
                >
                  <span>Programas Completos (Playlist)</span>
                  <ExternalLink className="w-2.5 h-2.5 text-[#f59e0b]" />
                </a>
              </li>
              <li>
                <a href="#podcasts" className="hover:text-[#faf5ec] transition-colors">
                  BrownieCast (Podcasts)
                </a>
              </li>
              <li>
                <a href="#reportajes" className="hover:text-[#faf5ec] transition-colors">
                  Reportajes & Entrevistas
                </a>
              </li>
              <li>
                <a 
                  href={channelConfig.capsulasPlaylistUrl || "https://youtube.com/playlist?list=PL2JvMGcuPgPGulAUgDB9bZD1RDX-8Ud22&si=9g4nyiPs_mczDcJ0"}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#38bdf8] transition-colors flex items-center gap-1"
                  title="Abrir Playlist de Cápsulas / Brownie Bites en YouTube"
                >
                  <span>Cápsulas / Brownie Bites (Playlist)</span>
                  <ExternalLink className="w-2.5 h-2.5 text-[#38bdf8]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h4 className="font-crt text-sm text-[#faf5ec] uppercase tracking-wider mb-3">
              Plataformas de Emisión
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href={channelConfig.channelUrl}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 hover:text-[#faf5ec] transition-colors"
                >
                  <Youtube className="w-3 h-3 text-[#ef4444]" />
                  <span>YouTube ({channelConfig.channelHandle})</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://open.spotify.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 hover:text-[#faf5ec] transition-colors"
                >
                  <Headphones className="w-3 h-3 text-[#10b981]" />
                  <span>Spotify Podcast</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://podcasts.apple.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 hover:text-[#faf5ec] transition-colors"
                >
                  <Radio className="w-3 h-3 text-[#a855f7]" />
                  <span>Apple Podcasts</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.ivoox.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 hover:text-[#faf5ec] transition-colors"
                >
                  <Radio className="w-3 h-3 text-[#f97316]" />
                  <span>iVoox Audio</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Linking Setup */}
          <div>
            <h4 className="font-crt text-sm text-[#faf5ec] uppercase tracking-wider mb-3">
              Administración
            </h4>
            <p className="text-xs text-[#9a8570] leading-relaxed mb-3">
              ¿Quieres enlazar nuevos vídeos o personalizar la URL de YouTube de tu canal?
            </p>
            <button
              onClick={onOpenConfig}
              className="pixel-button px-3 py-1.5 bg-[#25150c] hover:bg-[#341d10] text-[#faf5ec] text-xs font-medium cursor-pointer"
            >
              Configurar Enlaces de YouTube
            </button>
          </div>

        </div>

        {/* Bottom line */}
        <div className="pt-6 border-t border-[#24140b] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#7d6753]">
          <div>
            © {new Date().getFullYear()} retrobrownie. Canal dedicado a la preservación del videojuego y cine clásico de los 80s y 90s.
          </div>
          <div className="flex items-center gap-4">
            <span>Pixel Art & Chiptune Mood</span>
            <span aria-hidden="true">·</span>
            <span>Sonido Estéreo 16-Bit</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
