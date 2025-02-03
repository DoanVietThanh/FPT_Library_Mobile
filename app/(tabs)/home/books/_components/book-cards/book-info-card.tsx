import React from 'react'
import { Text, View } from 'react-native'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import LibraryItemStatusBadge from '~/components/ui/libraryItem-status-badge'
import { Separator } from '~/components/ui/separator'
import { LibraryItem } from '~/types/models'
import { useRouter } from 'expo-router'
import { BookOpen, CheckCircle2, Headphones, Heart, MapPin, Star } from 'lucide-react-native'

import BookBorrowDialog from '../book-borrow-dialog'

type Props = {
  libraryItem: LibraryItem
}

const BookInfoCard = ({ libraryItem }: Props) => {
  const router = useRouter()

  return (
    <View className="flex w-full flex-col gap-4 rounded-lg bg-primary-foreground p-4">
      <Text className="text-sm font-semibold italic">
        An edition of {libraryItem?.title as string} ({libraryItem?.publicationYear})
      </Text>
      <Text className="text-xl font-semibold text-primary">{libraryItem?.title as string}</Text>

      {libraryItem?.authors.length > 0 && libraryItem?.authors[0].fullName && (
        <Text className="text-md font-medium">by {libraryItem?.authors[0].fullName as string}</Text>
      )}
      <View className="flex flex-row items-center justify-between gap-2">
        <Badge variant={'draft'} className="w-fit">
          <Text className="text-sm text-primary-foreground">
            No.{libraryItem.editionNumber} Edition
          </Text>
        </Badge>
        <View className="flex flex-row items-center gap-2">
          <Star size={16} color="orange" fill={'orange'} />
          <Text className="font-semibold">{libraryItem?.avgReviewedRate} / 5</Text>
        </View>
      </View>
      <Separator />
      {/* Availability */}
      <View>
        <Text className="text-lg font-semibold text-primary">
          Availability ({libraryItem.libraryItemInventory.availableUnits}/
          {libraryItem.libraryItemInventory.totalUnits})
        </Text>
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
            {libraryItem.status && <LibraryItemStatusBadge status={libraryItem.status} />}
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
        <BookBorrowDialog />
        <Button
          onPress={() => router.push(`/home/books/${libraryItem.libraryItemId}/ebook?audio=true`)}
          variant={'outline'}
          className="flex flex-row items-center gap-2 "
        >
          <Headphones size={24} color={'black'} />
        </Button>
        <Button
          onPress={() => router.push(`/home/books/${libraryItem.libraryItemId}/ebook?audio=false`)}
          variant={'outline'}
          className="flex flex-row items-center gap-2 "
        >
          <BookOpen size={24} color={'black'} />
        </Button>
      </View>
    </View>
  )
}

export default BookInfoCard
