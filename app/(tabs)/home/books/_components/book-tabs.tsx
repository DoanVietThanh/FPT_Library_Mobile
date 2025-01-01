import { useState } from 'react'
import { View } from 'react-native'
import { Separator } from '~/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { Text } from '~/components/ui/text'
import { ScrollView } from 'react-native-gesture-handler'

import BookTabOverview from './book-tab-overview'

export default function BookTabs() {
  const [value, setValue] = useState<string>('overview')
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
            <TabsTrigger value="overview" className="flex-1">
              <Text>Overview</Text>
            </TabsTrigger>
            <TabsTrigger value="view-edition" className="flex-1">
              <Text>View Edition</Text>
            </TabsTrigger>
            <TabsTrigger value="details" className="flex-1">
              <Text>Details</Text>
            </TabsTrigger>
            <TabsTrigger value="review" className="flex-1">
              <Text>Review</Text>
            </TabsTrigger>
            <TabsTrigger value="list" className="flex-1">
              <Text>List</Text>
            </TabsTrigger>
            <TabsTrigger value="related-books" className="flex-1">
              <Text>Related books</Text>
            </TabsTrigger>
          </TabsList>
        </ScrollView>

        <Separator />

        <TabsContent value="overview">
          <BookTabOverview />
        </TabsContent>
        <TabsContent value="view-edition">
          <View>
            <Text>View edition</Text>
          </View>
        </TabsContent>
        <TabsContent value="details">
          <View>
            <Text>Details</Text>
          </View>
        </TabsContent>
        <TabsContent value="review">
          <View>
            <Text>Review</Text>
          </View>
        </TabsContent>
        <TabsContent value="list">
          <View>
            <Text>List</Text>
          </View>
        </TabsContent>
        <TabsContent value="related-books">
          <View>
            <Text>Related books</Text>
          </View>
        </TabsContent>
      </Tabs>
    </View>
  )
}
