import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Badge } from '~/components/ui/badge'
import { Card } from '~/components/ui/card'
import { EResourceBookType } from '~/types/enum'
import { BorrowRequestResource } from '~/types/models'
import { AudioLines, BookOpen, Clock, Trash2 } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'

type Props = {
  resource: BorrowRequestResource
}

const BorrowResourcePreview = ({ resource }: Props) => {
  const { t } = useTranslation('BookPage')

  const isEbook = resource.libraryResource.resourceType === EResourceBookType.EBOOK

  return (
    <Card
      key={resource.borrowRequestResourceId}
      className="mb-4 overflow-hidden rounded-xl border bg-background"
    >
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-4">
        <Text className="flex-1 text-base font-semibold" numberOfLines={1}>
          {resource?.resourceTitle}
        </Text>

        <TouchableOpacity className="ml-2 rounded-md bg-danger p-2">
          <Trash2 color="white" size={16} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View className="flex flex-col gap-4 p-4">
        {/* Badge */}
        <View className="flex-row items-center">
          <Badge className="flex-row items-center gap-2 rounded-md">
            {isEbook ? (
              <>
                <BookOpen size={14} className="mr-1" color={'white'} />
                <Text className="text-xs text-primary-foreground">{t('ebook')}</Text>
              </>
            ) : (
              <>
                <AudioLines size={14} className="mr-1" color={'white'} />
                <Text className="text-xs text-primary-foreground">{t('audio book')}</Text>
              </>
            )}
          </Badge>
        </View>

        {/* Duration */}
        {resource.defaultBorrowDurationDays && (
          <View className="flex-row items-center">
            <Clock size={14} className="mr-1.5" />
            <Text className="text-sm text-muted-foreground">
              {t('borrow tracking.borrow duration')}: {resource.defaultBorrowDurationDays}{' '}
              {t('days')}
            </Text>
          </View>
        )}
      </View>
    </Card>
  )
}

export default BorrowResourcePreview
