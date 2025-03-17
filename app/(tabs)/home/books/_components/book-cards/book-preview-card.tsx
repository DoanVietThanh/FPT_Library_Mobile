import React from 'react'
import { Image, Pressable, View } from 'react-native'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { formUrlQuery } from '~/lib/utils'
import { LibraryItem } from '~/types/models'
import { Href, useRouter } from 'expo-router'
// import { Href, useRouter } from 'expo-router'
import { MapPin, NotebookPen, Share2 } from 'lucide-react-native'

type Props = {
  libraryItem: LibraryItem
}

const BookPreviewCard = ({ libraryItem }: Props) => {
  const router = useRouter()

  const handleLocate = () => {
    const newUrl = formUrlQuery({
      url: '/map',
      params: '',
      updates: {
        ref: `${libraryItem?.shelf?.shelfId};shelf;${libraryItem.shelf?.shelfNumber}`,
      },
    })

    console.log(newUrl)

    router.push(newUrl as Href)
  }

  return (
    <View className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-primary-foreground p-4 ">
      <Image
        source={{ uri: libraryItem.coverImage as string }}
        className="h-96 w-2/3 rounded-lg object-contain"
      />

      <View className="flex w-full justify-between gap-y-4">
        <Pressable className="flex flex-1 flex-row items-center justify-center gap-4 rounded-lg bg-primary p-2 text-primary-foreground">
          <MapPin size={16} color={'white'} />
          <Button disabled={!libraryItem?.shelf} onPress={handleLocate}>
            <Text>Locate</Text>
          </Button>
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
