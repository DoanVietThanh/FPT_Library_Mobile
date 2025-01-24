import React, { useState } from 'react'
import { View } from 'react-native'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Label } from '~/components/ui/label'
import {
  Option,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Text } from '~/components/ui/text'
import { BORROW_OPTIONS } from '~/lib/validations/book/book-borrow'
import { Book } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'

import BookLibraryBorrow from './book-library-borrow'
import BookRequestBorrow from './book-request-borrow'

const BookBorrowDialog = () => {
  const { t } = useTranslation('BookPage')
  const [borrowOption, setBorrowOption] = useState<BORROW_OPTIONS>(BORROW_OPTIONS.LIBRARY)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex flex-row items-center gap-2 ">
          <Book size={16} color={'white'} className="text-primary-foreground" />
          <Text className="text-sm font-semibold text-primary-foreground">{t('borrow')}</Text>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-primary">
            {t('book borrow confirmation')}
          </DialogTitle>
        </DialogHeader>

        <View className="space-y-2 overflow-y-auto">
          <View className="mb-2">
            <Label>{t('option')} (*)</Label>
            <Select
              defaultValue={{ label: t('in library borrowing'), value: BORROW_OPTIONS.LIBRARY }}
              onValueChange={(option: Option | undefined) => {
                if (option) {
                  setBorrowOption(option.value as BORROW_OPTIONS)
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('borrow')} />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem
                  label={t('in library borrowing')}
                  value={BORROW_OPTIONS.LIBRARY}
                  className="w-full"
                />
                <SelectItem
                  label={t('request to borrow')}
                  value={BORROW_OPTIONS.REQUEST}
                  className="w-full"
                />
              </SelectContent>
            </Select>
          </View>

          {borrowOption === BORROW_OPTIONS.LIBRARY && <BookLibraryBorrow />}
          {borrowOption === BORROW_OPTIONS.REQUEST && <BookRequestBorrow />}
        </View>
      </DialogContent>
    </Dialog>
  )
}

export default BookBorrowDialog
