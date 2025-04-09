import React from 'react'
import { Text, View } from 'react-native'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import { Input } from '~/components/ui/input'
import Loading from '~/components/ui/loading'
import { useAuth } from '~/contexts/auth-provider'
import { useLibraryStorage } from '~/contexts/library-provider'
import { useBorrowStore } from '~/store/borrow/use-borrow-store'
import { Href, useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import BorrowLibraryItemCard from './_components/borrow-library-item-card'
import BorrowResourceCard from './_components/borrow-resource-card'

const BorrowsPage = () => {
  const router = useRouter()
  const { t } = useTranslation('BookPage')
  const { user, isLoadingAuth } = useAuth()

  // Get from context
  const {
    selectedLibraryItemIds,
    selectedResourceIds,
    setSelectedLibraryItemIds,
    setSelectedResourceIds,
  } = useBorrowStore()

  // Get from async storage
  const { borrowedLibraryItems, borrowedResources } = useLibraryStorage()

  if (isLoadingAuth) {
    return <Loading />
  }

  return (
    <>
      <SafeAreaView className="m-0 flex-1 p-0" edges={['left', 'right']}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false} overScrollMode="never">
          <View className="min-h-screen-safe flex flex-col gap-y-2 bg-secondary p-6 ">
            <View>
              <Text className="text-2xl font-semibold">Borrow list</Text>
            </View>

            {/* Search */}
            <View>
              <Input placeholder="Search" className="bg-background" />
            </View>

            <View className="flex-row items-center justify-between gap-2">
              <View className="flex flex-row gap-2">
                <Checkbox
                  checked={
                    selectedLibraryItemIds.length + selectedResourceIds.length ===
                    borrowedLibraryItems.items.length + borrowedResources.items.length
                  }
                  onCheckedChange={() => {
                    if (
                      selectedLibraryItemIds.length + selectedResourceIds.length ===
                      borrowedLibraryItems.items.length + borrowedResources.items.length
                    ) {
                      setSelectedLibraryItemIds([])
                      setSelectedResourceIds([])
                    } else {
                      setSelectedLibraryItemIds(borrowedLibraryItems.items)
                      setSelectedResourceIds(borrowedResources.items)
                    }
                  }}
                />

                <Text className="font-semibold">
                  Select all ({selectedLibraryItemIds.length + selectedResourceIds.length}/
                  {borrowedLibraryItems.items.length + borrowedResources.items.length})
                </Text>
              </View>

              <Button
                size={'default'}
                disabled={
                  !user || (selectedLibraryItemIds.length === 0 && selectedResourceIds.length === 0)
                }
                onPress={() => router.push('/(tabs)/home/borrows/check-available' as Href)}
              >
                <Text className="text-primary-foreground">Borrow</Text>
              </Button>
            </View>

            <Text>borrowedLibraryItems: {JSON.stringify(borrowedLibraryItems)}</Text>
            <Text>borrowedResources: {JSON.stringify(borrowedResources)}</Text>
            <Text>selectedLibraryItemIds: {JSON.stringify(selectedLibraryItemIds)}</Text>
            <Text>selectedResourceIds: {JSON.stringify(selectedResourceIds)}</Text>

            {/* Get Library items from storage */}
            <View className="flex flex-col gap-4">
              <Text className="font-semibold">{t('books')}</Text>
              {borrowedLibraryItems.items &&
                borrowedLibraryItems.items.length > 0 &&
                borrowedLibraryItems.items.map((id) => (
                  <BorrowLibraryItemCard key={id} libraryItemId={id} />
                ))}
            </View>

            {/* Get Resources from storage */}
            <View className="flex flex-col gap-4">
              <Text className="font-semibold">{t('resources')}</Text>
              {borrowedResources.items &&
                borrowedResources.items.length > 0 &&
                borrowedResources.items.map((id) => (
                  <BorrowResourceCard key={id} resourceId={id} />
                ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default BorrowsPage
