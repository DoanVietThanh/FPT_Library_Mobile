import React from 'react'
import { Image, ScrollView, Text, useWindowDimensions, View } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { useOcrDetail } from '~/hooks/ai/use-ocr-detail'
import { useLibraryItemRecommendation } from '~/hooks/ai/use-recommendation'
import useGetLibraryItem from '~/hooks/library-items/use-get-libraryItem'
import { cn } from '~/lib/utils'
import { usePrediction } from '~/store/ai/use-prediction'
import { CheckCircle, Loader2, MapPin, Search, Star, XCircle } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import RecommendationBookPreview from './recommendation-book-preview'

const MIN_COLUMN_WIDTHS = [240, 120, 180, 180, 200, 140]

const RecommendationResultTab = () => {
  const insets = useSafeAreaInsets()
  const { width } = useWindowDimensions()

  const {
    t,
    i18n: { language },
  } = useTranslation('BookPage')
  const { uploadedImage, bestMatchedLibraryItemId } = usePrediction()

  const { data: ocrDetail, isPending: isLoadingOcrDetail } = useOcrDetail({
    libraryItemId: bestMatchedLibraryItemId?.toString() || '',
    image: uploadedImage!,
  })

  const { data: bestMatchedLibraryItem, isLoading } = useGetLibraryItem(
    bestMatchedLibraryItemId?.toString() || '',
  )

  const { data: recommendationResult, isLoading: isLoadingRecommendation } =
    useLibraryItemRecommendation(bestMatchedLibraryItemId!.toString())

  const columnWidths = React.useMemo(() => {
    return MIN_COLUMN_WIDTHS.map((minWidth) => {
      const evenWidth = width / MIN_COLUMN_WIDTHS.length
      return evenWidth > minWidth ? evenWidth : minWidth
    })
  }, [width])

  if (isLoadingOcrDetail || isLoadingRecommendation || isLoading) {
    return (
      <View className="flex w-full items-center justify-center">
        <Loader2 className="size-8 animate-spin" />
      </View>
    )
  }

  if (!bestMatchedLibraryItem) {
    return <Text className="text-center text-lg">Book not found</Text>
  }

  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
      {/* Book comparison */}
      <Card className="flex w-full flex-col rounded-lg border-2 p-4">
        <View className="w-full flex-row gap-2">
          <View className="flex-1 flex-col items-center gap-2">
            <Text className="text-lg font-semibold text-primary">Uploaded Book</Text>
            <Image
              source={{ uri: uploadedImage?.assets ? uploadedImage.assets[0].uri : '' }}
              className="h-48 w-32 rounded-lg shadow-lg"
            />
          </View>
          <View className="flex-1 flex-col items-center gap-2">
            <Text className="text-lg font-semibold text-primary">Detected Book</Text>
            <Image
              source={{ uri: bestMatchedLibraryItem?.coverImage || undefined }}
              className="h-48 w-32 rounded-lg shadow-lg"
            />
          </View>
        </View>
        <View className="mt-2 flex w-full flex-col gap-2 rounded-lg border-4 border-primary p-2">
          <View className="flex-row justify-between">
            <Text className="font-semibold">Match percentage</Text>
            <Text className="font-semibold text-danger">
              {ocrDetail?.isSuccess && ocrDetail.data.matchPercentage}%
            </Text>
          </View>
        </View>
      </Card>

      {/* Search bar */}
      <Card className="my-4 p-4">
        <Text className="font-semibold text-primary">Book recommendations</Text>
        <View className="relative mt-2 flex flex-row items-center rounded-lg border px-2">
          <Search size={16} color={'black'} className="absolute right-2" />
          <Input
            placeholder="Search library item"
            className="m-0 w-[120px] flex-1 border-none border-transparent px-2 outline-none"
          />
        </View>
      </Card>

      <ScrollView horizontal bounces={false} showsHorizontalScrollIndicator={false}>
        <Card>
          <Table aria-labelledby="invoice-table">
            <TableHeader>
              <TableRow>
                <TableHead style={{ width: columnWidths[0] }}>
                  <Text className="font-semibold">Title</Text>
                </TableHead>
                <TableHead style={{ width: columnWidths[1] }}>
                  <Text className="font-semibold">Ratings</Text>
                </TableHead>
                <TableHead style={{ width: columnWidths[2] }}>
                  <Text className="font-semibold">Category</Text>
                </TableHead>
                <TableHead style={{ width: columnWidths[3] }}>
                  <Text className="font-semibold">Availability</Text>
                </TableHead>
                <TableHead style={{ width: columnWidths[4] }}>
                  <Text className="text-left font-semibold">Status</Text>
                </TableHead>
                <TableHead style={{ width: columnWidths[5] }}>
                  <Text className="font-semibold"></Text>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <FlashList
                data={(recommendationResult?.isSuccess && recommendationResult.data) || []}
                estimatedItemSize={45}
                contentContainerStyle={{
                  paddingBottom: insets.bottom,
                }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <TableRow
                      key={item.itemDetailDto.libraryItemId}
                      className={cn('active:bg-secondary', index % 2 && 'bg-muted/40 ')}
                    >
                      <TableCell style={{ width: columnWidths[0] }}>
                        <View className="flex flex-row gap-2">
                          <Image
                            source={{ uri: item.itemDetailDto.coverImage || '' }}
                            className="h-20 w-14 rounded-lg shadow-lg"
                          />
                          <View className="flex flex-col">
                            {index == 0 && (
                              <Badge className="w-fit" variant={'danger'}>
                                <Text className="text-xs text-primary-foreground  ">
                                  Highly recommended
                                </Text>
                              </Badge>
                            )}
                            {index == 1 && (
                              <Badge className="w-fit" variant={'default'}>
                                <Text className="text-xs text-primary-foreground  ">
                                  Medium recommended
                                </Text>
                              </Badge>
                            )}
                            {index == 2 && (
                              <Badge className="w-fit" variant={'success'}>
                                <Text className="text-xs text-primary-foreground  ">
                                  Recommended
                                </Text>
                              </Badge>
                            )}
                            <Text className="text-sm font-semibold">
                              {item.itemDetailDto.title}
                            </Text>
                            {Array.isArray(item.itemDetailDto.authors) &&
                              item.itemDetailDto.authors.length > 0 && (
                                <Text className="text-xs">
                                  by {item.itemDetailDto.authors[0].fullName || ''}
                                </Text>
                              )}
                          </View>
                        </View>
                      </TableCell>
                      <TableCell style={{ width: columnWidths[1] }}>
                        <View className="my-auto flex flex-row items-center gap-2">
                          <Star size={16} color="orange" fill="orange" />
                          <Text>{item?.itemDetailDto?.avgReviewedRate || 5} / 5</Text>
                        </View>
                      </TableCell>
                      <TableCell style={{ width: columnWidths[2] }}>
                        <View className="my-auto flex flex-col gap-2">
                          <Text>
                            {language === 'vi'
                              ? item.itemDetailDto.category.vietnameseName
                              : item.itemDetailDto.category.englishName}
                          </Text>
                        </View>
                      </TableCell>
                      <TableCell style={{ width: columnWidths[3] }}>
                        <View className="my-auto mt-2 flex flex-col gap-2">
                          <View className="flex-row gap-2">
                            <CheckCircle size={16} color="green" />
                            <Text className="text-sm">Hard Copy</Text>
                          </View>
                          <View className="flex-row gap-2">
                            <CheckCircle size={16} color="green" />
                            <Text className="text-sm">E-Book</Text>
                          </View>
                          <View className="flex-row gap-2">
                            <XCircle size={16} color="gray" />
                            <Text className="text-sm">Audio Book</Text>
                          </View>
                        </View>
                      </TableCell>
                      <TableCell style={{ width: columnWidths[4] }}>
                        <View className="my-auto mt-2 flex flex-col gap-2">
                          <View className="w-1/3 flex-row gap-2">
                            {item.itemDetailDto.libraryItemInventory.availableUnits > 0 ? (
                              <Badge variant={'success'} className="w-24">
                                <Text className="text-nowrap text-xs text-primary-foreground">
                                  {t('fields.availability')}
                                </Text>
                              </Badge>
                            ) : (
                              <Badge variant={'danger'} className="w-24">
                                <Text className="text-nowrap text-xs text-primary-foreground">
                                  {t('fields.unavailability')}
                                </Text>
                              </Badge>
                            )}
                          </View>
                          {item.itemDetailDto.shelf?.shelfNumber && (
                            <View className="flex-row">
                              <MapPin size={16} color="white" fill={'orange'} />
                              <Text className="text-sm text-primary">
                                {item.itemDetailDto.shelf?.shelfNumber}
                              </Text>
                            </View>
                          )}
                        </View>
                      </TableCell>
                      <TableCell style={{ width: columnWidths[5] }}>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline">
                              <Text>Preview</Text>
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <View>
                              <RecommendationBookPreview
                                result={item}
                                comparedLibraryItemId={item.itemDetailDto.libraryItemId.toString()}
                                detectedLibraryItem={bestMatchedLibraryItem}
                              />
                            </View>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button>
                                  <Text className="text-primary-foreground">OK</Text>
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  )
                }}
              />
            </TableBody>
          </Table>
        </Card>
      </ScrollView>
    </ScrollView>
  )
}

export default RecommendationResultTab
