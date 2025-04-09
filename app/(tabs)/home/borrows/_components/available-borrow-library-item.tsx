import { Image, Text, View } from 'react-native'
import { Card } from '~/components/ui/card'
import { Separator } from '~/components/ui/separator'
import { LibraryItem } from '~/types/models'
import { useRouter } from 'expo-router'
import { Book, Clock, User } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native-gesture-handler'

type Props = {
  libraryItem: LibraryItem
  allowToReserveItems?: number[]
  setAllowToReserveItems?: (ids: number[]) => void
}

const AvailableBorrowLibraryItem = ({
  libraryItem,
  allowToReserveItems,
  setAllowToReserveItems,
}: Props) => {
  const router = useRouter()
  const { t } = useTranslation('BookPage')
  const isAvailable = libraryItem.libraryItemInventory?.availableUnits > 0

  console.log({ allowToReserveItems, setAllowToReserveItems })

  // const handleCheck = (libraryItemId: number) => {
  //   if (!setAllowToReserveItems || !allowToReserveItems) return
  //   if (allowToReserveItems.includes(libraryItemId)) {
  //     setAllowToReserveItems(allowToReserveItems.filter((id) => id !== libraryItemId))
  //   } else {
  //     setAllowToReserveItems([...allowToReserveItems, libraryItemId])
  //   }
  // }

  return (
    <Card className="w-full overflow-hidden rounded-lg border shadow-sm">
      <View className="flex flex-col p-4 md:flex-row md:space-x-4">
        {/* Cover Image */}
        <View className="mb-4 flex items-center justify-center md:mb-0 md:w-[120px]">
          {libraryItem.coverImage ? (
            <Image
              source={{ uri: libraryItem.coverImage }}
              alt={libraryItem.title}
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
              onPress={() => router.push(`/(tabs)/home/books/${libraryItem.libraryItemId}`)}
              className="flex-1 pr-2"
            >
              <Text className="text-lg font-bold  md:text-xl" numberOfLines={2}>
                {libraryItem.title}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Author */}
          {libraryItem.authors && libraryItem.authors.length > 0 && (
            <View className="mb-1 flex flex-row items-center space-x-1">
              <User size={14} className="" />
              <Text className="text-sm " numberOfLines={1}>
                {libraryItem.authors.map((author) => author.fullName).join(', ')}
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
          {libraryItem.summary && (
            <Text className="mb-3 text-sm " numberOfLines={2}>
              {libraryItem.summary}
            </Text>
          )}

          {/* Details Grid */}
          <View className="mb-3 flex flex-row flex-wrap">
            {libraryItem.publisher && (
              <View className="w-1/2 pb-1 pr-2 md:w-1/3">
                <Text className="text-xs ">
                  <Text className="font-medium">{t('fields.publisher')}:</Text>{' '}
                  {libraryItem.publisher}
                </Text>
              </View>
            )}
            {libraryItem.publicationYear && (
              <View className="w-1/2 pb-1 pr-2 md:w-1/3">
                <Text className="text-xs ">
                  <Text className="font-medium">{t('fields.year')}:</Text>{' '}
                  {libraryItem.publicationYear}
                </Text>
              </View>
            )}
            {libraryItem.publicationPlace && (
              <View className="w-1/2 pb-1 pr-2 md:w-1/3">
                <Text className="text-xs ">
                  <Text className="font-medium">{t('fields.place')}:</Text>{' '}
                  {libraryItem.publicationPlace}
                </Text>
              </View>
            )}
            {libraryItem.pageCount && (
              <View className="w-1/2 pb-1 pr-2 md:w-1/3">
                <Text className="text-xs ">
                  <Text className="font-medium">{t('fields.pageCount')}:</Text>{' '}
                  {libraryItem.pageCount}
                </Text>
              </View>
            )}
            {libraryItem.isbn && (
              <View className="w-1/2 pb-1 pr-2 md:w-1/3">
                <Text className="font-mono text-xs ">
                  <Text className="font-medium">{t('fields.isbn')}:</Text> {libraryItem.isbn}
                </Text>
              </View>
            )}
            {libraryItem.language && (
              <View className="w-1/2 pb-1 pr-2 md:w-1/3">
                <Text className="text-xs ">
                  <Text className="font-medium">{t('fields.language')}:</Text>{' '}
                  {libraryItem.language}
                </Text>
              </View>
            )}
          </View>

          {/* Footer */}
          {libraryItem.category?.totalBorrowDays && (
            <View className="mt-auto flex flex-row items-center space-x-1">
              <Clock size={14} className="" />
              <Text className="text-xs font-medium ">
                {t('borrow duration')}: {libraryItem.category.totalBorrowDays} {t('days')}
              </Text>
            </View>
          )}
        </View>

        <Separator className="my-2" />
        <View className="flex flex-row items-center justify-between space-x-2">
          <View className="flex flex-row items-center gap-2">
            {/* <Checkbox
              checked={allowToReserveItems!.includes(libraryItem.libraryItemId) ? true : false}
              onCheckedChange={() => {}}
              className="size-4"
            /> */}
            <Text className="text-sm font-medium">{t('select borrow')}</Text>
          </View>
        </View>
      </View>
    </Card>
  )
}

export default AvailableBorrowLibraryItem
