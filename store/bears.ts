import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type BearState = {
    bears: number
    increasePopulation: () => void
    removeAllBears: () => void
    updateBears: (newBears: number) => void
}

export const useStore = create<BearState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}))

export const usePersistedStore = create(
  persist<BearState>(
    (set) => ({
      bears: 0,
      increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
      removeAllBears: () => set({ bears: 0 }),
      updateBears: (newBears) => set({ bears: newBears }),
    }),
    {
      name: 'bear-storage', // unique name
    }
  )
)

// Above code is for reference