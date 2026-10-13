export type ContentCategory = 'programas' | 'podcasts' | 'reportajes' | 'cortos';

export interface PodcastSeries {
  id: string;
  title: string;
  playlistUrl: string;
  playlistId: string;
  description: string;
  badge: string;
  episodesCount: number;
}

export interface ReportajeSeries {
  id: string;
  title: string;
  playlistUrl: string;
  playlistId: string;
  description: string;
  badge: string;
  episodesCount: number;
}

export interface CapsulaSeries {
  id: string;
  title: string;
  playlistUrl: string;
  playlistId: string;
  description: string;
  badge: string;
  episodesCount: number;
}

export interface ProgramaSeries {
  id: string;
  title: string;
  playlistUrl: string;
  playlistId: string;
  description: string;
  badge: string;
  episodesCount: number;
}

export interface EpisodeItem {
  id: string;
  title: string;
  slug: string;
  category: ContentCategory;
  categoryLabel: string;
  programaSeriesId?: string;
  podcastSeriesId?: string;
  reportajeSeriesId?: string;
  capsulasSeriesId?: string;
  duration: string;
  releaseDate: string;
  youtubeId: string;
  youtubeUrl: string;
  summary: string;
  guestOrTopic?: string;
  tags: string[];
  era: '80s' | '90s' | '80s/90s';
  thumbnailUrl: string;
  timestamps?: { time: string; label: string }[];
  featured?: boolean;
}

export interface ChannelConfig {
  channelHandle: string;
  channelName: string;
  channelUrl: string;
  subscribeUrl: string;
  capsulasPlaylistUrl?: string;
  programasPlaylistUrl?: string;
  customVideoId?: string;
}
