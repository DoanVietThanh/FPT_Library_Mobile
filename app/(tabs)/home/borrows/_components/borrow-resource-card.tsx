'use client'

import { Text, View } from 'react-native'
import { Badge } from '~/components/ui/badge'
import { Card } from '~/components/ui/card'
import { Checkbox } from '~/components/ui/checkbox'
import Loading from '~/components/ui/loading'
import NoData from '~/components/ui/no-data'
import { Separator } from '~/components/ui/separator'
import useGetResource from '~/hooks/library-items/use-get-resource'
import { useBorrowStore } from '~/store/borrow/use-borrow-store'
import { EResourceBookType } from '~/types/enum'
import { BookOpen, Clock, Headphones, Trash2 } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'

type Props = {
  resourceId: number
}

const BorrowResourceCard = ({ resourceId }: Props) => {
  const { t } = useTranslation('BookPage')
  const { selectedResourceIds, setSelectedResourceIds } = useBorrowStore()
  const { data, isLoading } = useGetResource(resourceId.toString())

  if (isLoading) return <Loading />
  if (!data) return <NoData />

  const ResourceIcon = data.resourceType === EResourceBookType.EBOOK ? BookOpen : Headphones

  return (
    <Card className="w-full overflow-hidden rounded-lg border shadow-sm">
      <View className="flex flex-col gap-2 p-4">
        {/* Header */}
        <View className="flex flex-row items-start justify-between">
          <View className="flex-1 pr-2">
            <Text className="text-lg font-bold" numberOfLines={2}>
              {data.resourceTitle}
            </Text>
          </View>
        </View>

        {/* Resource Type */}
        <Badge className="flex flex-row items-center gap-2 self-start px-4 py-1">
          <ResourceIcon size={12} color={'white'} />
          <Text className="rounded-md text-xs font-medium text-primary-foreground">
            {data.resourceType === EResourceBookType.EBOOK ? t('ebook') : t('audio book')}
          </Text>
        </Badge>

        {/* Borrow Duration */}
        {data.defaultBorrowDurationDays && (
          <View className="flex flex-row items-center gap-2">
            <Clock size={14} />
            <Text className="text-xs font-medium">
              {t('borrow duration')}: {data.defaultBorrowDurationDays} {t('days')}
            </Text>
          </View>
        )}

        <Separator className="my-2" />

        <View className="flex flex-row items-center justify-between space-x-2">
          <View className="flex flex-row items-center gap-2">
            <Checkbox
              checked={selectedResourceIds.includes(resourceId) ? true : false}
              onCheckedChange={() =>
                setSelectedResourceIds(
                  selectedResourceIds.includes(resourceId)
                    ? selectedResourceIds.filter((id) => id !== resourceId)
                    : [...selectedResourceIds, resourceId],
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

export default BorrowResourceCard
