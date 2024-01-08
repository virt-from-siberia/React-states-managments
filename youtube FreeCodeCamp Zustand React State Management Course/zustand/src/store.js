import { create } from "zustand";

export const store = (set) => ({
  tasks: [{ title: "TestTask", state: "IN_PROGRESS" }],
  addTask: (title, state) => {
    return set((store) => ({ tasks: [...store.tasks, { title, state }] }));
  },
  deleteTask: (title) => {
    return set((store) => ({
      tasks: store.tasks.filter((task) => task.title !== title),
    }));
  },
});

export const useStore = create(store);
