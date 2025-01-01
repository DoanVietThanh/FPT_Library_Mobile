import React from 'react'
import { Image, Text, View } from 'react-native'
import { Book, dummyBooks } from '~/components/home/dummy-books'
import { Separator } from '~/components/ui/separator'
import { Cake, User } from 'lucide-react-native'
import { ScrollView } from 'react-native-gesture-handler'

type Props = {
  book: Book
}

const BookAuthor = ({ book }: Props) => {
  return (
    <View className="flex w-full flex-col gap-4 rounded-lg bg-primary-foreground p-4">
      <View className="flex flex-row gap-2">
        <Text className="text-xl font-bold text-primary">About</Text>
        <Text className="text-xl font-bold">Author</Text>
      </View>
      <View className="flex flex-row justify-between gap-4">
        <View className="flex flex-col justify-center gap-4">
          <View className="flex flex-row items-center gap-2">
            <User size={20} color="gray" />
            <Text className="text-lg">{book.author}</Text>
          </View>
          <View className="flex flex-row items-center gap-2">
            <Cake size={20} color="gray" />
            <Text className="text-sm">July 31, 1965</Text>
          </View>
        </View>
        <Image
          source={{
            uri: 'https://files.bestbooks.to/625e6d9b-dd99-4f83-8ce0-d361bcde9642.jpg',
          }}
          className="h-20 w-20 rounded-lg object-contain"
        />
      </View>
      <Text className="text-justify text-sm">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor ullam repellat saepe
        corporis? Blanditiis porro accusantium tempora possimus mollitia laborum.
      </Text>

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

export default BookAuthor
