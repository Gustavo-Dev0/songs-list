import { create } from "zustand";
import { YouTubeOEmbed } from "../types";

export type Song = {
  id: string;
  videoId: string;
  details?: YouTubeOEmbed;
};

interface IPlaylistStore {
  currentSong: Song | null;
  playList: Song[];
  setCurrentSong: (song: Song) => void;
  addToPlayList: (song: Song) => void;
  removeFromPlayList: (id: Song) => void;
  playNext: () => void;
  playPrev: () => void;
  fetchSongDetails: (song: Song) => Promise<void>;
  fetchSongs: () => Promise<void>;
}

const exampleSongs: Song[] = [
  { id: crypto.randomUUID(), videoId: "V3R06qkyiUo" },
  { id: crypto.randomUUID(), videoId: "idFGrL2EH8c" },
  { id: crypto.randomUUID(), videoId: "_ulh3hkEMUQ" },
  { id: crypto.randomUUID(), videoId: "A2aixdFINOQ" },
  { id: crypto.randomUUID(), videoId: "mnwoxXWgosg" },
  { id: crypto.randomUUID(), videoId: "teQKBcRImWc" },
]

const exampleYT = {
  title: 'Example Title',
  author_name: 'Example Author',
  author_url: 'https://example.com/author',
  type: 'video',
  version: '1.0',
  provider_name: 'Example Provider',
  provider_url: 'https://example.com/provider',
  thumbnail_url: 'https://example.com/thumbnail.jpg',
};

const usePlaylistStore = create<IPlaylistStore>((set) => ({
  currentSong: null,
  playList: [],
  setCurrentSong: (song) => set({ currentSong: song }),

  addToPlayList: (song) => set((state) => ({ playList: [...state.playList, song] })),

  removeFromPlayList: (song: Song) =>
    set((state) => ({ playList: state.playList.filter((s) => s.id !== song.id) })),

  playNext: () =>
    set((state) => {
      const currentSongIndex = state.playList.findIndex(
        (song) => song.id === state.currentSong?.id
      )
      if (currentSongIndex === -1) {
        return { currentSong: state.playList[0] }
      }

      const nextSongIndex = (currentSongIndex + 1) % state.playList.length
      const nextSong = state.playList[nextSongIndex]
      return { currentSong: nextSong };
    }),
  playPrev: () => {
    set((state) => {
      const currentSongIndex = state.playList.findIndex(
        (song) => song.id === state.currentSong?.id
      )
      if (currentSongIndex === -1) {
        return { currentSong: state.playList[0] }
      }

      const prevSongIndex = (currentSongIndex - 1 + state.playList.length) % state.playList.length
      const prevSong = state.playList[prevSongIndex]
      return { currentSong: prevSong };
    })
  },
  fetchSongDetails: async (song: Song) => {
    try {

      const response = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${song.videoId}&format=json`
      );
      const data: YouTubeOEmbed = await response.json();

      // Actualizar solo la canción específica
      set((state) => ({
        playList: state.playList.map((s) =>
          s.id === song.id ? { ...s, details: data } : s
        ),
      }));
    } catch (error) {
      console.error(`Error al cargar detalles de la canción ${song.videoId}:`, error);
      set((state) => ({
        playList: state.playList.map((s) =>
          s.id === song.id ? { ...s, details: structuredClone(exampleYT) } : s
        ),
      }));
    }
  },
  fetchSongs: async () => {
    try {
      const response = { data: exampleSongs };
      set({ playList: response.data, currentSong: response.data[0] });

    } catch (error) {
      console.error("Error al cargar canciones:", error);
    }
  },

}));

export default usePlaylistStore;