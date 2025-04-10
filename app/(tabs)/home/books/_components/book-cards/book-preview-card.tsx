import React, { useState } from 'react'
import { Image, Pressable, View } from 'react-native'
import { Button } from '~/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter } from '~/components/ui/dialog'
import { Text } from '~/components/ui/text'
import useShelfDetail from '~/hooks/books/use-shelf-detail'
import { Loader } from '~/lib/icons/loader'
import { formUrlQuery } from '~/lib/utils'
import { LibraryItem } from '~/types/models'
import { Href, useRouter } from 'expo-router'
// import { Href, useRouter } from 'expo-router'
import { MapPin, NotebookPen, Share2 } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'

type Props = {
  libraryItem: LibraryItem
}

const BookPreviewCard = ({ libraryItem }: Props) => {
  const router = useRouter()
  const [openLocate, setOpenLocate] = useState(false)
  const {
    t,
    i18n: { language: locale },
  } = useTranslation('BookDetail')

  const { data: shelfData, isFetching: fetchingShelfDetail } = useShelfDetail(libraryItem.shelfId)

  const handleLocate = () => {
    const newUrl = formUrlQuery({
      url: '/map',
      params: '',
      updates: {
        ref: `${libraryItem?.shelf?.shelfId};shelf;${libraryItem.shelf?.shelfNumber}`,
      },
    })
    setOpenLocate(false)
    router.push(newUrl as Href)
  }

  return (
    <>
      <Dialog open={openLocate} onOpenChange={setOpenLocate}>
        <DialogContent className="max-h-[80dvh] w-[85vw] overflow-y-auto">
          {fetchingShelfDetail ? (
            <View className=" items-center justify-center">
              <Loader className="size-12 animate-spin" />
            </View>
          ) : shelfData ? (
            <View>
              <Text className="mb-1 font-bold">{t('Library item position')}</Text>
              <View className="flex flex-row items-center justify-between gap-2">
                <Text className="font-bold">{t('Floor')}: </Text>
                <Text>{t(shelfData.floor.floorNumber)}</Text>
              </View>
              <View className="flex flex-row items-center justify-between gap-2">
                <Text className="font-bold">{t('Zone')}: </Text>
                <Text>
                  {t(locale === 'vi' ? shelfData.zone.vieZoneName : shelfData.zone.engZoneName)}
                </Text>
              </View>
              <View className="flex flex-row items-center justify-between gap-2">
                <Text className="font-bold">{t('Section')}: </Text>
                <Text>
                  {t(
                    locale === 'vi'
                      ? shelfData.section.vieSectionName
                      : shelfData.section.engSectionName,
                  )}
                </Text>
              </View>
              <View className="flex flex-row items-center justify-between gap-2">
                <Text className="font-bold">{t('Shelf')}: </Text>
                <Text>{t(shelfData.libraryShelf.shelfNumber)}</Text>
              </View>
            </View>
          ) : (
            <Text>{t('Not found')}</Text>
          )}

          <DialogFooter>
            <View className="flex flex-row items-center gap-4">
              <DialogClose asChild>
                <Button variant="outline" className="flex-1 shrink-0">
                  <Text>{t('Cancel')}</Text>
                </Button>
              </DialogClose>
              <Button onPress={handleLocate} className="flex-1 shrink-0">
                <Text>{t('Locate')}</Text>
              </Button>
            </View>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <View className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-background p-4 ">
        <Image
          source={{ uri: libraryItem.coverImage as string }}
          className="h-96 w-2/3 rounded-lg object-contain"
        />

        <View className="flex w-full justify-between gap-y-4">
          {libraryItem?.shelf && (
            <Button className="flex-row gap-2" onPress={() => setOpenLocate(true)}>
              <MapPin size={16} color={'white'} />
              <Text>{t('Locate')}</Text>
            </Button>
          )}

          <View className="flex flex-1 flex-row items-center justify-center gap-4">
            <Pressable className="flex flex-1 flex-row items-center justify-center gap-4">
              <NotebookPen size={16} />
              <Text>Review</Text>
            </Pressable>
            <Pressable className="flex flex-1 flex-row items-center justify-center gap-4">
              <Share2 size={16} />
              <Text>Share</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  )
}

export default BookPreviewCard
