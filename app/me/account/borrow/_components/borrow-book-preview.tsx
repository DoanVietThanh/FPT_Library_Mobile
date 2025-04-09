import React from 'react'
import { Image, Text, View } from 'react-native'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import LibraryItemLocateDialog from '~/components/ui/library-item-locate-dialog'
import { cn } from '~/lib/utils'
import { LibraryItem } from '~/types/models'
import { Href, useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { Pressable } from 'react-native-gesture-handler'

type Props = {
  libraryItem: LibraryItem
  className?: string
}

const BorrowBookPreview = ({ libraryItem, className }: Props) => {
  const router = useRouter()
  const {
    t,
    i18n: { language },
  } = useTranslation('BooksManagementPage')
  const {
    category,
    coverImage,
    authors,
    pageCount,
    publicationYear,
    publisher,
    subTitle,
    summary,
    title,
  } = libraryItem

  return (
    <>
      <Card className={cn('overflow-hidden rounded-xl border-2 ', className)}>
        <View className="flex-col gap-4 p-4 sm:flex-row">
          <View className="flex flex-col gap-4">
            <View className="flex h-48 w-full flex-row items-center justify-center">
              <Image
                source={{ uri: coverImage || '' }}
                className="h-48 w-32 border"
                resizeMode="cover"
              />
            </View>

            <View className="flex-1 space-y-2">
              <View className="flex-row items-center justify-between">
                <Pressable
                  onPress={() => router.push(`/home/books/${libraryItem.libraryItemId}` as Href)}
                >
                  <Text className="text-lg font-bold" numberOfLines={1}>
                    {title}
                  </Text>
                </Pressable>
              </View>

              {subTitle && <Text className="text-sm text-muted-foreground">{subTitle}</Text>}

              {category && (
                <View className="self-start rounded-md bg-primary/10 px-2 py-1">
                  <Text className="text-xs font-medium text-primary">
                    {language === 'vi' ? category.vietnameseName : category.englishName}
                  </Text>
                </View>
              )}

              <View className="flex-wrap gap-y-1">
                {authors && authors.length > 0 && (
                  <Text className="text-sm">
                    <Text className="font-medium">{t('Authors')}: </Text>
                    {authors.map((a) => a.fullName).join(', ')}
                  </Text>
                )}

                {publisher && (
                  <Text className="text-sm">
                    <Text className="font-medium">{t('Publisher')}: </Text>
                    {publisher}
                  </Text>
                )}

                {publicationYear && (
                  <Text className="text-sm">
                    <Text className="font-medium">{t('Year')}: </Text>
                    {publicationYear}
                  </Text>
                )}

                {pageCount && (
                  <Text className="text-sm">
                    <Text className="font-medium">{t('Page count')}: </Text>
                    {pageCount}
                  </Text>
                )}
              </View>

              {summary && (
                <Text className="text-sm text-muted-foreground" numberOfLines={2}>
                  {summary.replace(/<[^>]+>/g, '')}
                </Text>
              )}
            </View>

            <View className="flex flex-row items-center justify-end gap-4">
              <Button variant="outline">
                <Text>{t('Cancel')}</Text>
              </Button>

              <LibraryItemLocateDialog libraryItem={libraryItem} />
            </View>
          </View>
        </View>
      </Card>
    </>
  )
}

export default BorrowBookPreview
