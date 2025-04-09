import React from 'react'
import { Text, View } from 'react-native'
import BorrowResourceCard from '~/components/ui/borrow-resource-card'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { Separator } from '~/components/ui/separator'
import { EResourceBookType } from '~/types/enum'
import { BookResource } from '~/types/models'
import { Book, Headphones } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native-gesture-handler'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  resources: BookResource[]
}

const BookDigitalListDialog = ({ open, setOpen, resources }: Props) => {
  const { t } = useTranslation('BookPage')

  const ebookResources = resources.filter(
    (resource) => resource.resourceType === EResourceBookType.EBOOK,
  )
  const audioBookResources = resources.filter(
    (resource) => resource.resourceType === EResourceBookType.AUDIO_BOOK,
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('digital list')}</DialogTitle>
          <DialogDescription>{t('digital list desc')}</DialogDescription>
        </DialogHeader>

        <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="space-y-4">
          <View className="my-4 space-y-4">
            {ebookResources.length > 0 && (
              <View className="space-y-4">
                <View className="mb-2 flex flex-row items-center gap-2">
                  <Book className="size-5 text-primary" />
                  <Text className="text-lg font-semibold">{t('ebook list')}</Text>
                </View>
                <Separator />
                {ebookResources.map((resource) => (
                  <BorrowResourceCard
                    key={resource.resourceId}
                    resource={resource}
                    type={EResourceBookType.EBOOK}
                    setOpen={setOpen}
                  />
                ))}
              </View>
            )}
          </View>

          <View className="my-4 space-y-4">
            {audioBookResources.length > 0 && (
              <View className="space-y-4">
                <View className="mb-2 flex flex-row items-center gap-2">
                  <Headphones className="size-5 text-primary" />
                  <Text className="text-lg font-semibold">{t('audio book list')}</Text>
                </View>
                <Separator />
                {audioBookResources.map((resource) => (
                  <BorrowResourceCard
                    key={resource.resourceId}
                    resource={resource}
                    type={EResourceBookType.AUDIO_BOOK}
                    setOpen={setOpen}
                  />
                ))}
              </View>
            )}
          </View>
        </ScrollView>

        <DialogFooter>
          <DialogClose asChild>
            <Button>
              <Text className="text-primary-foreground">{t('close')}</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BookDigitalListDialog
