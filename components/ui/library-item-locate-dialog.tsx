import React, { useState } from 'react'
import { Text, View } from 'react-native'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '~/components/ui/dialog'
import useShelfDetail from '~/hooks/books/use-shelf-detail'
import { formUrlQuery } from '~/lib/utils'
import { LibraryItem } from '~/types/models'
import { Href, useRouter } from 'expo-router'
import { Loader } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'

import { Button } from './button'

type Props = {
  libraryItem: LibraryItem
}

const LibraryItemLocateDialog = ({ libraryItem }: Props) => {
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
    <Dialog open={openLocate} onOpenChange={setOpenLocate}>
      <DialogTrigger asChild>
        <Button
          onPress={() => setOpenLocate(true)}
          className="flex-1 shrink-0 text-primary-foreground "
        >
          <Text className="text-primary-foreground">{t('Locate')}</Text>
        </Button>
      </DialogTrigger>
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
            <Button onPress={() => handleLocate()} className="flex-1 shrink-0">
              <Text className="text-primary-foreground">{t('Locate')}</Text>
            </Button>
          </View>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default LibraryItemLocateDialog
