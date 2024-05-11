import * as store from "./store";

export function useTodos() {
  return store.todos;
}

export function useTheme() {
  return store.theme;
}
