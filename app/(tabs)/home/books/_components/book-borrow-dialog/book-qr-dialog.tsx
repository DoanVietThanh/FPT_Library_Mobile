import React from 'react'
import { Text, View } from 'react-native'
import { dummyBooks } from '~/components/home/dummy-books'
import BookPreview from '~/components/ui/book-preview'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { QrCode, Trash2, Upload } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, Cloud, Phone } from 'react-native-feather'
import { Pressable } from 'react-native-gesture-handler'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  selectedImage: string | undefined
  setSelectedImage: (image: string) => void
  handleUploadFromDevice: () => Promise<void>
}

const BookQrDialog = ({
  open,
  setOpen,
  selectedImage,
  setSelectedImage,
  handleUploadFromDevice,
}: Props) => {
  const { t } = useTranslation('BookPage')
  const { t: tGeneralManagement } = useTranslation('GeneralManagement')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <QrCode
          size={24}
          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 cursor-pointer text-primary"
        />
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{t('scan barcode')}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <View className="flex flex-col items-center gap-4">
          {selectedImage && (
            <View className="relative flex w-full flex-col items-end gap-2">
              <Pressable
                onPress={() => setSelectedImage('')}
                className="flex flex-row items-center justify-end"
              >
                <Trash2 size={20} color="red" />
              </Pressable>
              <BookPreview book={dummyBooks[0]} selectedImage={selectedImage} />
            </View>
          )}

          <Button
            variant={'outline'}
            onPress={handleUploadFromDevice}
            className="flex w-2/3 flex-row items-center justify-start gap-2"
          >
            <Upload />
            <Text className="w-full capitalize">
              {tGeneralManagement('select from your device')}
            </Text>
          </Button>

          <Button
            variant={'outline'}
            className="flex w-2/3 flex-row items-center justify-start gap-2"
          >
            <Phone />
            <Text className="w-full capitalize">{tGeneralManagement('scan from mobile app')}</Text>
          </Button>
          <Button
            variant={'outline'}
            className="flex w-2/3 flex-row items-center justify-start gap-2"
          >
            <Cloud />
            <Text className="w-full capitalize">
              {tGeneralManagement('select from your cloud')}
            </Text>
          </Button>

          <Button
            variant={'outline'}
            onPress={() => setOpen(false)}
            className="flex w-2/3 flex-row items-center justify-start gap-2"
          >
            <ChevronLeft />
            <Text className="w-full capitalize">{tGeneralManagement('back to enter barcode')}</Text>
          </Button>
        </View>
      </DialogContent>
    </Dialog>
  )
}

export default BookQrDialog
