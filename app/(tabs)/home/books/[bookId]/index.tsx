import React from 'react'
import { View } from 'react-native'
import LibraryItemInfo from '~/components/ui/library-item-info'
import useGetLibraryItem from '~/hooks/library-items/use-get-libraryItem'
import { useLocalSearchParams } from 'expo-router'
import { Loader } from 'lucide-react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import BookAuthorCard from '../_components/book-cards/author-card'
import BookPreviewCard from '../_components/book-cards/book-preview-card'
import BookTabs from '../_components/book-tabs'

const BookDetail = () => {
  const { bookId } = useLocalSearchParams()
  const { data: libraryItem, isLoading } = useGetLibraryItem(bookId as string)

  if (isLoading) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <Loader className="size-9 animate-spin" />
      </View>
    )
  }

  if (!libraryItem) {
    return null
  }

  return (
    <>
      <SafeAreaView className="m-0 flex-1 p-0" edges={['left', 'right']}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false} overScrollMode="never">
          <View className="min-h-screen-safe flex flex-col gap-2 bg-secondary px-6 pb-6">
            <BookPreviewCard libraryItem={libraryItem} />
            <LibraryItemInfo libraryItem={libraryItem} />
            <BookAuthorCard libraryItem={libraryItem} />
            <BookTabs libraryItemId={bookId as string} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default BookDetail
