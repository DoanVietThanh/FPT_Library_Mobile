import { Text, View } from 'react-native'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { useLibraryStorage } from '~/contexts/library-provider'
import { formatPrice } from '~/lib/utils'
import { EResourceBookType, LocalStorageKeys } from '~/types/enum'
import { BookResource } from '~/types/models'
import { useTranslation } from 'react-i18next'
import Toast from 'react-native-toast-message'

type Props = {
  open: boolean
  setOpen: (value: boolean) => void
  selectedResource: BookResource
}

const BorrowDigitalConfirm = ({ open, setOpen, selectedResource }: Props) => {
  const {
    t,
    i18n: { language },
  } = useTranslation('BookPage')

  const { borrowedResources, toggleItem } = useLibraryStorage()

  const isAdded = borrowedResources.has(selectedResource.resourceId)

  const handleBorrowDigital = () => {
    Toast.show({
      type: 'success',
      text1: t(language === 'vi' ? 'Thành công' : 'Success'),
      text2: t(isAdded ? 'deleted to borrow list' : 'added to borrow list'),
    })
    toggleItem(LocalStorageKeys.BORROW_RESOURCE_IDS, selectedResource.resourceId)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('add resource to borrow list')}</DialogTitle>
        </DialogHeader>
        <Card className="flex flex-col gap-2 p-4">
          <Text className="text-lg font-semibold">{selectedResource.resourceTitle}</Text>
          <View className="flex-row items-center justify-between gap-2">
            <Badge variant="draft" className="px-4">
              <Text className="text-xs text-primary-foreground">
                {selectedResource.resourceType === EResourceBookType.EBOOK
                  ? t('ebook')
                  : t('audio book')}
              </Text>
            </Badge>

            {selectedResource.borrowPrice && selectedResource.borrowPrice > 0 && (
              <Badge variant="default" className="px-4">
                <Text className="text-xs text-primary-foreground">
                  {formatPrice(selectedResource.borrowPrice)}
                </Text>
              </Badge>
            )}
          </View>
          {selectedResource.defaultBorrowDurationDays && (
            <Text className="mt-2 text-sm text-muted-foreground">
              {t('borrow duration')}: {selectedResource.defaultBorrowDurationDays} {t('days')}
            </Text>
          )}
        </Card>
        <DialogFooter className="flex-row items-center justify-end gap-4">
          <DialogClose>
            <Text>{t('cancel')}</Text>
          </DialogClose>
          <Button onPress={handleBorrowDigital} variant={isAdded ? 'destructive' : 'default'}>
            <Text className="text-primary-foreground">{t(isAdded ? 'delete' : 'add')}</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BorrowDigitalConfirm
