import React from 'react'
import { Image, ScrollView, Text, useWindowDimensions, View } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { dummyBooks } from '~/components/home/dummy-books'
import { Card } from '~/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { cn } from '~/lib/utils'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const MIN_COLUMN_WIDTHS = [100, 120, 120, 120, 240, 140]

const ComparisonData = [
  {
    field: 'Title',
    matchPhrase: 80,
    fuzziness: 80,
    threshold: 30,
    matchValue: 'The hobbit or there and back again',
    matchPercentage: 80,
  },
  {
    field: 'Author',
    matchPhrase: 80,
    fuzziness: 80,
    threshold: 30,
    matchValue: 'J.R.R TOLKIEN',
    matchPercentage: 80,
  },
  {
    field: 'Publisher',
    matchPhrase: 80,
    fuzziness: 80,
    threshold: 30,
    matchValue: 'Not found',
    matchPercentage: 80,
  },
]

const PredictionOcrDetailTab = () => {
  const uploadedBook = dummyBooks[0]
  const detectedBook = dummyBooks[1]
  const { width } = useWindowDimensions()
  const insets = useSafeAreaInsets()

  const columnWidths = React.useMemo(() => {
    return MIN_COLUMN_WIDTHS.map((minWidth) => {
      const evenWidth = width / MIN_COLUMN_WIDTHS.length
      return evenWidth > minWidth ? evenWidth : minWidth
    })
  }, [width])

  if (!uploadedBook) {
    return <Text className="text-center text-lg">Book not found</Text>
  }

  return (
    <ScrollView>
      {/* Book preview */}
      <Card className="flex w-full flex-col rounded-lg border-2 p-4">
        <View className="w-full flex-row gap-2">
          <View className="flex-1 flex-col items-center gap-2">
            <Text className="text-lg font-semibold text-primary">Uploaded Book</Text>
            <Image
              source={{ uri: uploadedBook.image }}
              className="h-48 w-32 rounded-lg shadow-lg"
            />
          </View>
          <View className="flex-1 flex-col items-center gap-2">
            <Text className="text-lg font-semibold text-primary">Detected Book</Text>
            <Image
              source={{ uri: detectedBook.image }}
              className="h-48 w-32 rounded-lg shadow-lg"
            />
          </View>
        </View>
        <View className="mt-2 flex w-full flex-col gap-2 rounded-lg border-4 border-primary p-2">
          <View className="flex-row justify-between">
            <Text className="font-semibold">Match percentage</Text>
            <Text className="font-semibold text-danger">90%</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="font-semibold">Overall threshold</Text>
            <Text className="font-semibold text-danger">60%</Text>
          </View>
        </View>
      </Card>

      {/* OCR text */}
      <Card className="my-4 flex w-full flex-col rounded-lg border-2 p-4">
        <View className="rounded-lg border-2">
          <Text className="bg-draft p-2 font-semibold text-primary-foreground">OCR Text</Text>
          <View className="flex w-full flex-col gap-2">
            {[
              'The Hobbit or there and back again',
              'J.R.R TOLKIEN',
              'THE ENCHANTING PRELUDE TO',
              'THE LORD OF THE RINGS',
            ].map((item, index) => (
              <Text
                key={index}
                className="border-b-2 p-2 hover:bg-primary hover:font-semibold hover:text-primary-foreground"
              >
                {item}
              </Text>
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
                data={ComparisonData}
                estimatedItemSize={45}
                contentContainerStyle={{
                  paddingBottom: insets.bottom,
                }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <TableRow
                      key={item.field}
                      className={cn('active:bg-secondary', index % 2 && 'bg-muted/40 ')}
                    >
                      <TableCell style={{ width: columnWidths[0] }}>
                        <Text className="text-center font-semibold">{item.field}</Text>
                      </TableCell>
                      <TableCell style={{ width: columnWidths[1] }}>
                        <Text className="text-center">{item.matchPhrase}%</Text>
                      </TableCell>
                      <TableCell style={{ width: columnWidths[2] }}>
                        <Text className="text-center">{item.fuzziness}%</Text>
                      </TableCell>
                      <TableCell style={{ width: columnWidths[3] }}>
                        <Text className="text-center">{item.threshold}%</Text>
                      </TableCell>
                      <TableCell style={{ width: columnWidths[4] }}>
                        <Text className="text-left">{item.matchValue}</Text>
                      </TableCell>
                      <TableCell style={{ width: columnWidths[5] }}>
                        <Text className="text-center">{item.matchPercentage}%</Text>
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
