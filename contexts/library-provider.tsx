'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LocalStorageKeys } from '~/types/enum'

type StorageContextType = {
  // Dữ liệu được lưu trữ cho mỗi key
  storedItems: {
    [key in LocalStorageKeys]?: number[]
  }

  // Các hàm thao tác với dữ liệu
  addItem: (key: LocalStorageKeys, itemId: number) => Promise<void>
  removeItem: (key: LocalStorageKeys, itemId: number) => Promise<void>
  toggleItem: (key: LocalStorageKeys, itemId: number) => Promise<void>
  clearItems: (key: LocalStorageKeys) => Promise<void>
  isItemStored: (key: LocalStorageKeys, itemId: number) => boolean

  // Các hàm tiện ích cho từng loại dữ liệu cụ thể
  favorites: {
    items: number[]
    add: (itemId: number) => Promise<void>
    remove: (itemId: number) => Promise<void>
    toggle: (itemId: number) => Promise<void>
    has: (itemId: number) => boolean
    clear: () => Promise<void>
  }
  recentlyOpened: {
    items: number[]
    add: (itemId: number) => Promise<void>
    remove: (itemId: number) => Promise<void>
    clear: () => Promise<void>
  }
  borrowedLibraryItems: {
    items: number[]
    add: (itemId: number) => Promise<void>
    remove: (itemId: number) => Promise<void>
    toggle: (itemId: number) => Promise<void>
    has: (itemId: number) => boolean
    clear: () => Promise<void>
  }
  borrowedResources: {
    items: number[]
    add: (itemId: number) => Promise<void>
    remove: (itemId: number) => Promise<void>
    toggle: (itemId: number) => Promise<void>
    has: (itemId: number) => boolean
    clear: () => Promise<void>
  }
}

const StorageContext = createContext<StorageContextType | undefined>(undefined)

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [storedItems, setStoredItems] = useState<{
    [key in LocalStorageKeys]?: number[]
  }>({})

  useEffect(() => {
    const loadAllStoredItems = async () => {
      try {
        const loadedItems: { [key in LocalStorageKeys]?: number[] } = {}

        await Promise.all(
          Object.values(LocalStorageKeys).map(async (key) => {
            const storedData = await AsyncStorage.getItem(key)
            if (storedData) {
              loadedItems[key as LocalStorageKeys] = JSON.parse(storedData)
            } else {
              loadedItems[key as LocalStorageKeys] = []
            }
          }),
        )

        setStoredItems(loadedItems)
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error)
      }
    }

    loadAllStoredItems()
  }, [])

  // Lưu dữ liệu vào AsyncStorage
  const saveItems = async (key: LocalStorageKeys, items: number[]) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(items))

      // Cập nhật state
      setStoredItems((prev) => ({
        ...prev,
        [key]: items,
      }))
    } catch (error) {
      console.error(`Error saving items for key ${key}:`, error)
    }
  }

  // Thêm một item vào danh sách
  const addItem = async (key: LocalStorageKeys, itemId: number) => {
    const currentItems = storedItems[key] || []

    // Chỉ thêm nếu item chưa tồn tại
    if (!currentItems.includes(itemId)) {
      const updatedItems = [...currentItems, itemId]
      await saveItems(key, updatedItems)
    }
  }

  // Xóa một item khỏi danh sách
  const removeItem = async (key: LocalStorageKeys, itemId: number) => {
    const currentItems = storedItems[key] || []
    const updatedItems = currentItems.filter((id) => id !== itemId)
    await saveItems(key, updatedItems)
  }

  // Toggle một item (thêm nếu chưa có, xóa nếu đã có)
  const toggleItem = async (key: LocalStorageKeys, itemId: number) => {
    const currentItems = storedItems[key] || []

    if (currentItems.includes(itemId)) {
      await removeItem(key, itemId)
    } else {
      await addItem(key, itemId)
    }
  }

  const clearItems = async (key: LocalStorageKeys) => {
    await saveItems(key, [])
  }

  // Kiểm tra xem một item có trong danh sách không
  const isItemStored = (key: LocalStorageKeys, itemId: number) => {
    const items = storedItems[key] || []
    return items.includes(itemId)
  }

  const favorites = {
    items: storedItems[LocalStorageKeys.FAVORITE] || [],
    add: (itemId: number) => addItem(LocalStorageKeys.FAVORITE, itemId),
    remove: (itemId: number) => removeItem(LocalStorageKeys.FAVORITE, itemId),
    toggle: (itemId: number) => toggleItem(LocalStorageKeys.FAVORITE, itemId),
    has: (itemId: number) => favorites.items.includes(itemId),
    clear: () => clearItems(LocalStorageKeys.FAVORITE),
  }

  const recentlyOpened = {
    items: storedItems[LocalStorageKeys.OPENING_RECENT] || [],
    add: (itemId: number) => addItem(LocalStorageKeys.OPENING_RECENT, itemId),
    remove: (itemId: number) => removeItem(LocalStorageKeys.OPENING_RECENT, itemId),
    clear: () => clearItems(LocalStorageKeys.OPENING_RECENT),
  }

  const borrowedLibraryItems = {
    items: storedItems[LocalStorageKeys.BORROW_LIBRARY_ITEM_IDS] || [],
    add: (itemId: number) => addItem(LocalStorageKeys.BORROW_LIBRARY_ITEM_IDS, itemId),
    remove: (itemId: number) => removeItem(LocalStorageKeys.BORROW_LIBRARY_ITEM_IDS, itemId),
    toggle: (itemId: number) => toggleItem(LocalStorageKeys.BORROW_LIBRARY_ITEM_IDS, itemId),
    has: (itemId: number) => borrowedLibraryItems.items.includes(itemId),
    clear: () => clearItems(LocalStorageKeys.BORROW_LIBRARY_ITEM_IDS),
  }

  const borrowedResources = {
    items: storedItems[LocalStorageKeys.BORROW_RESOURCE_IDS] || [],
    add: (itemId: number) => addItem(LocalStorageKeys.BORROW_RESOURCE_IDS, itemId),
    remove: (itemId: number) => removeItem(LocalStorageKeys.BORROW_RESOURCE_IDS, itemId),
    toggle: (itemId: number) => toggleItem(LocalStorageKeys.BORROW_RESOURCE_IDS, itemId),
    has: (itemId: number) => borrowedResources.items.includes(itemId),
    clear: () => clearItems(LocalStorageKeys.BORROW_RESOURCE_IDS),
  }

  const contextValue: StorageContextType = {
    storedItems,
    addItem,
    removeItem,
    toggleItem,
    clearItems,
    isItemStored,
    favorites,
    recentlyOpened,
    borrowedLibraryItems,
    borrowedResources,
  }

  return <StorageContext.Provider value={contextValue}>{children}</StorageContext.Provider>
}

// Custom hook để sử dụng context
export const useLibraryStorage = () => {
  const context = useContext(StorageContext)
  if (context === undefined) {
    throw new Error('useLibraryStorage must be used within a LibraryStorageProvider')
  }
  return context
}
