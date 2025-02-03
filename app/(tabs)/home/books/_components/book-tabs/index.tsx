import { useState } from 'react'
import { View } from 'react-native'
import { Separator } from '~/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { Text } from '~/components/ui/text'
import useGetLibraryItem from '~/hooks/library-items/use-get-libraryItem'
import { Loader } from 'react-native-feather'
import { ScrollView } from 'react-native-gesture-handler'

import BookEditionTab from './book-edition-tab'
import BookInstancesTab from './book-instances-tab'
import BookOverviewTab from './book-overview-tab'
import BookRelatedTab from './book-related-tab'
import BookReviewsTab from './book-reviews-tab'

enum EBookTabs {
  overview = 'overview',
  viewEdition = 'view-edition',
  instances = 'instances',
  reviews = 'reviews',
  relatedBooks = 'related-books',
}

type Props = {
  libraryItemId: string
}

export default function BookTabs({ libraryItemId }: Props) {
  const [value, setValue] = useState<string>('overview')
  const { data: libraryItem, isLoading } = useGetLibraryItem(libraryItemId as string)

  if (!libraryItem) {
    return null
  }

  if (isLoading) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <Loader className="size-9 animate-spin" />
      </View>
    )
  }
  return (
    <View className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-primary-foreground p-4 ">
      {/* Title */}
      <View className="flex flex-row gap-2">
        <Text className="text-xl font-bold text-primary">More</Text>
        <Text className="text-xl font-bold">Details</Text>
      </View>
      {/* Tabs */}
      <Tabs
        value={value}
        onValueChange={setValue}
        className="w-full flex-col gap-1 bg-primary-foreground"
      >
        <ScrollView horizontal>
          <TabsList className="w-full flex-row bg-primary-foreground">
            <TabsTrigger value={EBookTabs.overview} className="flex-1">
              <Text>Overview</Text>
            </TabsTrigger>
            <TabsTrigger value={EBookTabs.viewEdition} className="flex-1">
              <Text>View Edition</Text>
            </TabsTrigger>
            <TabsTrigger value={EBookTabs.instances} className="flex-1">
              <Text>Instances</Text>
            </TabsTrigger>
            <TabsTrigger value={EBookTabs.reviews} className="flex-1">
              <Text>Reviews</Text>
            </TabsTrigger>
            <TabsTrigger value={EBookTabs.relatedBooks} className="flex-1">
              <Text>Related books</Text>
            </TabsTrigger>
          </TabsList>
        </ScrollView>
        <Separator />
        {/* Tab contents */}
        <TabsContent value={EBookTabs.overview}>
          <BookOverviewTab libraryItemId={libraryItemId} />
        </TabsContent>
        <TabsContent value={EBookTabs.viewEdition}>
          <BookEditionTab libraryItemId={libraryItemId} />
        </TabsContent>
        <TabsContent value={EBookTabs.instances}>
          <BookInstancesTab libraryItemId={libraryItemId} libraryItem={libraryItem} />
        </TabsContent>
        <TabsContent value={EBookTabs.reviews}>
          <BookReviewsTab libraryItemId={libraryItemId} />
        </TabsContent>
        <TabsContent value={EBookTabs.relatedBooks}>
          <BookRelatedTab libraryItemId={libraryItemId} />
        </TabsContent>
      </Tabs>
    </View>
  )
}
