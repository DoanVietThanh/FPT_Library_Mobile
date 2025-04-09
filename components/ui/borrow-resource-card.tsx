import { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import BorrowDigitalConfirm from '~/app/(tabs)/home/books/[bookId]/_components/borrow-digital-confirm'
import { useLibraryStorage } from '~/contexts/library-provider'
import { cn, formatPrice } from '~/lib/utils'
import { EResourceBookType } from '~/types/enum'
import { BookResource } from '~/types/models'
import { useRouter } from 'expo-router'
import { Eye, Trash2 } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'

import { Button } from './button'

type Props = {
  resource: BookResource
  type: EResourceBookType
  setOpen: (open: boolean) => void
}

const BorrowResourceCard = ({ resource, type, setOpen }: Props) => {
  const router = useRouter()
  const { t } = useTranslation('BookPage')
  const [openDigitalBorrow, setOpenDigitalBorrow] = useState(false)
  const { borrowedResources } = useLibraryStorage()

  const isAdded = borrowedResources.has(resource.resourceId)

  return (
    <>
      <BorrowDigitalConfirm
        selectedResource={resource}
        open={openDigitalBorrow}
        setOpen={setOpenDigitalBorrow}
      />
      <View className="rounded-lg border bg-background p-4">
        <View className="flex-row items-start justify-between">
          <View className="space-y-1">
            <Text className="text-lg font-medium" numberOfLines={1}>
              {resource.resourceTitle}
            </Text>
            <View className="flex-row items-center gap-2">
              <Text className="rounded px-2 py-1 text-xs">
                {type === EResourceBookType.EBOOK ? t('ebook') : t('audio book')}
              </Text>
            </View>
          </View>
          {resource.borrowPrice && resource.borrowPrice > 0 && (
            <Text className="font-semibold">{formatPrice(resource.borrowPrice)}</Text>
          )}
        </View>
        {resource.defaultBorrowDurationDays && (
          <Text className="mt-2 text-sm">
            {t('borrow duration')}: {resource.defaultBorrowDurationDays} {t('days')}
          </Text>
        )}
        <View className="mt-4 flex-row justify-between gap-2">
          <Pressable
            onPress={() => {
              router.push(
                `/(tabs)/home/books/resources/${resource.resourceId}?resourceType=${type}&isPreview=true`,
              )
              setOpen(false)
            }}
            className="flex-1 flex-row items-center justify-center rounded border py-2"
          >
            <Eye size={16} className="mr-2" />
            <Text>{t('preview')}</Text>
          </Pressable>
          <Button
            variant={isAdded ? 'destructive' : 'outline'}
            className={cn('flex-1 flex-row items-center justify-center gap-2 rounded ')}
            onPress={() => setOpenDigitalBorrow(true)}
          >
            {isAdded ? <Trash2 size={16} color={isAdded ? 'white' : 'red'} /> : <Eye size={16} />}
            <Text className={cn(isAdded ? 'text-primary-foreground' : '')}>
              {t(isAdded ? 'remove from borrow' : 'add to borrow')}
            </Text>
          </Button>
        </View>
      </View>
    </>
  )
}

export default BorrowResourceCard
