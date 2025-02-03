import React from 'react'
import { Text, View } from 'react-native'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import useGetLibraryItem from '~/hooks/library-items/use-get-libraryItem'
import { splitCamelCase } from '~/lib/utils'
import { Loader, SquarePen } from 'lucide-react-native'

type Props = {
  libraryItemId: string
}

const BookOverviewTab = ({ libraryItemId }: Props) => {
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
    <View className="mt-4 flex flex-col gap-4">
      <View className="flex flex-row">
        <Text className="flex-1">Publish year: {libraryItem?.publicationYear}</Text>
        <Text className="flex-1">Publisher: {libraryItem?.publisher}</Text>
      </View>
      <View className="flex flex-row">
        <Text className="flex-1">Language: {libraryItem?.originLanguage}</Text>
        <Text className="flex-1">Pages: {libraryItem?.pageCount}</Text>
      </View>
      <View>
        <Text className="font-semibold text-primary">Preview available in English</Text>
        <Text className="text-justify text-sm">{libraryItem.summary}</Text>
      </View>

      <Separator />
      <View className="flex flex-col gap-2">
        <Text className="text-xl font-semibold text-primary">Detail</Text>
        <View className="flex flex-row justify-between">
          <Text>Published in</Text>
          <Text>{libraryItem?.publicationPlace}</Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text>Category</Text>
          <Text>{splitCamelCase(libraryItem.category.englishName as string)}</Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text>Cutter number</Text>
          <Text>{libraryItem?.cutterNumber}</Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text>Dimensions</Text>
          <Text>{libraryItem?.dimensions}</Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text>Responsibility</Text>
          <Text>{libraryItem?.responsibility}</Text>
        </View>
      </View>

      {/* Edition notes */}
      <View className="flex flex-col gap-2">
        <Text className="text-xl font-semibold text-primary">Edition Notes</Text>
        <View className="flex flex-row justify-between">
          <Text>Genre</Text>
          <Text>{libraryItem?.genres}</Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text>Topic</Text>
          <Text>{libraryItem?.topicalTerms}</Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text>General notes</Text>
          <Text>{libraryItem?.generalNote}</Text>
        </View>
      </View>

      {/* Classifications */}
      <View className="flex flex-col gap-2">
        <Text className="text-xl font-semibold text-primary">Classifications</Text>
        <View className="flex flex-row justify-between">
          <Text>Dewey Decimal Class</Text>
          <Text>{libraryItem?.classificationNumber}</Text>
        </View>
      </View>

      {/* The physical object */}
      <View className="flex flex-col gap-2">
        <Text className="text-xl font-semibold text-primary">The physical object</Text>
        <View className="flex flex-row justify-between">
          <Text>Number of pages</Text>
          <Text>{libraryItem?.pageCount}</Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text>Detail</Text>
          <Text>{libraryItem?.physicalDetails}</Text>
        </View>
      </View>

      {/* ID numbers */}
      <View className="flex flex-col gap-2">
        <Text className="text-xl font-semibold text-primary">ID Numbers</Text>
        <View className="flex flex-row justify-between">
          <Text>My Book Shelf</Text>
          <Text>{libraryItem.shelf?.shelfId}</Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text>ISBN 10</Text>
          <Text>{libraryItem?.isbn}</Text>
        </View>
      </View>

      <Separator />
      <View className="flex flex-col gap-2">
        <Text className="text-xl font-semibold text-primary">Community Reviews</Text>
        <View className="flex flex-row items-center justify-between">
          <Text>Page</Text>
          <View className="flex flex-row items-center gap-2">
            <Badge className="flex items-center">
              <Text className="text-primary-foreground">Meandering 100%</Text>
            </Badge>
          </View>
        </View>

        <View className="flex flex-row items-center justify-between">
          <Text>Enjoyable</Text>
          <View className="flex flex-row items-center gap-2">
            <Badge className="flex items-center">
              <Text className="text-primary-foreground">Interesting 100%</Text>
            </Badge>
          </View>
        </View>

        <View className="flex flex-row items-center justify-between">
          <Text>Difficulty</Text>
          <View className="flex flex-row items-center gap-2">
            <Badge className="flex items-center">
              <Text className="text-primary-foreground">Advanced 100%</Text>
            </Badge>
          </View>
        </View>

        <View className="flex flex-row items-center justify-between">
          <Text>Genre</Text>
          <View className="flex flex-row items-center gap-2">
            <Badge className="flex items-center">
              <Text className="text-primary-foreground">Horror 66%</Text>
            </Badge>
            <Badge className="flex items-center">
              <Text className="text-primary-foreground">Mystery 33%</Text>
            </Badge>
          </View>
        </View>

        <View className="flex flex-row items-center justify-between">
          <Text>Mood</Text>
          <View className="flex flex-row items-center gap-2">
            <Badge className="flex items-center">
              <Text className="text-primary-foreground">Ominous 25%</Text>
            </Badge>
            <Badge className="flex items-center">
              <Text className="text-primary-foreground">Scientific 25%</Text>
            </Badge>
          </View>
        </View>

        <Button variant={'secondary'} className="flex flex-row items-center gap-2">
          <SquarePen size={16} className="text-primary" />
          <Text className="font-semibold text-primary">Add your community review</Text>
        </Button>
      </View>
    </View>
  )
}

export default BookOverviewTab
