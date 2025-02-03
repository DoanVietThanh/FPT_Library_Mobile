import React from 'react'
import { Image, Text, View } from 'react-native'
import { dummyBooks } from '~/components/home/dummy-books'
import { Separator } from '~/components/ui/separator'
import { LibraryItem } from '~/types/models'
import { Cake, Earth, User } from 'lucide-react-native'
import { ScrollView } from 'react-native-gesture-handler'

type Props = {
  libraryItem: LibraryItem
}

const BookAuthorCard = ({ libraryItem }: Props) => {
  console.log('🚀 ~ BookAuthorCard ~ libraryItem?:', libraryItem)

  if (libraryItem.authors.length === 0) {
    return (
      <View className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-background p-4">
        <Text>No authors found</Text>
      </View>
    )
  }

  return (
    <View className="flex w-full flex-col gap-4 rounded-lg bg-background p-4">
      <View className="flex flex-row gap-2">
        <Text className="text-xl font-bold text-primary">About</Text>
        <Text className="text-xl font-bold">Author</Text>
      </View>
      <View className="flex flex-row justify-between gap-4">
        <View className="flex flex-col justify-center gap-4">
          <View className="flex flex-row items-center gap-2">
            <User size={20} color="gray" />
            <Text className="text-lg">{libraryItem?.authors[0]?.fullName || ''}</Text>
          </View>

          {libraryItem.authors[0].dob && (
            <View className="flex flex-row items-center gap-2">
              <Cake size={20} color="gray" />
              <Text className="text-sm">
                {new Date(libraryItem.authors[0]?.dob).toDateString()}
              </Text>
            </View>
          )}

          <View className="flex flex-row items-center gap-2">
            <Earth size={20} color="gray" />
            <Text className="text-sm">{libraryItem.authors[0].nationality}</Text>
          </View>
        </View>
        <Image
          alt="author"
          source={{
            uri: libraryItem?.authors[0].authorImage as string,
          }}
          className="h-20 w-20 rounded-lg object-contain"
        />
      </View>
      <Text className="text-justify text-sm">{libraryItem.authors[0]?.biography}</Text>

      <Separator />
      <View className="flex flex-row gap-2">
        <Text className="text-xl font-bold text-primary">Other</Text>
        <Text className="text-xl font-bold">Books</Text>
      </View>
      <ScrollView horizontal>
        <View className="flex flex-row gap-4">
          {dummyBooks.map((book) => (
            <View key={book.id} className="flex flex-row">
              <Image source={{ uri: book.image }} className="h-20 w-20 rounded-lg object-contain" />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default BookAuthorCard
