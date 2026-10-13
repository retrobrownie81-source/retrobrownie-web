/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Tv, 
  Mic, 
  Clapperboard, 
  Zap, 
  Youtube, 
  Sparkles, 
  Film, 
  Gamepad2, 
  ArrowUpRight, 
  Radio,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { CrtHeroPlayer } from './components/CrtHeroPlayer';
import { CategoryIndex } from './components/CategoryIndex';
import { EpisodeCard } from './components/EpisodeCard';
import { ChannelLinkModal } from './components/ChannelLinkModal';
import { RetroRecommender } from './components/RetroRecommender';
import { Footer } from './components/Footer';
import { 
  EPISODES_DATA, 
  DEFAULT_CHANNEL_CONFIG, 
  CATEGORIES_META, 
  PROGRAMAS_SERIES,
  PROGRAMAS_PLAYLIST_URL,
  PODCAST_SERIES,
  REPORTAJE_SERIES,
  CAPSULAS_SERIES,
  CAPSULAS_PLAYLIST_URL
} from './data/retrobrownieData';
import { EpisodeItem, ChannelConfig, ContentCategory, PodcastSeries, ReportajeSeries } from './types/retro';

export default function App() {
  const [episodes, setEpisodes] = useState<EpisodeItem[]>(EPISODES_DATA);
  const [currentEpisode, setCurrentEpisode] = useState<EpisodeItem>(EPISODES_DATA[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPodcastSeries, setSelectedPodcastSeries] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [isConfigModalOpen, setIsConfigModalOpen] = useState<boolean>(false);

  // Load channel configuration from LocalStorage if available
  const [channelConfig, setChannelConfig] = useState<ChannelConfig>(() => {
    try {
      const saved = localStorage.getItem('retrobrownie_config');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_CHANNEL_CONFIG;
  });

  const handleSaveConfig = (newConfig: ChannelConfig) => {
    setChannelConfig(newConfig);
    try {
      localStorage.setItem('retrobrownie_config', JSON.stringify(newConfig));
    } catch {
      // ignore
    }
  };

  const handleLoadCustomVideo = (youtubeId: string, title?: string) => {
    const customEpisode: EpisodeItem = {
      id: `custom-${Date.now()}`,
      title: title || `Vídeo cargado de ${channelConfig.channelHandle}`,
      slug: `custom-video-${youtubeId}`,
      category: 'programas',
      categoryLabel: 'Vídeo Personalizado',
      duration: '--:--',
      releaseDate: 'Reciente',
      youtubeId: youtubeId,
      youtubeUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
      summary: 'Vídeo cargado directamente a través del gestor de canal retrobrownie.',
      guestOrTopic: `Emisión de ${channelConfig.channelName}`,
      tags: ['Personalizado', 'YouTube'],
      era: '80s/90s',
      thumbnailUrl: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
    };
    setCurrentEpisode(customEpisode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter episodes based on category, search, and era
  const filteredEpisodes = useMemo(() => {
    return episodes.filter((ep) => {
      // Category filter
      if (selectedCategory !== 'all' && ep.category !== selectedCategory) {
        return false;
      }
      // Era filter
      if (selectedEra !== 'all') {
        if (selectedEra === '80s' && ep.era === '90s') return false;
        if (selectedEra === '90s' && ep.era === '80s') return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = ep.title.toLowerCase().includes(q);
        const matchesSummary = ep.summary.toLowerCase().includes(q);
        const matchesTags = ep.tags.some((t) => t.toLowerCase().includes(q));
        const matchesTopic = ep.guestOrTopic?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSummary && !matchesTags && !matchesTopic) {
          return false;
        }
      }
      return true;
    });
  }, [episodes, selectedCategory, selectedEra, searchQuery]);

  // Grouped datasets for the "all" view
  const programasEpisodes = useMemo(
    () => filteredEpisodes.filter((ep) => ep.category === 'programas'),
    [filteredEpisodes]
  );
  const podcastsEpisodes = useMemo(
    () => filteredEpisodes.filter((ep) => ep.category === 'podcasts'),
    [filteredEpisodes]
  );
  const reportajesEpisodes = useMemo(
    () => filteredEpisodes.filter((ep) => ep.category === 'reportajes'),
    [filteredEpisodes]
  );
  const cortosEpisodes = useMemo(
    () => filteredEpisodes.filter((ep) => ep.category === 'cortos'),
    [filteredEpisodes]
  );

  const handleSelectAndScroll = (episode: EpisodeItem) => {
    setCurrentEpisode(episode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#120a06] text-[#faf5ec] flex flex-col selection:bg-[#d97706] selection:text-black">
      
      {/* 1. Header with strict Top Bar Contract */}
      <Navbar
        channelConfig={channelConfig}
        onOpenConfig={() => setIsConfigModalOpen(true)}
        activeCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      <main className="flex-1">
        
        {/* 2. Main CRT Hero Section */}
        <CrtHeroPlayer
          currentEpisode={currentEpisode}
          onSelectEpisode={setCurrentEpisode}
          allEpisodes={episodes}
          channelConfig={channelConfig}
        />

        {/* 3. Fast YouTube Positioning Banner */}
        <section className="bg-[#1b1008] border-b-2 border-[#3f2314] py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#cc0000] flex items-center justify-center pixel-box shrink-0">
                <Youtube className="w-6 h-6 fill-white text-white" />
              </div>
              <div>
                <p className="font-pixel text-xs text-[#faf5ec]">
                  CANAL OFICIAL YOUTUBE · {channelConfig.channelName.toUpperCase()}
                </p>
                <p className="text-xs text-[#a89582] mt-0.5">
                  Vídeos semanales, debates en directo y monográficos retro en alta fidelidad.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <a
                href={channelConfig.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#faf5ec] hover:text-[#f59e0b] flex items-center gap-1 font-semibold transition-colors"
              >
                <span>{channelConfig.channelHandle}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={channelConfig.subscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-button px-4 py-2 bg-[#cc0000] hover:bg-[#a30000] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Youtube className="w-3.5 h-3.5 fill-white" />
                <span>Suscribirse</span>
              </a>
            </div>
          </div>
        </section>

        {/* 4. Category Index & Real-time Filter System */}
        <CategoryIndex
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedEra={selectedEra}
          onEraChange={setSelectedEra}
          totalEpisodesCount={episodes.length}
        />

        {/* 5. Main Catalog Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          {/* If filtering by a single category or searching */}
          {selectedCategory !== 'all' ? (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-3 border-b-2 border-[#3f2314]">
                <div>
                  <span className="font-crt text-xs text-[#f59e0b] uppercase tracking-wider block">
                    Apartado Activo
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#faf5ec] capitalize">
                    {CATEGORIES_META.find((c) => c.id === selectedCategory)?.name || selectedCategory}
                  </h2>
                </div>
                
                <div className="flex items-center gap-3">
                  {selectedCategory === 'programas' && (
                    <a
                      href={channelConfig.programasPlaylistUrl || PROGRAMAS_SERIES.playlistUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pixel-button px-3.5 py-1.5 bg-[#d97706] hover:bg-[#b45309] text-black text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#000]"
                      title="Abrir playlist oficial de Programas Completos en YouTube"
                    >
                      <Youtube className="w-3.5 h-3.5 fill-black" />
                      <span>Playlist en YouTube ↗</span>
                    </a>
                  )}
                  {selectedCategory === 'cortos' && (
                    <a
                      href={channelConfig.capsulasPlaylistUrl || CAPSULAS_SERIES.playlistUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pixel-button px-3.5 py-1.5 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#000]"
                      title="Abrir playlist oficial de Cápsulas en YouTube"
                    >
                      <Youtube className="w-3.5 h-3.5 fill-white" />
                      <span>Playlist en YouTube ↗</span>
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="text-xs text-[#d97706] hover:underline font-semibold cursor-pointer"
                  >
                    ← Ver todos los apartados
                  </button>
                </div>
              </div>

              {filteredEpisodes.length === 0 ? (
                <div className="p-8 text-center bg-[#180e07] border-2 border-[#3f2314]">
                  <p className="text-sm text-[#a89582] mb-3">
                    No se encontraron emisiones con los filtros seleccionados.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                      setSelectedEra('all');
                    }}
                    className="pixel-button px-4 py-2 bg-[#d97706] text-black text-xs font-bold"
                  >
                    Restablecer Filtros
                  </button>
                </div>
              ) : selectedCategory === 'podcasts' ? (
                /* Vista específica de Podcasts organizada por los 3 sub-apartados de YouTube */
                <div className="space-y-10">
                  {PODCAST_SERIES.map((series, idx) => {
                    const seriesEpisodes = filteredEpisodes.filter(
                      (ep) => ep.podcastSeriesId === series.id
                    );
                    if (seriesEpisodes.length === 0 && searchQuery) return null;

                    return (
                      <div
                        key={series.id}
                        className="bg-[#180e08] border-2 border-[#382012] p-5 sm:p-6 shadow-[3px_3px_0px_#000000]"
                      >
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-[#2d180d] mb-6">
                          <div className="max-w-3xl">
                            <div className="flex items-center gap-2 text-xs font-crt text-[#34d399] uppercase tracking-wider mb-1">
                              <span>ENLACE {idx + 1} DE YOUTUBE</span>
                              <span aria-hidden="true">·</span>
                              <span>{series.badge}</span>
                              <span aria-hidden="true">·</span>
                              <span>{series.episodesCount} Envíos</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-[#faf5ec]">
                              {series.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-[#c9b7a1] mt-1.5 leading-relaxed">
                              {series.description}
                            </p>
                          </div>

                          <div className="shrink-0">
                            <a
                              href={series.playlistUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="pixel-button px-3.5 py-2 bg-[#10b981] hover:bg-[#059669] text-black text-xs font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-[2px_2px_0px_#000]"
                              title={`Abrir playlist de ${series.title} en YouTube`}
                            >
                              <Youtube className="w-3.5 h-3.5 fill-black" />
                              <span>Ver Playlist en YouTube ↗</span>
                            </a>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {seriesEpisodes.map((ep) => (
                            <EpisodeCard
                              key={ep.id}
                              episode={ep}
                              isActive={currentEpisode.id === ep.id}
                              onPlayInCrt={handleSelectAndScroll}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : selectedCategory === 'reportajes' ? (
                /* Vista específica de Reportajes organizada por los 2 sub-apartados de YouTube */
                <div className="space-y-10">
                  {REPORTAJE_SERIES.map((series, idx) => {
                    const seriesEpisodes = filteredEpisodes.filter(
                      (ep) => ep.reportajeSeriesId === series.id
                    );
                    if (seriesEpisodes.length === 0 && searchQuery) return null;

                    return (
                      <div
                        key={series.id}
                        className="bg-[#180e08] border-2 border-[#382012] p-5 sm:p-6 shadow-[3px_3px_0px_#000000]"
                      >
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-[#2d180d] mb-6">
                          <div className="max-w-3xl">
                            <div className="flex items-center gap-2 text-xs font-crt text-[#f87171] uppercase tracking-wider mb-1">
                              <span>ENLACE {idx + 1} DE YOUTUBE</span>
                              <span aria-hidden="true">·</span>
                              <span>{series.badge}</span>
                              <span aria-hidden="true">·</span>
                              <span>{series.episodesCount} Envíos</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-[#faf5ec]">
                              {series.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-[#c9b7a1] mt-1.5 leading-relaxed">
                              {series.description}
                            </p>
                          </div>

                          <div className="shrink-0">
                            <a
                              href={series.playlistUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="pixel-button px-3.5 py-2 bg-[#ef4444] hover:bg-[#dc2626] text-white text-xs font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-[2px_2px_0px_#000]"
                              title={`Abrir playlist de ${series.title} en YouTube`}
                            >
                              <Youtube className="w-3.5 h-3.5 fill-white" />
                              <span>Ver Playlist en YouTube ↗</span>
                            </a>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {seriesEpisodes.map((ep) => (
                            <EpisodeCard
                              key={ep.id}
                              episode={ep}
                              isActive={currentEpisode.id === ep.id}
                              onPlayInCrt={handleSelectAndScroll}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : selectedCategory === 'programas' ? (
                /* Vista específica de Programas Completos clasificada con la playlist oficial de YouTube */
                <div className="space-y-6">
                  <div className="bg-[#180e08] border-2 border-[#523019] p-5 sm:p-6 shadow-[3px_3px_0px_#000000]">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-[#341d0e] mb-6">
                      <div className="max-w-3xl">
                        <div className="flex items-center gap-2 text-xs font-crt text-[#f59e0b] uppercase tracking-wider mb-1">
                          <span>PLAYLIST OFICIAL DE YOUTUBE</span>
                          <span aria-hidden="true">·</span>
                          <span>{PROGRAMAS_SERIES.badge}</span>
                          <span aria-hidden="true">·</span>
                          <span>{PROGRAMAS_SERIES.episodesCount} Envíos</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-[#faf5ec]">
                          {PROGRAMAS_SERIES.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#c9b7a1] mt-1.5 leading-relaxed">
                          {PROGRAMAS_SERIES.description}
                        </p>
                      </div>

                      <div className="shrink-0">
                        <a
                          href={channelConfig.programasPlaylistUrl || PROGRAMAS_SERIES.playlistUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pixel-button px-3.5 py-2 bg-[#d97706] hover:bg-[#b45309] text-black text-xs font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-[2px_2px_0px_#000]"
                          title="Abrir playlist oficial de Programas Completos en YouTube"
                        >
                          <Youtube className="w-3.5 h-3.5 fill-black" />
                          <span>Ver Playlist en YouTube ↗</span>
                        </a>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredEpisodes.map((ep) => (
                        <EpisodeCard
                          key={ep.id}
                          episode={ep}
                          isActive={currentEpisode.id === ep.id}
                          onPlayInCrt={handleSelectAndScroll}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : selectedCategory === 'cortos' ? (
                /* Vista específica de Cápsulas clasificada con la playlist oficial de YouTube */
                <div className="space-y-6">
                  <div className="bg-[#180e08] border-2 border-[#1e3a5f] p-5 sm:p-6 shadow-[3px_3px_0px_#000000]">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-[#1b2b3d] mb-6">
                      <div className="max-w-3xl">
                        <div className="flex items-center gap-2 text-xs font-crt text-[#38bdf8] uppercase tracking-wider mb-1">
                          <span>PLAYLIST OFICIAL DE YOUTUBE</span>
                          <span aria-hidden="true">·</span>
                          <span>{CAPSULAS_SERIES.badge}</span>
                          <span aria-hidden="true">·</span>
                          <span>{CAPSULAS_SERIES.episodesCount} Envíos</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-[#faf5ec]">
                          {CAPSULAS_SERIES.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#c9b7a1] mt-1.5 leading-relaxed">
                          {CAPSULAS_SERIES.description}
                        </p>
                      </div>

                      <div className="shrink-0">
                        <a
                          href={channelConfig.capsulasPlaylistUrl || CAPSULAS_SERIES.playlistUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pixel-button px-3.5 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-[2px_2px_0px_#000]"
                          title="Abrir playlist oficial de Cápsulas / Brownie Bites en YouTube"
                        >
                          <Youtube className="w-3.5 h-3.5 fill-white" />
                          <span>Ver Playlist en YouTube ↗</span>
                        </a>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredEpisodes.map((ep) => (
                        <EpisodeCard
                          key={ep.id}
                          episode={ep}
                          isActive={currentEpisode.id === ep.id}
                          onPlayInCrt={handleSelectAndScroll}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEpisodes.map((ep) => (
                    <EpisodeCard
                      key={ep.id}
                      episode={ep}
                      isActive={currentEpisode.id === ep.id}
                      onPlayInCrt={handleSelectAndScroll}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Structured Index showing all 4 separated categories */
            <div className="space-y-16">
              
              {/* APARTADO 1: PROGRAMAS COMPLETOS (RETROANÁLISIS GAMEPLAY) */}
              <section id="programas">
                <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-[#3f2314]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#2b180d] border border-[#f59e0b]">
                      <Tv className="w-5 h-5 text-[#f59e0b]" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#faf5ec]">
                        Programas Completos (Retroanálisis Gameplay)
                      </h2>
                      <p className="text-xs text-[#a89582]">
                        Retroanálisis a fondo, partidas longplay y gameplays comentados de consolas y recreativas clásicas.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedCategory('programas')}
                    className="text-xs text-[#f59e0b] hover:underline font-semibold hidden sm:inline cursor-pointer"
                  >
                    Ver apartado completo ({programasEpisodes.length}) →
                  </button>
                </div>

                {/* APARTADO CLASIFICADO CON EL ENLACE OFICIAL DE YOUTUBE */}
                <div className="bg-[#180e08] border-2 border-[#523019] p-5 sm:p-6 shadow-[3px_3px_0px_#000000]">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-[#341d0e] mb-6">
                    <div className="max-w-3xl">
                      <div className="flex items-center gap-2 text-xs font-crt text-[#f59e0b] uppercase tracking-wider mb-1">
                        <span>PLAYLIST OFICIAL DE YOUTUBE</span>
                        <span aria-hidden="true">·</span>
                        <span>{PROGRAMAS_SERIES.badge}</span>
                        <span aria-hidden="true">·</span>
                        <span>{PROGRAMAS_SERIES.episodesCount} Envíos</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#faf5ec]">
                        {PROGRAMAS_SERIES.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#c9b7a1] mt-1.5 leading-relaxed">
                        {PROGRAMAS_SERIES.description}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <a
                        href={channelConfig.programasPlaylistUrl || PROGRAMAS_SERIES.playlistUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pixel-button px-3.5 py-2 bg-[#d97706] hover:bg-[#b45309] text-black text-xs font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-[2px_2px_0px_#000]"
                        title="Abrir playlist oficial de Programas Completos en YouTube"
                      >
                        <Youtube className="w-3.5 h-3.5 fill-black" />
                        <span>Ver Playlist en YouTube ↗</span>
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {programasEpisodes.map((ep) => (
                      <EpisodeCard
                        key={ep.id}
                        episode={ep}
                        isActive={currentEpisode.id === ep.id}
                        onPlayInCrt={handleSelectAndScroll}
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* APARTADO 2: PODCASTS (BROWNIECAST) CON SUS 3 SUB-APARTADOS POR CADA ENLACE */}
              <section id="podcasts" className="pt-2">
                <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-[#3f2314]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#12281b] border border-[#10b981]">
                      <Mic className="w-5 h-5 text-[#10b981]" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#faf5ec]">
                        BrownieCast (Podcasts)
                      </h2>
                      <p className="text-xs text-[#a89582]">
                        Programas a la carta, historias insólitas y tertulias retro divididas en 3 formatos independientes.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedCategory('podcasts')}
                    className="text-xs text-[#10b981] hover:underline font-semibold hidden sm:inline cursor-pointer"
                  >
                    Ver apartado completo ({podcastsEpisodes.length}) →
                  </button>
                </div>

                {/* LOS 3 APARTADOS INDEPENDIENTES POR CADA ENLACE DE YOUTUBE */}
                <div className="space-y-10">
                  {PODCAST_SERIES.map((series, idx) => {
                    const seriesEpisodes = episodes.filter(
                      (ep) => ep.category === 'podcasts' && ep.podcastSeriesId === series.id
                    );

                    return (
                      <div 
                        key={series.id}
                        className="bg-[#180e08] border-2 border-[#382012] p-5 sm:p-6 shadow-[3px_3px_0px_#000000]"
                      >
                        {/* Cabecera del sub-apartado con título y descripción oficial del enlace */}
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-[#2d180d] mb-6">
                          <div className="max-w-3xl">
                            <div className="flex items-center gap-2 text-xs font-crt text-[#34d399] uppercase tracking-wider mb-1">
                              <span>ENLACE {idx + 1} DE YOUTUBE</span>
                              <span aria-hidden="true">·</span>
                              <span>{series.badge}</span>
                              <span aria-hidden="true">·</span>
                              <span>{series.episodesCount} Envíos</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-[#faf5ec]">
                              {series.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-[#c9b7a1] mt-1.5 leading-relaxed">
                              {series.description}
                            </p>
                          </div>

                          <div className="shrink-0">
                            <a
                              href={series.playlistUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="pixel-button px-3.5 py-2 bg-[#10b981] hover:bg-[#059669] text-black text-xs font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-[2px_2px_0px_#000]"
                              title={`Abrir playlist de ${series.title} en YouTube`}
                            >
                              <Youtube className="w-3.5 h-3.5 fill-black" />
                              <span>Ver Playlist en YouTube ↗</span>
                            </a>
                          </div>
                        </div>

                        {/* Episodios pertenecientes a este enlace */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {seriesEpisodes.map((ep) => (
                            <EpisodeCard
                              key={ep.id}
                              episode={ep}
                              isActive={currentEpisode.id === ep.id}
                              onPlayInCrt={handleSelectAndScroll}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* APARTADO 3: REPORTAJES CON ENTREVISTA CON SUS 2 SUB-APARTADOS POR ENLACE */}
              <section id="reportajes" className="pt-2">
                <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-[#3f2314]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#2d1212] border border-[#ef4444]">
                      <Clapperboard className="w-5 h-5 text-[#ef4444]" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#faf5ec]">
                        Reportajes con Entrevistas
                      </h2>
                      <p className="text-xs text-[#a89582]">
                        Entrevistas a pie de pista en ferias y reportajes especiales de preservación y hardware retro.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedCategory('reportajes')}
                    className="text-xs text-[#ef4444] hover:underline font-semibold hidden sm:inline cursor-pointer"
                  >
                    Ver apartado completo ({reportajesEpisodes.length}) →
                  </button>
                </div>

                {/* LOS 2 APARTADOS INDEPENDIENTES POR CADA ENLACE DE YOUTUBE */}
                <div className="space-y-10">
                  {REPORTAJE_SERIES.map((series, idx) => {
                    const seriesEpisodes = episodes.filter(
                      (ep) => ep.category === 'reportajes' && ep.reportajeSeriesId === series.id
                    );

                    return (
                      <div 
                        key={series.id}
                        className="bg-[#180e08] border-2 border-[#382012] p-5 sm:p-6 shadow-[3px_3px_0px_#000000]"
                      >
                        {/* Cabecera del sub-apartado con título y descripción oficial del enlace */}
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-[#2d180d] mb-6">
                          <div className="max-w-3xl">
                            <div className="flex items-center gap-2 text-xs font-crt text-[#f87171] uppercase tracking-wider mb-1">
                              <span>ENLACE {idx + 1} DE YOUTUBE</span>
                              <span aria-hidden="true">·</span>
                              <span>{series.badge}</span>
                              <span aria-hidden="true">·</span>
                              <span>{series.episodesCount} Envíos</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-[#faf5ec]">
                              {series.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-[#c9b7a1] mt-1.5 leading-relaxed">
                              {series.description}
                            </p>
                          </div>

                          <div className="shrink-0">
                            <a
                              href={series.playlistUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="pixel-button px-3.5 py-2 bg-[#ef4444] hover:bg-[#dc2626] text-white text-xs font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-[2px_2px_0px_#000]"
                              title={`Abrir playlist de ${series.title} en YouTube`}
                            >
                              <Youtube className="w-3.5 h-3.5 fill-white" />
                              <span>Ver Playlist en YouTube ↗</span>
                            </a>
                          </div>
                        </div>

                        {/* Episodios pertenecientes a este enlace */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {seriesEpisodes.map((ep) => (
                            <EpisodeCard
                              key={ep.id}
                              episode={ep}
                              isActive={currentEpisode.id === ep.id}
                              onPlayInCrt={handleSelectAndScroll}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* APARTADO 4: CÁPSULAS Y PROGRAMAS CORTOS (BROWNIE BITES) */}
              <section id="cortos" className="pt-2">
                <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-[#3f2314]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#102431] border border-[#38bdf8]">
                      <Zap className="w-5 h-5 text-[#38bdf8]" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#faf5ec]">
                        Cápsulas & Programas Cortos (Brownie Bites)
                      </h2>
                      <p className="text-xs text-[#a89582]">
                        FLASH Retro: análisis relámpago de videojuegos, cómics, cine y vinilos en píldoras de 1 minuto.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedCategory('cortos')}
                    className="text-xs text-[#38bdf8] hover:underline font-semibold hidden sm:inline cursor-pointer"
                  >
                    Ver apartado completo ({cortosEpisodes.length}) →
                  </button>
                </div>

                {/* APARTADO CLASIFICADO CON EL ENLACE OFICIAL DE YOUTUBE */}
                <div className="bg-[#180e08] border-2 border-[#1e3a5f] p-5 sm:p-6 shadow-[3px_3px_0px_#000000]">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-[#1b2b3d] mb-6">
                    <div className="max-w-3xl">
                      <div className="flex items-center gap-2 text-xs font-crt text-[#38bdf8] uppercase tracking-wider mb-1">
                        <span>PLAYLIST OFICIAL DE YOUTUBE</span>
                        <span aria-hidden="true">·</span>
                        <span>{CAPSULAS_SERIES.badge}</span>
                        <span aria-hidden="true">·</span>
                        <span>{CAPSULAS_SERIES.episodesCount} Envíos</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#faf5ec]">
                        {CAPSULAS_SERIES.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#c9b7a1] mt-1.5 leading-relaxed">
                        {CAPSULAS_SERIES.description}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <a
                        href={channelConfig.capsulasPlaylistUrl || CAPSULAS_SERIES.playlistUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pixel-button px-3.5 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-[2px_2px_0px_#000]"
                        title="Abrir playlist oficial de Cápsulas / Brownie Bites en YouTube"
                      >
                        <Youtube className="w-3.5 h-3.5 fill-white" />
                        <span>Ver Playlist en YouTube ↗</span>
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cortosEpisodes.map((ep) => (
                      <EpisodeCard
                        key={ep.id}
                        episode={ep}
                        isActive={currentEpisode.id === ep.id}
                        onPlayInCrt={handleSelectAndScroll}
                      />
                    ))}
                  </div>
                </div>
              </section>

            </div>
          )}

        </div>

        {/* 6. Interactive Tape Randomizer / Insert Coin */}
        <RetroRecommender
          episodes={episodes}
          onSelectEpisode={handleSelectAndScroll}
        />

        {/* 7. Easy Linking Guide Callout for the Channel Owner */}
        <section className="bg-[#180e07] border-b-2 border-[#3f2314] py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#211209] border-2 border-[#3f2314] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#faf5ec]">
                    ¿Cómo vincular nuevos vídeos de tu canal retrobrownie?
                  </h4>
                  <p className="text-xs text-[#c9b7a1] mt-0.5 max-w-2xl leading-relaxed">
                    Puedes cambiar tu ID de canal, personalizar los enlaces o probar cualquier URL de YouTube directamente desde el botón «Configurar Canal». Tus cambios se guardan localmente para que la web responda a tus vídeos reales.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsConfigModalOpen(true)}
                className="pixel-button px-4 py-2 bg-[#d97706] hover:bg-[#b45309] text-black text-xs font-bold whitespace-nowrap cursor-pointer shrink-0"
              >
                Abrir Configurador de Canal
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* 8. Quiet Footer */}
      <Footer
        channelConfig={channelConfig}
        onOpenConfig={() => setIsConfigModalOpen(true)}
      />

      {/* 9. YouTube Channel Setup Modal */}
      <ChannelLinkModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        channelConfig={channelConfig}
        onSaveConfig={handleSaveConfig}
        onLoadCustomVideo={handleLoadCustomVideo}
      />

    </div>
  );
}
