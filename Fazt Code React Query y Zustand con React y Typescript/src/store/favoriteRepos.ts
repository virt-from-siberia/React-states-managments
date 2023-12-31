import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

type FavoriteReposState = {
  favoriteReposIds: number[];
  addFavoriteRepo: (id: number) => void;
  removeFavoriteRepo: (id: number) => void;
};

export const useFavoriteReposStore = create<FavoriteReposState>()(
  devtools(
    persist(
      immer((set) => ({
        favoriteReposIds: [],
        addFavoriteRepo: (id) =>
          set((state) => {
            state.favoriteReposIds.push(id);
          }),
        removeFavoriteRepo: (id) =>
          set((state) => {
            const index = state.favoriteReposIds.indexOf(id);
            if (index !== -1) state.favoriteReposIds.splice(index, 1);
          }),
      })),
      {
        name: "favorite-repos", // название для сохранения состояния в localStorage
      }
    )
  )
);
