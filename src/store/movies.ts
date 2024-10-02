import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Movie } from "../types";

const useMovieStore = create(
  persist<{
    movies: Movie[];
    setMovies: (movies: Movie[]) => void;
  }>(
    (set) => ({
      movies: [],
      setMovies: (movies) => set({ movies }),
    }),
    {
      name: "movie-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useMovieList = useMovieStore;
