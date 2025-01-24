import React from 'react'
import { Image, Text, View } from 'react-native'
import { MapPin, User2 } from 'lucide-react-native'

import { Book } from '../home/dummy-books'
import { Badge } from './badge'

type Props = {
  book: Book
  selectedImage: string
}

const BookPreview = ({ book, selectedImage }: Props) => {
  return (
    <View className="flex w-full flex-row items-start justify-start gap-2 overflow-hidden rounded-lg border-2 border-primary p-2">
      <Image source={{ uri: selectedImage }} className="size-28 rounded-lg object-fill" />
      <View className="flex flex-col gap-2">
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-nowrap text-sm font-semibold text-secondary-foreground"
        >
          {book.title}
        </Text>
        <View className="flex flex-row items-center gap-2">
          <User2 size={16} className="size-4" color={'black'} />
          <Text className="text-sm">by {book.author}</Text>
        </View>
        <Badge variant={'success'}>
          <Text className="text-sm text-white">Available</Text>
        </Badge>
        <View className="flex flex-row items-center gap-2">
          <MapPin size={16} className="size-4" color={'orange'} />
          <Text className="text-sm">CS A-15</Text>
        </View>
      </View>
    </View>
  )
}

export default BookPreview
