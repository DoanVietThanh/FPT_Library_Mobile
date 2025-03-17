import { PredictResult } from '~/types/models'
import * as ImagePicker from 'expo-image-picker'
import { create } from 'zustand'

type TPrediction = {
  uploadedImage: ImagePicker.ImagePickerSuccessResult | null
  setUploadImage: (image: ImagePicker.ImagePickerSuccessResult) => void
  detectedLibraryItemIds: number[]
  setDetectedLibraryItemIds: (ids: number[]) => void
  bestMatchedLibraryItemId: number | null
  setBestMatchedLibraryItemId: (id: number) => void
  predictResult: PredictResult | null
  setPredictResult: (result: PredictResult) => void
}

export const usePrediction = create<TPrediction>((set) => ({
  uploadedImage: null,
  setUploadImage: (image: ImagePicker.ImagePickerSuccessResult) => set({ uploadedImage: image }),

  detectedLibraryItemIds: [],
  setDetectedLibraryItemIds: (ids: number[]) => set({ detectedLibraryItemIds: ids }),

  bestMatchedLibraryItemId: null,
  setBestMatchedLibraryItemId: (id: number) => set({ bestMatchedLibraryItemId: id }),

  predictResult: null,
  setPredictResult: (result: PredictResult) => set({ predictResult: result }),
}))
