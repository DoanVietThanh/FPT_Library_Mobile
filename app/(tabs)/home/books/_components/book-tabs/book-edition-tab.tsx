import React from 'react'
import { Image, Text, View } from 'react-native'
import { Card } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import useGetEditionsLibraryItem from '~/hooks/library-items/use-get-editions-libraryItem'
import { useRouter } from 'expo-router'
import { Loader, Search } from 'lucide-react-native'
import { Pressable } from 'react-native-gesture-handler'

type Props = {
  libraryItemId: string
}

const BookEditionTab = ({ libraryItemId }: Props) => {
  const router = useRouter()
  const { data: detailEditions, isLoading } = useGetEditionsLibraryItem(libraryItemId, {
    search: '',
    pageIndex: 1,
    pageSize: '5',
  })

  if (isLoading) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <Loader className="size-9 animate-spin" />
      </View>
    )
  }

  if (!detailEditions || detailEditions?.sources.length === 0) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <Text>No Edition found</Text>
      </View>
    )
  }

  return (
    <View className="mt-4 flex flex-col gap-4">
      <View className="relative flex flex-row items-center rounded-lg border px-2">
        <Search size={16} color={'black'} className="absolute right-2" />
        <Input
          placeholder="Search"
          className="m-0 flex-1 border-none border-transparent px-2 outline-none"
        />
      </View>

      <View className="flex flex-col gap-2">
        {detailEditions.sources.map((edition) => (
          <Pressable
            key={edition.libraryItemId}
            onPress={() => router.push(`/home/books/${edition.libraryItemId}`)}
          >
            <Card className="flex w-full flex-row gap-2 overflow-hidden rounded-lg p-2">
              <Image
                source={{
                  uri: edition.coverImage as string,
                }}
                className="h-32 w-20 rounded-lg object-cover"
              />
              <View className="flex flex-col gap-2">
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  className="text-base font-semibold text-primary"
                >
                  {edition.title}
                </Text>
                <Text className="text-sm">{edition.authors[0].fullName}</Text>
                <Text className="text-sm">{edition.publisher}</Text>
                <Text className="text-sm">{edition.publicationYear}</Text>
              </View>
            </Card>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

export default BookEditionTab
