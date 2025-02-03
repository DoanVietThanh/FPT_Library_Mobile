import React from 'react'
import { Image, Text, View } from 'react-native'
import { dummyBooks } from '~/components/home/dummy-books'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Separator } from '~/components/ui/separator'
import { Stack } from 'expo-router'
import { Filter } from 'lucide-react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

const SearchBookResult = () => {
  const book = dummyBooks[0]

  return (
    <>
      <Stack.Screen options={{ title: 'Search Book Result' }} />
      <SafeAreaView className="m-0 flex-1 p-0" edges={['left', 'right', 'bottom']}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="min-h-screen-safe flex flex-col gap-2 bg-secondary p-6">
            <View className="flex flex-row items-center gap-2">
              <Button variant={'outline'} className="flex flex-row items-center gap-2">
                <Filter size={16} color="black" />
                <Text>Tất cả bộ lọc</Text>
              </Button>
            </View>

            {/* Filter book tabs */}
            {/* <View className="flex flex-1 flex-col gap-2">
              <BookFilterTabs />
            </View> */}
            <View className="flex flex-row items-center justify-between gap-2">
              <Text>Kết quả: {Number(1245).toLocaleString()}</Text>
              <View className="flex flex-row items-center justify-between gap-2">
                <Text>Hiển thị</Text>
                <Text>Mức độ liên quan</Text>
                <Text>More</Text>
              </View>
            </View>

            <View>
              <Card className="w-full p-4">
                <View className="flex flex-row gap-2">
                  <View>
                    <Image
                      source={{
                        uri: book.image,
                      }}
                      className="h-28 w-20 rounded-lg object-contain"
                    />
                  </View>

                  <View>
                    <Text className="text-lg font-semibold">{book.title}</Text>
                    <Text>Tác giả: {book.author}</Text>
                    <Text className="text-sm">Topic: Lorem ipsum dolor sit amet.</Text>
                  </View>
                </View>

                <Separator className="my-2" />

                <Text>Summary</Text>
              </Card>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default SearchBookResult
