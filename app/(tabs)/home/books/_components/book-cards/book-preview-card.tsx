import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { LibraryItem } from '~/types/models'
import { MapPin, NotebookPen, Share2 } from 'lucide-react-native'

type Props = {
  libraryItem: LibraryItem
}

const BookPreviewCard = ({ libraryItem }: Props) => {
  return (
    <View className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-primary-foreground p-4 ">
      <Image
        source={{ uri: libraryItem.coverImage as string }}
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
  )
}

export default BookPreviewCard
