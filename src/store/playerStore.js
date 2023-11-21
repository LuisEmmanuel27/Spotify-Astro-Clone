import { create } from "zustand";

export const usePlayerSotre = create((set) => ({
    isPlaying: false,
    currentMusic: { playlist: null, song: null, songs: [] },
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    setCurrentSong: (currentSong) => set({ currentSong }),
}));