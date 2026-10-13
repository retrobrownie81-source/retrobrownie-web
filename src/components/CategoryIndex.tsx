import React from 'react';
import { Tv, Mic, Clapperboard, Zap, Search, Sliders, Bookmark } from 'lucide-react';
import { ContentCategory } from '../types/retro';
import { CATEGORIES_META } from '../data/retrobrownieData';

interface CategoryIndexProps {
  selectedCategory: string; // 'all' or ContentCategory
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedEra: string;
  onEraChange: (era: string) => void;
  totalEpisodesCount: number;
}

export const CategoryIndex: React.FC<CategoryIndexProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  selectedEra,
  onEraChange,
  totalEpisodesCount,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Tv':
        return <Tv className="w-5 h-5 text-[#f59e0b]" />;
      case 'Mic':
        return <Mic className="w-5 h-5 text-[#10b981]" />;
      case 'Clapperboard':
        return <Clapperboard className="w-5 h-5 text-[#ef4444]" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-[#38bdf8]" />;
      default:
        return <Tv className="w-5 h-5 text-[#f59e0b]" />;
    }
  };

  return (
    <div className="bg-[#180e07] border-y-2 border-[#3f2314] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="font-crt text-sm text-[#f59e0b] tracking-wider uppercase block mb-1">
              Guía de Emisión & Archivo
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#faf5ec]">
              Índice de Contenidos por Apartado
            </h2>
            <p className="text-xs sm:text-sm text-[#a89582] mt-1">
              Explora las emisiones organizadas entre programas completos, podcast, reportajes con entrevistas y píldoras.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-72 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar saga, juego o peli..."
              className="w-full bg-[#120a06] border-2 border-[#3f2314] focus:border-[#d97706] text-xs text-[#faf5ec] placeholder-[#7d6753] pl-9 pr-3 py-2 outline-none transition-colors"
            />
            <Search className="w-4 h-4 text-[#7d6753] absolute left-3 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* 4 Main Categories Bento Cards (Rule 1.A: Button controls for interactive filters) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {CATEGORIES_META.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <div
                key={cat.id}
                className={`p-4 text-left transition-all border-2 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#2b180d] border-[#f59e0b] shadow-[4px_4px_0px_#000000]'
                    : 'bg-[#1e1109] border-[#3f2314] hover:border-[#57331d] hover:bg-[#25150c]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-[#120a06] border border-[#3f2314]">
                      {getIcon(cat.iconName)}
                    </div>
                    <span className="font-crt text-xs text-[#a89582]">
                      {cat.count} EPISODIOS
                    </span>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-[#faf5ec] mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#f59e0b] font-medium mb-1">
                    {cat.tagline}
                  </p>
                  <p className="text-xs text-[#9a8570] line-clamp-2 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-[#2d190d] flex items-center justify-between gap-2 text-[11px]">
                  <button
                    onClick={() => onSelectCategory(isSelected ? 'all' : cat.id)}
                    className={`font-semibold cursor-pointer ${
                      isSelected ? 'text-[#f59e0b]' : 'text-[#c9b7a1] hover:text-white'
                    }`}
                  >
                    {isSelected ? '● Filtrando' : 'Filtrar aquí'}
                  </button>

                  {cat.id === 'programas' ? (
                    <button
                      onClick={() => onSelectCategory('programas')}
                      className="text-[#f59e0b] hover:text-[#fbbf24] font-semibold cursor-pointer"
                    >
                      Ver 4 programas / playlist →
                    </button>
                  ) : cat.id === 'podcasts' ? (
                    <button
                      onClick={() => onSelectCategory('podcasts')}
                      className="text-[#10b981] hover:text-[#34d399] font-semibold cursor-pointer"
                    >
                      Ver 3 shows →
                    </button>
                  ) : cat.id === 'reportajes' ? (
                    <button
                      onClick={() => onSelectCategory('reportajes')}
                      className="text-[#ef4444] hover:text-[#f87171] font-semibold cursor-pointer"
                    >
                      Ver 2 apartados →
                    </button>
                  ) : (
                    <button
                      onClick={() => onSelectCategory('cortos')}
                      className="text-[#38bdf8] hover:text-[#7dd3fc] font-semibold cursor-pointer"
                    >
                      Ver 8 cápsulas FLASH →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Filter Toolbar / Segmented Quick Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#2e190e]">
          
          {/* Quick Category Segmented Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-[#a89582] mr-1 hidden sm:inline">Apartado:</span>
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium cursor-pointer border transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[#d97706] text-black font-bold border-[#d97706]'
                  : 'bg-[#140b07] text-[#c9b7a1] border-[#3f2314] hover:text-white'
              }`}
            >
              Todos ({totalEpisodesCount})
            </button>
            <button
              onClick={() => onSelectCategory('programas')}
              className={`px-3 py-1.5 text-xs font-medium cursor-pointer border transition-colors ${
                selectedCategory === 'programas'
                  ? 'bg-[#d97706] text-black font-bold border-[#d97706]'
                  : 'bg-[#140b07] text-[#c9b7a1] border-[#3f2314] hover:text-white'
              }`}
            >
              Programas (4)
            </button>
            <button
              onClick={() => onSelectCategory('podcasts')}
              className={`px-3 py-1.5 text-xs font-medium cursor-pointer border transition-colors ${
                selectedCategory === 'podcasts'
                  ? 'bg-[#d97706] text-black font-bold border-[#d97706]'
                  : 'bg-[#140b07] text-[#c9b7a1] border-[#3f2314] hover:text-white'
              }`}
            >
              Podcasts (10)
            </button>
            <button
              onClick={() => onSelectCategory('reportajes')}
              className={`px-3 py-1.5 text-xs font-medium cursor-pointer border transition-colors ${
                selectedCategory === 'reportajes'
                  ? 'bg-[#d97706] text-black font-bold border-[#d97706]'
                  : 'bg-[#140b07] text-[#c9b7a1] border-[#3f2314] hover:text-white'
              }`}
            >
              Reportajes & Entrevistas (9)
            </button>
            <button
              onClick={() => onSelectCategory('cortos')}
              className={`px-3 py-1.5 text-xs font-medium cursor-pointer border transition-colors ${
                selectedCategory === 'cortos'
                  ? 'bg-[#d97706] text-black font-bold border-[#d97706]'
                  : 'bg-[#140b07] text-[#c9b7a1] border-[#3f2314] hover:text-white'
              }`}
            >
              Cápsulas (3)
            </button>
          </div>

          {/* Era Filter: All / 80s / 90s */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[#a89582] mr-1">Época:</span>
            {['all', '80s', '90s'].map((era) => (
              <button
                key={era}
                onClick={() => onEraChange(era)}
                className={`px-2.5 py-1 text-xs cursor-pointer border transition-colors ${
                  selectedEra === era
                    ? 'bg-[#3f2314] text-[#fbbf24] border-[#d97706] font-semibold'
                    : 'bg-[#140b07] text-[#8c7764] border-[#3f2314] hover:text-white'
                }`}
              >
                {era === 'all' ? 'Todas' : era.toUpperCase()}
              </button>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
