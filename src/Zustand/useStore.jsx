import { create } from "zustand";

const useStore = create((set) => ({
  colors: [], // Initialize as an array
  setColors: (newColors) => set(() => ({ colors: newColors })),
}));

export default useStore;
