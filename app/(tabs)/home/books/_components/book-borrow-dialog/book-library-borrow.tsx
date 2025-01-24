import React, { useState } from 'react'
import { Pressable, View } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import DateTimePicker from '@react-native-community/datetimepicker'
import { dummyBooks } from '~/components/home/dummy-books'
import BookPreview from '~/components/ui/book-preview'
import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Text } from '~/components/ui/text'
import {
  bookLibraryBorrowSchema,
  BORROW_OPTIONS,
  TBookLibraryBorrowSchema,
} from '~/lib/validations/book/book-borrow'
import * as ImagePicker from 'expo-image-picker'
import { Trash2 } from 'lucide-react-native'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import BookQrDialog from './book-qr-dialog'

function BookLibraryBorrow() {
  const { t } = useTranslation('BookPage')
  const { t: tGeneralManagement } = useTranslation('GeneralManagement')
  const { t: tZod } = useTranslation('Zod')
  const [showPicker, setShowPicker] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string>()
  const [openBookQr, setOpenBookQr] = useState(false)

  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<TBookLibraryBorrowSchema>({
    resolver: zodResolver(bookLibraryBorrowSchema),
    defaultValues: {
      borrowOption: BORROW_OPTIONS.LIBRARY,
      returnDate: '',
      bookSerialNo: '',
      description: '',
    },
  })

  const onSubmit = async (body: TBookLibraryBorrowSchema) => {
    console.log('Form data submitted:', body)
  }

  const handleDeleteImage = () => {
    setValue('bookSerialNo', '')
    setSelectedImage('')
  }

  const handleUploadFromDevice = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled && result.assets?.[0]?.uri) {
      const randomSerial = Math.floor(100000 + Math.random() * 900000).toString()
      setSelectedImage(result.assets[0].uri)
      setValue('bookSerialNo', randomSerial)
      clearErrors('bookSerialNo')
    } else {
      alert('You did not select any image.')
    }
  }

  const handleCancel = () => {
    clearErrors()
    reset()
  }

  return (
    <View className="flex flex-col gap-y-2">
      <View className="w-full">
        <Label className="mb-1 text-sm font-semibold">{t('fields.return date')}</Label>
        <Controller
          control={control}
          name="returnDate"
          render={({ field: { value, onChange } }) => (
            <View>
              <Input
                value={value ? new Date(value).toLocaleDateString() : ''}
                placeholder={t('fields.return date')}
                editable={false}
                onPress={() => setShowPicker(true)}
              />
              {showPicker && (
                <Dialog open={showPicker} onOpenChange={setShowPicker}>
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
                        setShowPicker(false)
                      }}
                    />
                  </DialogContent>
                </Dialog>
              )}
            </View>
          )}
        />
        {errors.returnDate?.message && (
          <Text className="text-sm text-destructive">{tZod(errors.returnDate.message)}</Text>
        )}
      </View>

      <View className="w-full">
        <Label className="mb-1 text-sm font-semibold">{t('fields.book serial no')}</Label>
        <Controller
          control={control}
          name="bookSerialNo"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="flex w-full flex-row items-center rounded-lg border pl-4">
              <BookQrDialog
                open={openBookQr}
                setOpen={setOpenBookQr}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                handleUploadFromDevice={handleUploadFromDevice}
              />

              <Input
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder={tGeneralManagement('placeholder.book serial no')}
                className="flex-1 border-none border-transparent outline-none"
              />
            </View>
          )}
        />
        {errors.bookSerialNo?.message && (
          <Text className="text-sm text-destructive">{tZod(errors.bookSerialNo.message)}</Text>
        )}
      </View>

      {/* Preview Book */}
      {selectedImage && (
        <View className="relative">
          <Pressable onPress={handleDeleteImage} className="absolute right-2 top-2 z-10">
            <Trash2 size={20} color="red" />
          </Pressable>
          <BookPreview book={dummyBooks[0]} selectedImage={selectedImage} />
        </View>
      )}

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

export default BookLibraryBorrow
