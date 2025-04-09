import React from 'react'
import { Image, Text, View } from 'react-native'
import { Card } from '~/components/ui/card'
import { Checkbox } from '~/components/ui/checkbox'
import Loading from '~/components/ui/loading'
import NoData from '~/components/ui/no-data'
import { Separator } from '~/components/ui/separator'
import useGetLibraryItem from '~/hooks/library-items/use-get-libraryItem'
import { useBorrowStore } from '~/store/borrow/use-borrow-store'
import { useRouter } from 'expo-router'
import { Book, Clock, Trash2, User } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native-gesture-handler'

type Props = {
  libraryItemId: number
}

const BorrowLibraryItemCard = ({ libraryItemId }: Props) => {
  const router = useRouter()
  const { t } = useTranslation('BookPage')
  const { selectedLibraryItemIds, setSelectedLibraryItemIds } = useBorrowStore()
  const { data, isLoading } = useGetLibraryItem(libraryItemId.toString())

  if (isLoading) return <Loading />
  if (!data) return <NoData />

  const isAvailable = data.libraryItemInventory?.availableUnits > 0

  return (
    <Card className="w-full overflow-hidden rounded-lg border shadow-sm">
      <View className="flex flex-col p-4 md:flex-row md:space-x-4">
        {/* Cover Image */}
        <View className="mb-4 flex items-center justify-center md:mb-0 md:w-[120px]">
          {data.coverImage ? (
            <Image
              source={{ uri: data.coverImage }}
              alt={data.title}
              className="h-48 w-32 rounded-md object-cover shadow-sm md:h-40 md:w-28"
            />
          ) : (
            <View className="flex h-48 w-32 items-center justify-center rounded-md md:h-40 md:w-28">
              <Book className="size-12 " />
            </View>
          )}
        </View>

        {/* Content */}
        <View className="flex-1">
          {/* Header */}
          <View className="mb-2 flex flex-row items-start justify-between">
            <TouchableOpacity
              onPress={() => router.push(`/(tabs)/home/books/${libraryItemId}`)}
              className="flex-1 pr-2"
            >
              <Text className="text-lg font-bold  md:text-xl" numberOfLines={2}>
                {data.title}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Author */}
          {data.authors && data.authors.length > 0 && (
            <View className="mb-1 flex flex-row items-center space-x-1">
              <User size={14} className="" />
              <Text className="text-sm " numberOfLines={1}>
                {data.authors.map((author) => author.fullName).join(', ')}
              </Text>
            </View>
          )}

          {/* Availability */}
          <View className="mb-2">
            <Text className={`text-sm font-medium ${isAvailable ? 'text-success' : 'text-danger'}`}>
              {isAvailable ? t('fields.availability') : t('fields.unavailability')}
            </Text>
          </View>

          {/* Summary */}
          {data.summary && (
            <Text className="mb-3 text-sm " numberOfLines={2}>
              {data.summary}
            </Text>
          )}

          {/* Details Grid */}
          <View className="mb-3 flex flex-row flex-wrap">
            {data.publisher && (
              <View className="w-1/2 pb-1 pr-2 md:w-1/3">
                <Text className="text-xs ">
                  <Text className="font-medium">{t('fields.publisher')}:</Text> {data.publisher}
                </Text>
              </View>
            )}
            {data.publicationYear && (
              <View className="w-1/2 pb-1 pr-2 md:w-1/3">
                <Text className="text-xs ">
                  <Text className="font-medium">{t('fields.year')}:</Text> {data.publicationYear}
                </Text>
              </View>
            )}
            {data.publicationPlace && (
              <View className="w-1/2 pb-1 pr-2 md:w-1/3">
                <Text className="text-xs ">
                  <Text className="font-medium">{t('fields.place')}:</Text> {data.publicationPlace}
                </Text>
              </View>
            )}
            {data.pageCount && (
              <View className="w-1/2 pb-1 pr-2 md:w-1/3">
                <Text className="text-xs ">
                  <Text className="font-medium">{t('fields.pageCount')}:</Text> {data.pageCount}
                </Text>
              </View>
            )}
            {data.isbn && (
              <View className="w-1/2 pb-1 pr-2 md:w-1/3">
                <Text className="font-mono text-xs ">
                  <Text className="font-medium">{t('fields.isbn')}:</Text> {data.isbn}
                </Text>
              </View>
            )}
            {data.language && (
              <View className="w-1/2 pb-1 pr-2 md:w-1/3">
                <Text className="text-xs ">
                  <Text className="font-medium">{t('fields.language')}:</Text> {data.language}
                </Text>
              </View>
            )}
          </View>

          {/* Footer */}
          {data.category?.totalBorrowDays && (
            <View className="mt-auto flex flex-row items-center space-x-1">
              <Clock size={14} className="" />
              <Text className="text-xs font-medium ">
                {t('borrow duration')}: {data.category.totalBorrowDays} {t('days')}
              </Text>
            </View>
          )}
        </View>

        <Separator className="my-2" />

        <View className="flex flex-row items-center justify-between space-x-2">
          <View className="flex flex-row items-center gap-2">
            <Checkbox
              checked={selectedLibraryItemIds.includes(libraryItemId) ? true : false}
              onCheckedChange={() =>
                setSelectedLibraryItemIds(
                  selectedLibraryItemIds.includes(libraryItemId)
                    ? selectedLibraryItemIds.filter((id) => id !== libraryItemId)
                    : [...selectedLibraryItemIds, libraryItemId],
                )
              }
              className="size-4"
            />
            <Text className="text-sm font-medium">{t('select borrow')}</Text>
          </View>
          <Trash2 color="red" size={16} />
        </View>
      </View>
    </Card>
  )
}

export default BorrowLibraryItemCard
