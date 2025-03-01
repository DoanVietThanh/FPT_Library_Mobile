import React, { useMemo } from 'react'
import { Image, ScrollView, Text, useWindowDimensions, View } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { Card } from '~/components/ui/card'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { useOcrDetail } from '~/hooks/ai/use-ocr-detail'
import useGetLibraryItem from '~/hooks/library-items/use-get-libraryItem'
import { cn } from '~/lib/utils'
import { usePrediction } from '~/store/ai/use-prediction'
import { Loader2 } from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const MIN_COLUMN_WIDTHS = [100, 120, 120, 120, 240, 140]

const PredictionOcrDetailTab = () => {
  const { width } = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const { uploadedImage, bestMatchedLibraryItemId } = usePrediction()

  const { data: bestMatchedLibraryItem, isPending: isLoadingLibraryItem } = useGetLibraryItem(
    bestMatchedLibraryItemId?.toString() || '',
  )

  const { data: ocrDetail, isPending: isLoadingOcrDetail } = useOcrDetail({
    libraryItemId: bestMatchedLibraryItemId?.toString() || '',
    image: uploadedImage!,
  })

  const columnWidths = useMemo(() => {
    return MIN_COLUMN_WIDTHS.map((minWidth) => {
      const evenWidth = width / MIN_COLUMN_WIDTHS.length
      return evenWidth > minWidth ? evenWidth : minWidth
    })
  }, [width])

  if (isLoadingLibraryItem || isLoadingOcrDetail) {
    return (
      <View className="flex w-full items-center justify-center">
        <Loader2 className="size-8 animate-spin" />
      </View>
    )
  }

  return (
    <ScrollView>
      {/* Book preview */}
      <Card className="flex w-full flex-col rounded-lg border-2 p-4">
        <View className="w-full flex-row gap-2">
          <View className="flex-1 flex-col items-center gap-2">
            <Text className="text-lg font-semibold text-primary">Uploaded Book</Text>
            <Image
              alt="uploaded book"
              source={{ uri: uploadedImage?.assets ? uploadedImage.assets[0].uri : '' }}
              className="h-48 w-32 rounded-lg shadow-lg"
            />
          </View>
          <View className="flex-1 flex-col items-center gap-2">
            <Text className="text-lg font-semibold text-primary">Detected Book</Text>
            <Image
              source={{ uri: bestMatchedLibraryItem?.coverImage || undefined }}
              alt="detected book"
              className="h-48 w-32 rounded-lg shadow-lg"
            />
          </View>
        </View>
        <View className="mt-2 flex w-full flex-col gap-2 rounded-lg border-4 border-primary p-2">
          <View className="flex-row justify-between">
            <Text className="font-semibold">Match percentage</Text>
            {ocrDetail?.isSuccess && (
              <Text className="font-semibold text-danger">{ocrDetail?.data.matchPercentage}%</Text>
            )}
          </View>
          <View className="flex-row justify-between">
            <Text className="font-semibold">Overall threshold</Text>
            {ocrDetail?.isSuccess && (
              <Text className="font-semibold text-danger">
                {ocrDetail?.data.overallPercentage}%
              </Text>
            )}
          </View>
        </View>
      </Card>

      {/* OCR text */}
      <Card className="my-4 flex w-full flex-col rounded-lg border-2 p-4">
        <View className="rounded-lg border-2">
          <Text className="bg-draft p-2 font-semibold text-primary-foreground">OCR Text</Text>
          <View className="flex w-full flex-col gap-2">
            {ocrDetail?.isSuccess &&
              ocrDetail.data.lineStatisticDtos.map((item, index) => (
                <View key={index}>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Text className="w-full border-b-2 p-2 hover:bg-primary hover:font-semibold hover:text-primary-foreground">
                        {item.lineValue}
                      </Text>
                    </HoverCardTrigger>
                    <HoverCardContent
                      align="end"
                      sideOffset={5}
                      className="native:w-96 flex w-80 flex-col gap-2 border-2"
                    >
                      <Text className="justify-center text-center font-semibold text-primary">
                        Assumption Values
                      </Text>
                      <View className="flex flex-row justify-between gap-4">
                        <Text className="font-semibold text-primary">Title</Text>
                        <Text className="font-semibold text-danger">
                          {item.matchedTitlePercentage.toFixed(0)}%
                        </Text>
                      </View>
                      <View className="flex flex-row justify-between gap-4">
                        <Text className="font-semibold text-primary">Author</Text>
                        <Text className="font-semibold text-danger">
                          {item.matchedAuthorPercentage.toFixed(0)}%
                        </Text>
                      </View>
                      <View className="flex flex-row justify-between gap-4">
                        <Text className="font-semibold text-primary">Publisher</Text>
                        <Text className="font-semibold text-danger">
                          {item.matchedPublisherPercentage.toFixed(0)}%
                        </Text>
                      </View>
                    </HoverCardContent>
                  </HoverCard>
                </View>
              ))}
          </View>
        </View>
      </Card>

      <ScrollView horizontal bounces={false} showsHorizontalScrollIndicator={false}>
        <Card>
          <Table aria-labelledby="invoice-table">
            <TableHeader>
              <TableRow>
                <TableHead style={{ width: columnWidths[0] }}>
                  <Text className="text-center font-semibold">Field</Text>
                </TableHead>
                <TableHead style={{ width: columnWidths[1] }}>
                  <Text className="text-center font-semibold">Match pharse</Text>
                </TableHead>
                <TableHead style={{ width: columnWidths[2] }}>
                  <Text className="text-center font-semibold">Fuzziness</Text>
                </TableHead>
                <TableHead style={{ width: columnWidths[3] }}>
                  <Text className="text-center font-semibold">Threshold</Text>
                </TableHead>
                <TableHead style={{ width: columnWidths[4] }}>
                  <Text className="text-left font-semibold">Match Value</Text>
                </TableHead>
                <TableHead style={{ width: columnWidths[5] }}>
                  <Text className="text-center font-semibold">Match Percentage</Text>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <FlashList
                data={ocrDetail?.isSuccess ? ocrDetail.data.stringComparisions : []}
                estimatedItemSize={45}
                contentContainerStyle={{
                  paddingBottom: insets.bottom,
                }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <TableRow
                      key={item.propertyName}
                      className={cn('active:bg-secondary', index % 2 && 'bg-muted/40 ')}
                    >
                      <TableCell style={{ width: columnWidths[0] }}>
                        <Text className="text-center font-semibold">{item.propertyName}</Text>
                      </TableCell>
                      <TableCell style={{ width: columnWidths[1] }}>
                        <Text className="text-center">{item.matchPhrasePoint.toFixed(1)}%</Text>
                      </TableCell>
                      <TableCell style={{ width: columnWidths[2] }}>
                        <Text className="text-center">{item.fuzzinessPoint.toFixed(1)}%</Text>
                      </TableCell>
                      <TableCell style={{ width: columnWidths[3] }}>
                        <Text className="text-center">{item.fieldThreshold.toFixed(1)}%</Text>
                      </TableCell>
                      <TableCell style={{ width: columnWidths[4] }}>
                        <Text className="text-left">{item.matchLine}</Text>
                      </TableCell>
                      <TableCell style={{ width: columnWidths[5] }}>
                        <Text className="text-center">{item.matchPercentage.toFixed(1)}%</Text>
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

export default PredictionOcrDetailTab
