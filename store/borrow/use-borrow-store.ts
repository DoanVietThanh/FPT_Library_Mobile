import { create } from 'zustand'

export interface BorrowStore {
  selectedLibraryItemIds: number[]
  selectedResourceIds: number[]
  setSelectedLibraryItemIds: (value: number[]) => void
  setSelectedResourceIds: (value: number[]) => void
}

export const useBorrowStore = create<BorrowStore>((set) => ({
  selectedLibraryItemIds: [],
  selectedResourceIds: [],
  setSelectedLibraryItemIds: (value) => set(() => ({ selectedLibraryItemIds: value })),
  setSelectedResourceIds: (value) => set(() => ({ selectedResourceIds: value })),
}))
