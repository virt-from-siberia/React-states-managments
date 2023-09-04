import { create } from "zustand";

type FavoriteRepoStoreType = {
  favoriteReposIds: number[];
  addToFavorites: (id: number) => void;
  removeFromFavorites: (id: number) => void;
};

const useFavoriteStore = create<FavoriteRepoStoreType>(() => ({
  favoriteReposIds: [],
  addToFavorites: (id: number) => {
    set((state) => ({
      favoriteReposIds: [...state.favoriteReposIds, id],
    }));
  },
  removeFromFavorites: () => null,
}));
