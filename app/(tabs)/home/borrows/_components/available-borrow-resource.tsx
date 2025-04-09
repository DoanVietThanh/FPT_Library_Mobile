import { Text, View } from 'react-native'
import { Badge } from '~/components/ui/badge'
import { Card } from '~/components/ui/card'
import Loading from '~/components/ui/loading'
import NoData from '~/components/ui/no-data'
import useGetResource from '~/hooks/library-items/use-get-resource'
import { EResourceBookType } from '~/types/enum'
import { BookOpen, Clock, Headphones } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'

type Props = {
  resourceId: number
  allowToBorrowResources?: number[]
  setAllowToBorrowResources?: (ids: number[]) => void
}

const AvailableBorrowResource = ({
  resourceId,
  allowToBorrowResources,
  setAllowToBorrowResources,
}: Props) => {
  const { t } = useTranslation('BookPage')
  console.log({ allowToBorrowResources, setAllowToBorrowResources })
  const { data: resource, isLoading } = useGetResource(resourceId.toString())

  if (isLoading) return <Loading />
  if (!resource) return <NoData />

  // const handleCheck = (libraryItemId: number) => {
  //   if (!setAllowToBorrowResources || !allowToBorrowResources) return
  //   if (allowToBorrowResources.includes(libraryItemId)) {
  //     setAllowToBorrowResources(allowToBorrowResources.filter((id) => id !== libraryItemId))
  //   } else {
  //     setAllowToBorrowResources([...allowToBorrowResources, libraryItemId])
  //   }
  // }

  const ResourceIcon = resource.resourceType === EResourceBookType.EBOOK ? BookOpen : Headphones

  return (
    <Card className="w-full overflow-hidden rounded-lg border shadow-sm">
      <View className="flex flex-col gap-2 p-4">
        {/* Header */}
        <View className="flex flex-row items-start justify-between">
          <View className="flex-1 pr-2">
            <Text className="text-lg font-bold" numberOfLines={2}>
              {resource.resourceTitle}
            </Text>
          </View>
        </View>

        {/* Resource Type */}
        <Badge className="flex flex-row items-center gap-2 self-start px-4 py-1">
          <ResourceIcon size={12} color={'white'} />
          <Text className="rounded-md text-xs font-medium text-primary-foreground">
            {resource.resourceType === EResourceBookType.EBOOK ? t('ebook') : t('audio book')}
          </Text>
        </Badge>

        {/* Borrow Duration */}
        {resource.defaultBorrowDurationDays && (
          <View className="flex flex-row items-center gap-2">
            <Clock size={14} />
            <Text className="text-xs font-medium">
              {t('borrow duration')}: {resource.defaultBorrowDurationDays} {t('days')}
            </Text>
          </View>
        )}
      </View>
    </Card>
  )
}

export default AvailableBorrowResource
