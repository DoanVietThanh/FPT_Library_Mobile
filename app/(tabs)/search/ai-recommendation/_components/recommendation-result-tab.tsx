import React from 'react'
import { Image, ScrollView, Text, useWindowDimensions, View } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { dummyBooks } from '~/components/home/dummy-books'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { cn } from '~/lib/utils'
import { CheckCircle, MapPin, Search, Star, XCircle } from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const MIN_COLUMN_WIDTHS = [240, 120, 180, 180, 180, 140]

const RecommendationResultTab = () => {
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
      {/* Book comparison */}
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
                data={dummyBooks}
                estimatedItemSize={45}
                contentContainerStyle={{
                  paddingBottom: insets.bottom,
                }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <TableRow
                      key={item.id}
                      className={cn('active:bg-secondary', index % 2 && 'bg-muted/40 ')}
                    >
                      <TableCell style={{ width: columnWidths[0] }}>
                        <View className="flex flex-row gap-2">
                          <Image
                            source={{ uri: item.image }}
                            className="h-20 w-14 rounded-lg shadow-lg"
                          />
                          <View className="flex flex-col">
                            {index == 0 && (
                              <Badge variant={'danger'}>
                                <Text className="text-xs text-primary-foreground ">
                                  Highly recommended
                                </Text>
                              </Badge>
                            )}
                            {index == 1 && (
                              <Badge variant={'default'}>
                                <Text className="text-xs text-primary-foreground ">
                                  Medium recommended
                                </Text>
                              </Badge>
                            )}
                            {index == 2 && (
                              <Badge variant={'success'}>
                                <Text className="text-xs text-primary-foreground ">
                                  Recommended
                                </Text>
                              </Badge>
                            )}
                            <Text className="text-sm font-semibold">{item.title}</Text>
                            <Text className="text-xs">by {item.author}</Text>
                          </View>
                        </View>
                      </TableCell>
                      <TableCell style={{ width: columnWidths[1] }}>
                        <View className="my-auto flex flex-row items-center gap-2">
                          <Star size={16} color="orange" fill="orange" />
                          <Text>4.5 / 5</Text>
                        </View>
                      </TableCell>
                      <TableCell style={{ width: columnWidths[2] }}>
                        <View className="my-auto flex flex-col gap-2">
                          <Text>Computer science</Text>
                          <Text>UX design</Text>
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
                            <Badge variant={'success'} className="w-24">
                              <Text className="text-xs text-primary-foreground">Availability</Text>
                            </Badge>
                          </View>
                          <View className="flex-row">
                            <MapPin size={16} color="white" fill={'orange'} />
                            <Text className="text-sm">CS A-15</Text>
                          </View>
                        </View>
                      </TableCell>
                      <TableCell style={{ width: columnWidths[5] }}>
                        <Button variant={'outline'} className="w-fit">
                          <Text className="text-danger">Preview</Text>
                        </Button>
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
