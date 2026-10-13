import React, { useState } from 'react';
import { Sparkles, Dices, Play, ArrowRight } from 'lucide-react';
import { EpisodeItem } from '../types/retro';

interface RetroRecommenderProps {
  episodes: EpisodeItem[];
  onSelectEpisode: (ep: EpisodeItem) => void;
}

export const RetroRecommender: React.FC<RetroRecommenderProps> = ({
  episodes,
  onSelectEpisode,
}) => {
  const [selectedMood, setSelectedMood] = useState<string>('todos');
  const [recommended, setRecommended] = useState<EpisodeItem | null>(null);

  const moodOptions = [
    { id: 'rapido', label: 'Tengo 5 minutos rápidos', category: 'cortos' },
    { id: 'tertulia', label: 'Podcast para escuchar de fondo', category: 'podcasts' },
    { id: 'entrevista', label: 'Testimonios y entrevistas', category: 'reportajes' },
    { id: 'profundo', label: 'Monográfico a fondo', category: 'programas' },
  ];

  const handleRandomize = () => {
    let pool = episodes;
    if (selectedMood !== 'todos') {
      const match = moodOptions.find((m) => m.id === selectedMood);
      if (match) {
        pool = episodes.filter((ep) => ep.category === match.category);
      }
    }
    if (pool.length === 0) pool = episodes;
    const randomItem = pool[Math.floor(Math.random() * pool.length)];
    setRecommended(randomItem);
  };

  return (
    <section className="bg-[#150d07] border-b-2 border-[#3f2314] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#1f130b] border-2 border-[#3f2314] p-5 sm:p-7 shadow-[4px_4px_0px_#000000]">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="max-w-xl">
              <span className="font-crt text-xs text-[#f59e0b] tracking-wider uppercase block mb-1">
                Selector de cinta aleatoria
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#faf5ec] mb-2">
                ¿Qué te apetece ver o escuchar hoy en retrobrownie?
              </h3>
              <p className="text-xs sm:text-sm text-[#b8a794] leading-relaxed">
                Elige tu plan retro o pulsa para insertar moneda y recibir una recomendación automática del catálogo.
              </p>

              {/* Mood pills / options */}
              <div className="flex flex-wrap gap-2 mt-4">
                {moodOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedMood(opt.id)}
                    className={`px-3 py-1.5 text-xs border transition-colors cursor-pointer ${
                      selectedMood === opt.id
                        ? 'bg-[#d97706] text-black font-semibold border-[#d97706]'
                        : 'bg-[#120a06] text-[#c9b7a1] border-[#3f2314] hover:border-[#633a21]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Trigger Button */}
            <div className="shrink-0">
              <button
                onClick={handleRandomize}
                className="pixel-button w-full sm:w-auto px-5 py-3 bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-pixel text-xs flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_#000]"
              >
                <Dices className="w-4 h-4 text-black" />
                <span>INSERT COIN (RECOMENDAR)</span>
              </button>
            </div>

          </div>

          {/* Recommended Result card if selected */}
          {recommended && (
            <div className="mt-6 pt-5 border-t border-[#3f2314] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#120a06] p-4 border border-[#3f2314] animate-fade-in">
              <div className="flex items-center gap-4">
                <div className="w-16 h-12 bg-[#2b180d] shrink-0 border border-[#3f2314] overflow-hidden">
                  <img
                    src={recommended.thumbnailUrl}
                    alt={recommended.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#a89582] mb-0.5 font-medium">
                    <span className="text-[#f59e0b]">{recommended.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{recommended.duration}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#faf5ec] line-clamp-1">
                    {recommended.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => {
                    onSelectEpisode(recommended);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="pixel-button px-3.5 py-2 bg-[#d97706] hover:bg-[#b45309] text-black text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-black" />
                  <span>Reproducir en CRT</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
