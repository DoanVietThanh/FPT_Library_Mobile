import { EventEmitter } from 'events'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LocalStorageKeys } from '~/types/enum'

// Tạo một EventEmitter toàn cục để thay cho window.dispatchEvent
export const storageEventEmitter = new EventEmitter()

export const localStorageHandler = {
  getItem: async (key: LocalStorageKeys): Promise<string[]> => {
    try {
      const value = await AsyncStorage.getItem(key)
      return value ? JSON.parse(value) : []
    } catch (error) {
      console.error('Error reading item from AsyncStorage:', error)
      return []
    }
  },

  setItem: async (key: LocalStorageKeys, bookId: string): Promise<void> => {
    try {
      const existingValue = await AsyncStorage.getItem(key)
      let updatedList: string[] = []

      if (existingValue) {
        const parsedList: string[] = JSON.parse(existingValue)
        updatedList = parsedList.includes(bookId)
          ? parsedList.filter((id) => id !== bookId)
          : [...parsedList, bookId]
      } else {
        updatedList = [bookId]
      }

      await AsyncStorage.setItem(key, JSON.stringify(updatedList))
      storageEventEmitter.emit(key)
    } catch (error) {
      console.error('Error setting item in AsyncStorage:', error)
    }
  },

  addRecentItem: async (key: LocalStorageKeys, bookId: string): Promise<void> => {
    try {
      const existingValue = await AsyncStorage.getItem(key)
      let updatedRecentItems: string[] = []

      if (existingValue) {
        const parsedList: string[] = JSON.parse(existingValue)
        const filteredList = parsedList.filter((id) => id !== bookId)
        updatedRecentItems = [bookId, ...filteredList].slice(0, 5)
      } else {
        updatedRecentItems = [bookId]
      }

      await AsyncStorage.setItem(key, JSON.stringify(updatedRecentItems))
      storageEventEmitter.emit(key)
    } catch (error) {
      console.error('Error adding recent item:', error)
    }
  },

  clear: async (key: LocalStorageKeys): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key)
      storageEventEmitter.emit(key)
    } catch (error) {
      console.error('Error clearing item from AsyncStorage:', error)
    }
  },
}
