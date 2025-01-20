import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { dummyBooks } from '~/components/home/dummy-books'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { useLocalSearchParams } from 'expo-router'
import {
  Book,
  BookOpen,
  CheckCircle2,
  Headphones,
  Heart,
  MapPin,
  NotebookPen,
  Share2,
  Star,
} from 'lucide-react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import BookAuthor from './_components/book-author'
import BookTabs from './_components/book-tabs'

const BookDetail = () => {
  const { bookId } = useLocalSearchParams()

  const book = dummyBooks.find((book) => book.id.toString() === bookId)

  if (!book) {
    return null
  }

  return (
    <>
      <SafeAreaView className="m-0 flex-1 p-0" edges={['left', 'right', 'bottom']}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="min-h-screen-safe flex flex-col gap-y-6 bg-secondary p-6">
            <View className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-primary-foreground p-4 ">
              <Image
                source={{ uri: book?.image }}
                className="h-96 w-2/3 rounded-lg object-contain"
              />

              <View className="flex w-full justify-between gap-y-4">
                <Pressable className="flex flex-1 flex-row items-center justify-center gap-4 rounded-lg bg-primary p-2 text-primary-foreground">
                  <MapPin size={16} color={'white'} />
                  <Text className="text-sm text-primary-foreground">Locate</Text>
                </Pressable>
                <View className="flex flex-1 flex-row items-center justify-center gap-4">
                  <Pressable className="flex flex-1 flex-row items-center justify-center gap-4">
                    <NotebookPen size={16} />
                    <Text>Review</Text>
                  </Pressable>
                  <Pressable className="flex flex-1 flex-row items-center justify-center gap-4">
                    <Share2 size={16} />
                    <Text>Share</Text>
                  </Pressable>
                </View>
              </View>
            </View>

            {/* Book */}
            <View className="flex w-full flex-col gap-4 rounded-lg bg-primary-foreground p-4">
              <Text className="text-sm font-semibold italic">An edition of The ... (1939)</Text>
              <Text className="text-xl font-semibold text-primary">{book?.title}</Text>
              <Text className="text-md font-medium">by {book?.author}</Text>
              <View className="flex flex-row items-center justify-between gap-2">
                <View className="flex flex-row items-center gap-2">
                  <Star size={16} color="orange" fill={'orange'} />
                  <Text className="font-semibold">5 / 5</Text>
                </View>
                <Text className="font-semibold">25 reading</Text>
                <Text className="font-semibold">119 have read</Text>
              </View>
              <Separator />
              {/* Availability */}
              <View>
                <Text className="text-lg font-semibold text-primary">Availability</Text>
                <View className="flex flex-row justify-between gap-4">
                  <View className="flex flex-1 flex-row gap-2">
                    <CheckCircle2 size={16} color="white" fill="#42bb4e" />
                    <Text className="text-sm">Hard copy</Text>
                  </View>
                  <View className="flex flex-1 flex-row gap-2">
                    <CheckCircle2 size={16} color="white" fill="#42bb4e" />
                    <Text className="text-sm">E-book</Text>
                  </View>
                  <View className="flex flex-1 flex-row gap-2">
                    <CheckCircle2 size={16} color="white" fill="#42bb4e" />
                    <Text className="text-sm">Audio book</Text>
                  </View>
                </View>
              </View>

              {/* Status */}
              <View>
                <Text className="text-lg font-semibold text-primary">Status</Text>
                <View className="flex w-full flex-row justify-between gap-4">
                  <View className="flex flex-1 flex-row gap-2 ">
                    <CheckCircle2 size={16} color="white" fill="#42bb4e" />
                    <Text className="text-sm">Available</Text>
                  </View>
                  <View className="flex flex-1 flex-row gap-2 ">
                    <MapPin size={16} color="white" fill="orange" />
                    <Text className="text-sm">CS A-15</Text>
                  </View>
                </View>
              </View>

              <Separator />
              <View className="flex flex-row items-center justify-between gap-4">
                <Button variant={'outline'} className="flex flex-row items-center gap-2 ">
                  <Heart size={24} color={'red'} className="text-primary-foreground" />
                </Button>
                <Button className="flex flex-row items-center gap-2 ">
                  <Book size={16} color={'white'} className="text-primary-foreground" />
                  <Text className="text-sm font-semibold text-primary-foreground">Borrow</Text>
                </Button>
                <Button variant={'destructive'} className="flex flex-row items-center gap-2 ">
                  <Headphones size={24} color={'white'} className="text-primary-foreground" />
                </Button>
                <Button variant={'destructive'} className="flex flex-row items-center gap-2 ">
                  <BookOpen size={24} color={'white'} className="text-primary-foreground" />
                </Button>
              </View>

              <Separator />
              {/* Description */}
              <View>
                <Text className="text-justify text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos et tempore ducimus
                  aliquid minus accusamus culpa necessitatibus cum soluta molestias.
                </Text>
                <Text className="w-full text-right text-sm font-semibold ">More...</Text>
              </View>
            </View>

            <BookAuthor book={book} />
            <BookTabs />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default BookDetail
