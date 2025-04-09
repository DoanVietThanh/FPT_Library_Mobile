import React from 'react'
import { Text } from 'react-native'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { useLibraryStorage } from '~/contexts/library-provider'
import { LibraryItem } from '~/types/models'
import { useTranslation } from 'react-i18next'

type Props = {
  open: boolean
  setOpen: (value: boolean) => void
  libraryItem: LibraryItem
}

const BorrowLibraryItemConfirm = ({ open, setOpen, libraryItem }: Props) => {
  const { t } = useTranslation('BookPage')

  const { borrowedLibraryItems } = useLibraryStorage()

  const handleAddToBorrowList = () => {
    borrowedLibraryItems.toggle(libraryItem.libraryItemId)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <Text>{t('add borrow list')}</Text>
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex flex-row items-center justify-end gap-2 gap-2">
          <DialogClose>
            <Text>{t('cancel')}</Text>
          </DialogClose>
          <Button onPress={handleAddToBorrowList}>
            <Text className="text-primary-foreground">{t('add')}</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BorrowLibraryItemConfirm
