import React, { useState } from 'react';
import { X, Youtube, Check, Save, RotateCcw, Link2, ExternalLink } from 'lucide-react';
import { ChannelConfig } from '../types/retro';
import { DEFAULT_CHANNEL_CONFIG } from '../data/retrobrownieData';

interface ChannelLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  channelConfig: ChannelConfig;
  onSaveConfig: (newConfig: ChannelConfig) => void;
  onLoadCustomVideo: (youtubeId: string, title?: string) => void;
}

export const ChannelLinkModal: React.FC<ChannelLinkModalProps> = ({
  isOpen,
  onClose,
  channelConfig,
  onSaveConfig,
  onLoadCustomVideo,
}) => {
  const [handle, setHandle] = useState(channelConfig.channelHandle);
  const [name, setName] = useState(channelConfig.channelName);
  const [capsulasPlaylistUrl, setCapsulasPlaylistUrl] = useState(
    channelConfig.capsulasPlaylistUrl || DEFAULT_CHANNEL_CONFIG.capsulasPlaylistUrl
  );
  const [programasPlaylistUrl, setProgramasPlaylistUrl] = useState(
    channelConfig.programasPlaylistUrl || DEFAULT_CHANNEL_CONFIG.programasPlaylistUrl
  );
  const [testVideoUrl, setTestVideoUrl] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const extractYoutubeId = (urlOrId: string): string => {
    const trimmed = urlOrId.trim();
    if (trimmed.length === 11 && !trimmed.includes('/') && !trimmed.includes('.')) {
      return trimmed;
    }
    const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : trimmed;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanHandle = handle.startsWith('@') ? handle : `@${handle}`;
    const newConfig: ChannelConfig = {
      channelHandle: cleanHandle,
      channelName: name.trim() || 'retrobrownie',
      channelUrl: `https://www.youtube.com/${cleanHandle}`,
      subscribeUrl: `https://www.youtube.com/${cleanHandle}?sub_confirmation=1`,
      capsulasPlaylistUrl: capsulasPlaylistUrl.trim() || DEFAULT_CHANNEL_CONFIG.capsulasPlaylistUrl,
      programasPlaylistUrl: programasPlaylistUrl.trim() || DEFAULT_CHANNEL_CONFIG.programasPlaylistUrl,
    };
    onSaveConfig(newConfig);
    setSuccessMsg('¡Canal vinculado correctamente!');
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 1200);
  };

  const handleTestVideo = () => {
    if (!testVideoUrl.trim()) return;
    const extractedId = extractYoutubeId(testVideoUrl);
    if (extractedId) {
      onLoadCustomVideo(extractedId, `Vídeo del canal ${handle}`);
      onClose();
    }
  };

  const handleReset = () => {
    setHandle(DEFAULT_CHANNEL_CONFIG.channelHandle);
    setName(DEFAULT_CHANNEL_CONFIG.channelName);
    setCapsulasPlaylistUrl(DEFAULT_CHANNEL_CONFIG.capsulasPlaylistUrl);
    setProgramasPlaylistUrl(DEFAULT_CHANNEL_CONFIG.programasPlaylistUrl);
    onSaveConfig(DEFAULT_CHANNEL_CONFIG);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-[#180e07] border-4 border-[#3f2314] shadow-[8px_8px_0px_#000000] p-6 text-[#faf5ec]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header with Pixel aesthetic */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-[#3f2314] mb-5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#f59e0b]"></span>
            <h3 className="font-pixel text-xs sm:text-sm text-[#faf5ec]">
              VINCULAR CANAL YOUTUBE
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#3f2314] text-[#a89582] hover:text-white transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative lead text */}
        <p className="text-xs text-[#c9b7a1] leading-relaxed mb-4">
          Conecta fácilmente esta web con tu canal de YouTube <strong className="text-[#f59e0b]">retrobrownie</strong>. Todos los botones de suscripción, enlaces y llamadas a la acción se actualizarán de forma instantánea.
        </p>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#faf5ec] mb-1">
              Nombre del Canal
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="retrobrownie"
              className="w-full bg-[#100905] border-2 border-[#3f2314] focus:border-[#f59e0b] px-3 py-2 text-xs text-[#faf5ec] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#faf5ec] mb-1">
              Usuario / Handle de YouTube
            </label>
            <div className="flex items-center">
              <span className="bg-[#24140b] border-2 border-r-0 border-[#3f2314] px-3 py-2 text-xs text-[#9a8570]">
                youtube.com/
              </span>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="@retrobrownie"
                className="w-full bg-[#100905] border-2 border-[#3f2314] focus:border-[#f59e0b] px-3 py-2 text-xs text-[#faf5ec] outline-none"
                required
              />
            </div>
            <p className="text-[11px] text-[#8c7764] mt-1">
              Ejemplo: @retrobrownie
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#faf5ec] mb-1">
              Enlace de la Playlist de «Programas Completos / Retroanálisis»
            </label>
            <input
              type="url"
              value={programasPlaylistUrl}
              onChange={(e) => setProgramasPlaylistUrl(e.target.value)}
              placeholder="https://youtube.com/playlist?list=..."
              className="w-full bg-[#100905] border-2 border-[#3f2314] focus:border-[#f59e0b] px-3 py-2 text-xs text-[#faf5ec] outline-none"
            />
            <p className="text-[11px] text-[#8c7764] mt-1">
              Link al que redirigen los botones de Programas Completos / Retroanálisis Gameplay.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#faf5ec] mb-1">
              Enlace de la Playlist de «Cápsulas / Brownie Bites»
            </label>
            <input
              type="url"
              value={capsulasPlaylistUrl}
              onChange={(e) => setCapsulasPlaylistUrl(e.target.value)}
              placeholder="https://youtube.com/playlist?list=..."
              className="w-full bg-[#100905] border-2 border-[#3f2314] focus:border-[#f59e0b] px-3 py-2 text-xs text-[#faf5ec] outline-none"
            />
            <p className="text-[11px] text-[#8c7764] mt-1">
              Link al que redirigen los botones de Cápsulas / Brownie Bites.
            </p>
          </div>

          {/* Quick test any YouTube Video ID or URL */}
          <div className="pt-3 border-t border-[#3f2314]">
            <label className="block text-xs font-semibold text-[#fcd34d] mb-1">
              Probar un vídeo tuyo en el televisor CRT
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={testVideoUrl}
                onChange={(e) => setTestVideoUrl(e.target.value)}
                placeholder="Pega la URL de tu vídeo de YouTube..."
                className="flex-1 bg-[#100905] border-2 border-[#3f2314] focus:border-[#f59e0b] px-3 py-2 text-xs text-[#faf5ec] outline-none"
              />
              <button
                type="button"
                onClick={handleTestVideo}
                disabled={!testVideoUrl.trim()}
                className="pixel-button px-3 py-2 bg-[#d97706] hover:bg-[#b45309] text-black text-xs font-bold whitespace-nowrap disabled:opacity-50 cursor-pointer"
              >
                Cargar
              </button>
            </div>
          </div>

          {/* Success feedback */}
          {successMsg && (
            <div className="p-2 bg-emerald-950/80 border border-emerald-600 text-xs text-emerald-300 flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Modal Actions */}
          <div className="flex items-center justify-between pt-4 border-t-2 border-[#3f2314]">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-[#8c7764] hover:text-[#d6c7b2] flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-xs text-[#a89582] hover:text-[#faf5ec] cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="pixel-button px-4 py-2 bg-[#f59e0b] hover:bg-[#d97706] text-black font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Guardar Enlaces</span>
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
