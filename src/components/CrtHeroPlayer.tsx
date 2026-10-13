import React, { useState } from 'react';
import { Play, ExternalLink, Tv, Volume2, Sparkles, Youtube, Check, Share2, Layers } from 'lucide-react';
import { EpisodeItem, ChannelConfig } from '../types/retro';

interface CrtHeroPlayerProps {
  currentEpisode: EpisodeItem;
  onSelectEpisode: (ep: EpisodeItem) => void;
  allEpisodes: EpisodeItem[];
  channelConfig: ChannelConfig;
}

export const CrtHeroPlayer: React.FC<CrtHeroPlayerProps> = ({
  currentEpisode,
  onSelectEpisode,
  allEpisodes,
  channelConfig,
}) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [scanlinesActive, setScanlinesActive] = useState(true);
  const [copied, setCopied] = useState(false);

  // Quick channels (first 4 featured or prominent episodes)
  const channels = allEpisodes.slice(0, 5);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentEpisode.youtubeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-6 pb-12 overflow-hidden bg-retro-grid border-b-2 border-[#3f2314]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#d97706]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Subtitle / SEO kicker */}
        <div className="text-center mb-6">
          <p className="font-crt text-lg sm:text-xl text-[#f59e0b] tracking-wider uppercase mb-1">
            Archivo Audiovisual · Décadas de los 80s & 90s
          </p>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#faf5ec] text-balance">
            El canal de culto para nostálgicos del videojuego y el celuloide
          </h1>
          <p className="max-w-2xl mx-auto mt-3 text-sm sm:text-base text-[#c9b7a1]">
            Programas monográficos, tertulias en podcast, reportajes con entrevistas exclusivas y curiosidades en píldoras de 5 minutos sobre la era dorada de los 8 y 16 bits.
          </p>
        </div>

        {/* The Vintage CRT TV Console Container */}
        <div className="bg-[#1f130b] pixel-box p-4 sm:p-6 rounded-none relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* LEFT / CENTER: The CRT Television Housing (8 cols) */}
            <div className="lg:col-span-8 flex flex-col">
              
              {/* Top CRT Bezel Bar */}
              <div className="bg-[#2b180d] px-4 py-2 border-2 border-[#3f2314] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-[#10b981] shadow-[0_0_8px_#10b981] inline-block"></span>
                  <span className="font-pixel text-[11px] text-[#fbbf24] tracking-wider">
                    RETRO-VISION 2100 · SONY TRINITRON STYLE
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setScanlinesActive(!scanlinesActive)}
                    className={`px-2 py-1 text-[10px] font-pixel transition-colors cursor-pointer border ${
                      scanlinesActive
                        ? 'bg-[#3f2314] text-[#fbbf24] border-[#d97706]'
                        : 'bg-transparent text-[#9a8570] border-[#3f2314]'
                    }`}
                    title="Alternar filtro de líneas de escaneo CRT"
                  >
                    SCANLINES: {scanlinesActive ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>

              {/* CRT Glass Screen */}
              <div className="relative aspect-video bg-black border-4 border-[#120a06] overflow-hidden flex items-center justify-center group shadow-inner">
                
                {isPlayingVideo ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${currentEpisode.youtubeId}?autoplay=1&rel=0`}
                    title={currentEpisode.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <>
                    <img
                      src={currentEpisode.thumbnailUrl}
                      alt={currentEpisode.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
                    />

                    {/* Dark gradient overlay for legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none"></div>

                    {/* Centered Big Play Button */}
                    <button
                      onClick={() => setIsPlayingVideo(true)}
                      className="absolute z-20 pixel-button bg-[#d97706] hover:bg-[#b45309] text-black px-5 py-3 flex items-center gap-3 font-pixel text-xs sm:text-sm cursor-pointer shadow-[4px_4px_0px_#000]"
                    >
                      <Play className="w-5 h-5 fill-black" />
                      <span>ENCENDER CRT TV</span>
                    </button>

                    {/* In-screen retro HUD on bottom */}
                    <div className="absolute bottom-3 left-4 right-4 z-10 flex flex-col gap-1 pointer-events-none">
                      <div className="flex items-center gap-2 text-xs font-crt text-[#fcd34d]">
                        <span>CANAL RETROBROWNIE</span>
                        <span aria-hidden="true">·</span>
                        <span>{currentEpisode.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>{currentEpisode.duration}</span>
                      </div>
                      <p className="font-pixel text-xs sm:text-sm text-white line-clamp-1 drop-shadow-md">
                        {currentEpisode.title}
                      </p>
                    </div>
                  </>
                )}

                {/* CRT Scanline Overlay Effect */}
                {scanlinesActive && (
                  <div className="absolute inset-0 crt-overlay pointer-events-none z-30 opacity-70"></div>
                )}
              </div>

              {/* Bottom TV Controls Strip (Speaker grille, channel knobs, audio) */}
              <div className="bg-[#24140b] p-3 border-2 border-[#3f2314] flex flex-wrap items-center justify-between gap-3">
                
                {/* Channel Quick Switchers */}
                <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                  <span className="font-pixel text-[10px] text-[#9a8570] mr-1 hidden sm:inline">
                    CANALES:
                  </span>
                  {channels.map((ep, idx) => (
                    <button
                      key={ep.id}
                      onClick={() => {
                        onSelectEpisode(ep);
                        setIsPlayingVideo(false);
                      }}
                      className={`px-2.5 py-1 text-[11px] font-pixel transition-all cursor-pointer whitespace-nowrap ${
                        currentEpisode.id === ep.id
                          ? 'bg-[#d97706] text-black font-bold shadow-[2px_2px_0px_#000]'
                          : 'bg-[#180e07] text-[#c9b7a1] hover:bg-[#341d10] border border-[#3f2314]'
                      }`}
                    >
                      CH {idx + 1}
                    </button>
                  ))}
                </div>

                {/* Direct YouTube Actions */}
                <div className="flex items-center gap-2">
                  <a
                    href={currentEpisode.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pixel-button px-3 py-1.5 bg-[#cc0000] hover:bg-[#990000] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Youtube className="w-3.5 h-3.5 fill-white" />
                    <span>Ver en YouTube</span>
                  </a>

                  <button
                    onClick={handleCopyLink}
                    className="pixel-button px-2.5 py-1.5 bg-[#341d10] hover:bg-[#482816] text-[#faf5ec] text-xs flex items-center gap-1 cursor-pointer"
                    title="Copiar enlace del vídeo"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span className="hidden sm:inline">{copied ? 'Copiado!' : 'Compartir'}</span>
                  </button>
                </div>

              </div>

            </div>

            {/* RIGHT: Episode Cassette dossier & Channel Info (4 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between bg-[#180e07] border-2 border-[#3f2314] p-4 sm:p-5">
              
              <div>
                {/* Cassette Header Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-[#3f2314]">
                  <div className="flex items-center gap-2 text-xs font-crt text-[#f59e0b] tracking-wide">
                    <Layers className="w-4 h-4" />
                    <span>FICHA DE EMISIÓN</span>
                  </div>
                  <span className="text-xs font-crt text-[#9a8570]">
                    ERA {currentEpisode.era}
                  </span>
                </div>

                {/* Title and Unboxed Metadata */}
                <h3 className="text-lg sm:text-xl font-bold text-[#faf5ec] mt-3 mb-2 leading-snug">
                  {currentEpisode.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-[#a89582] mb-3 font-medium">
                  <span className="text-[#fbbf24]">{currentEpisode.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentEpisode.duration}</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentEpisode.releaseDate}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#d6c7b2] leading-relaxed mb-4">
                  {currentEpisode.summary}
                </p>

                {currentEpisode.guestOrTopic && (
                  <div className="p-2.5 bg-[#24140b] border border-[#3f2314] text-xs text-[#fcd34d] mb-4">
                    <span className="font-semibold block text-[#f59e0b] mb-0.5">Enfoque especial:</span>
                    {currentEpisode.guestOrTopic}
                  </div>
                )}

                {/* Timestamps if available */}
                {currentEpisode.timestamps && currentEpisode.timestamps.length > 0 && (
                  <div className="mt-3">
                    <h4 className="font-crt text-xs text-[#9a8570] uppercase tracking-wider mb-1.5">
                      Índice del programa:
                    </h4>
                    <div className="space-y-1 text-xs text-[#c9b7a1]">
                      {currentEpisode.timestamps.slice(0, 3).map((ts, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="font-crt text-[#f59e0b] shrink-0">{ts.time}</span>
                          <span className="truncate">{ts.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Channel Call to Action Box */}
              <div className="mt-6 pt-4 border-t border-[#3f2314]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#3f2314] border border-[#d97706] flex items-center justify-center font-pixel text-xs text-[#f59e0b]">
                      RB
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#faf5ec]">{channelConfig.channelName}</div>
                      <div className="text-[11px] text-[#9a8570]">{channelConfig.channelHandle}</div>
                    </div>
                  </div>

                  <a
                    href={channelConfig.channelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#fbbf24] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Ir al Canal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
