import { create } from 'zustand'

export interface BackupCodeStore {
  token: string
  otp: string
  setToken: (value: string) => void
  setOtp: (value: string) => void
}

export const useBackupCodesStore = create<BackupCodeStore>((set) => ({
  token: '',
  otp: '',
  setToken: (value) => set(() => ({ token: value })),
  setOtp: (value) => set(() => ({ otp: value })),
}))
