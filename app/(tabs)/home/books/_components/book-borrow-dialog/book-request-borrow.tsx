import React, { useState } from 'react'
import { View } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Text } from '~/components/ui/text'
import {
  bookRequestBorrowSchema,
  BORROW_OPTIONS,
  TBookRequestBorrowSchema,
} from '~/lib/validations/book/book-borrow'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

function BookRequestBorrow() {
  const { t } = useTranslation('BookPage')
  const { t: tGeneralManagement } = useTranslation('GeneralManagement')
  const { t: tZod } = useTranslation('Zod')
  const [showPickerPickup, setShowPickerPickup] = useState(false)
  const [showPickerReturn, setShowPickerReturn] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<TBookRequestBorrowSchema>({
    resolver: zodResolver(bookRequestBorrowSchema),
    defaultValues: {
      borrowOption: BORROW_OPTIONS.REQUEST,
      borrowPickupDate: '',
      borrowReturnDate: '',
      searchBook: '',
      description: '',
    },
  })

  const onSubmit = async (body: TBookRequestBorrowSchema) => {
    console.log('Form data submitted:', body)
  }

  const handleCancel = () => {
    clearErrors()
    reset()
  }

  return (
    <View className="flex flex-col gap-y-2">
      {/* Pickup date */}
      <View className="w-full">
        <Label className="mb-1 text-sm font-semibold">{t('fields.pickup date')}</Label>
        <Controller
          control={control}
          name="borrowPickupDate"
          render={({ field: { value, onChange } }) => (
            <View>
              <Input
                value={value ? new Date(value).toLocaleDateString() : ''}
                placeholder={t('fields.pickup date')}
                editable={false}
                onPress={() => setShowPickerPickup(true)}
              />
              {showPickerPickup && (
                <Dialog open={showPickerPickup} onOpenChange={setShowPickerPickup}>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="font-semibold">{t('fields.pickup date')}</DialogTitle>
                    </DialogHeader>
                    <DateTimePicker
                      mode="date"
                      display="inline"
                      value={value ? new Date(value) : new Date()}
                      onChange={(event, selectedDate) => {
                        if (selectedDate) {
                          onChange(selectedDate.toISOString())
                        }
                        setShowPickerPickup(false)
                      }}
                    />
                  </DialogContent>
                </Dialog>
              )}
            </View>
          )}
        />
        {errors.borrowPickupDate?.message && (
          <Text className="text-sm text-destructive">{tZod(errors.borrowPickupDate.message)}</Text>
        )}
      </View>

      {/* Return date */}
      <View className="w-full">
        <Label className="mb-1 text-sm font-semibold">{t('fields.return date')}</Label>
        <Controller
          control={control}
          name="borrowReturnDate"
          render={({ field: { value, onChange } }) => (
            <View>
              <Input
                value={value ? new Date(value).toLocaleDateString() : ''}
                placeholder={t('fields.return date')}
                editable={false}
                onPress={() => setShowPickerReturn(true)}
              />
              {showPickerReturn && (
                <Dialog open={showPickerReturn} onOpenChange={setShowPickerReturn}>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="font-semibold">{t('fields.return date')}</DialogTitle>
                    </DialogHeader>
                    <DateTimePicker
                      mode="date"
                      display="inline"
                      value={value ? new Date(value) : new Date()}
                      onChange={(event, selectedDate) => {
                        if (selectedDate) {
                          onChange(selectedDate.toISOString())
                        }
                        setShowPickerReturn(false)
                      }}
                    />
                  </DialogContent>
                </Dialog>
              )}
            </View>
          )}
        />
        {errors.borrowReturnDate?.message && (
          <Text className="text-sm text-destructive">{tZod(errors.borrowReturnDate.message)}</Text>
        )}
      </View>

      {/* Search book */}
      <View className="w-full">
        <Label className="mb-1 text-sm font-semibold">{t('search book')}</Label>
        <Controller
          control={control}
          name="searchBook"
          render={({ field: { value, onChange } }) => (
            <View>
              <Input value={value} onChangeText={onChange} placeholder={t('search book')} />
            </View>
          )}
        />
        {errors.searchBook?.message && (
          <Text className="text-sm text-destructive">{tZod(errors.searchBook.message)}</Text>
        )}
      </View>

      {/* Description */}
      <View className="w-full">
        <Label className="mb-1 text-sm font-semibold">{t('fields.description')}</Label>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder={tGeneralManagement('placeholder.description')}
            />
          )}
        />
        {errors.description?.message && (
          <Text className="text-sm text-destructive">{tZod(errors.description.message)}</Text>
        )}
      </View>

      <View className="flex flex-row gap-x-2">
        <Button variant="destructive" onPress={handleCancel} className="flex-1">
          <Text>{t('cancel')}</Text>
        </Button>
        <Button onPress={handleSubmit(onSubmit)} className="flex-1">
          <Text>{t('borrow')}</Text>
        </Button>
      </View>
    </View>
  )
}

export default BookRequestBorrow
