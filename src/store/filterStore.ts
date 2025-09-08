import { create } from 'zustand';

interface FilterState {
  month: number,
  year: number,
  setMonth: (month: number) => void,
  setYear: (year: number) => void
}

export const useFilterStore = create<FilterState>((set) => ({
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  setMonth: (month) => set({ month }),
  setYear: (year) => set({ year })
}))