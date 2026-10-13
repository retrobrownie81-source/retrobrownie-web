import React from 'react';
import { Play, Youtube, ExternalLink, Clock, Calendar } from 'lucide-react';
import { EpisodeItem } from '../types/retro';

interface EpisodeCardProps {
  episode: EpisodeItem;
  isActive: boolean;
  onPlayInCrt: (episode: EpisodeItem) => void;
}

export const EpisodeCard: React.FC<EpisodeCardProps> = ({
  episode,
  isActive,
  onPlayInCrt,
}) => {
  return (
    <article
      className={`group flex flex-col justify-between bg-[#1a0f08] border-2 transition-all duration-200 ${
        isActive
          ? 'border-[#f59e0b] shadow-[4px_4px_0px_#000000]'
          : 'border-[#382012] hover:border-[#633a21] shadow-[2px_2px_0px_#000000]'
      }`}
    >
      <div>
        {/* Thumbnail Frame */}
        <div className="relative aspect-video bg-[#120a06] border-b-2 border-[#382012] overflow-hidden">
          <img
            src={episode.thumbnailUrl}
            alt={episode.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-90"
          />

          {/* Scrim gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>

          {/* Quick Play Trigger button */}
          <button
            onClick={() => onPlayInCrt(episode)}
            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
            aria-label={`Reproducir ${episode.title} en CRT`}
          >
            <div className="pixel-button bg-[#d97706] text-black px-3.5 py-2 flex items-center gap-2 font-pixel text-[11px]">
              <Play className="w-3.5 h-3.5 fill-black" />
              <span>CARGAR EN CRT</span>
            </div>
          </button>

          {/* In-corner clean unboxed time indicator */}
          <div className="absolute bottom-2 right-2 bg-black/85 px-2 py-0.5 border border-[#3f2314] text-[11px] font-crt text-[#fbbf24]">
            {episode.duration}
          </div>

          <div className="absolute top-2 left-2 bg-black/85 px-2 py-0.5 border border-[#3f2314] text-[10px] font-crt text-[#d6c7b2] uppercase tracking-wider">
            {episode.era}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5">
          
          {/* Clean Unboxed Metadata (Rule 1.A: No static pill envelopes) */}
          <div className="flex items-center gap-2 text-xs text-[#a89582] mb-2 font-medium">
            <span className="text-[#f59e0b]">{episode.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{episode.releaseDate}</span>
          </div>

          {/* Episode Title */}
          <h3 className="text-base sm:text-lg font-bold text-[#faf5ec] group-hover:text-[#fcd34d] transition-colors leading-snug line-clamp-2 mb-2">
            {episode.title}
          </h3>

          {/* Summary */}
          <p className="text-xs sm:text-sm text-[#b8a794] line-clamp-3 leading-relaxed mb-4">
            {episode.summary}
          </p>

          {/* Focus or Guest Topic */}
          {episode.guestOrTopic && (
            <div className="text-xs text-[#d97706] bg-[#24140b] p-2 border border-[#382012] mb-3 line-clamp-1">
              <span className="font-semibold text-[#f59e0b]">Clave: </span>
              {episode.guestOrTopic}
            </div>
          )}

          {/* Tags list as clean unboxed text */}
          <div className="flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-[#8c7764]">
            {episode.tags.map((tag, i) => (
              <span key={i}>
                #{tag}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="px-4 py-3 bg-[#130b06] border-t-2 border-[#382012] flex items-center justify-between gap-3">
        <button
          onClick={() => onPlayInCrt(episode)}
          className={`text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
            isActive ? 'text-[#f59e0b]' : 'text-[#faf5ec] hover:text-[#f59e0b]'
          }`}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{isActive ? 'En emisión' : 'Ver en CRT'}</span>
        </button>

        <a
          href={episode.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#cc0000] hover:text-[#ff3333] flex items-center gap-1 font-semibold transition-colors"
          title="Ver este episodio en YouTube"
        >
          <Youtube className="w-3.5 h-3.5 fill-current" />
          <span>En YouTube</span>
        </a>
      </div>
    </article>
  );
};
