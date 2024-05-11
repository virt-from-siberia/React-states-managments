import { signal } from "@preact/signals";

export const todos = signal([
  { text: "global todo 1", completed: false },
  { text: "global todo 2", completed: false },
]);

export const theme = signal("light");
