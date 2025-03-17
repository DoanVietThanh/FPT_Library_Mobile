import React from 'react'
import { Image, Text, View } from 'react-native'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import useGetLibraryItem from '~/hooks/library-items/use-get-libraryItem'
import { OcrResult } from '~/types/models'
import { Loader2, MapPin, XCircle } from 'lucide-react-native'

import LibraryItemInfo from './library-item-info'

type Props = {
  libraryItemId: string
  ocrResult: OcrResult
}

const PredictLibraryItemInfo = ({ libraryItemId, ocrResult }: Props) => {
  const { data: libraryItem, isLoading } = useGetLibraryItem(libraryItemId || '')

  if (isLoading) {
    return (
      <View className="flex w-full items-center justify-center">
        <Loader2 className="size-8 animate-spin" />
      </View>
    )
  }

  if (!libraryItem) {
    return (
      <View className="flex h-full w-full items-center justify-center">
        <XCircle className="size-4" />
        <Text className="text-sm">Library item not found</Text>
      </View>
    )
  }

  return (
    <Card className="rounded-lg border-2 p-4">
      <View className="flex flex-row">
        <View className="flex w-2/5 flex-col items-center justify-between overflow-hidden">
          <Image
            source={{ uri: libraryItem.coverImage as string }}
            className="h-44 w-44 overflow-hidden"
            resizeMode="contain"
          />
          <Button size={'sm'} className="mt-2 w-32 flex-row items-center gap-2">
            <MapPin size={16} color={'white'} />
            <Text className="text-xs text-primary-foreground">Locate</Text>
          </Button>
        </View>

        <View className="flex-1 p-2">
          <Text className="text-center text-sm font-semibold text-primary">AI-detected</Text>
          <View className="mt-4 flex flex-col gap-2">
            {ocrResult?.fieldPointsWithThreshole.map((field, index) => (
              <View key={`${field.name}-${index}`} className="flex-row justify-between gap-4">
                <View className="flex flex-1 flex-row justify-between">
                  <Text className="text-sm font-semibold capitalize">{field.name}:</Text>
                  <Text className="text-sm">{field.matchedPoint}%</Text>
                </View>
                <Badge
                  variant={field.isPassed ? 'success' : 'danger'}
                  className="flex w-fit items-center justify-center text-center"
                >
                  <Text className="text-xs text-primary-foreground">
                    {field.isPassed ? 'Passed' : 'Not passed'}
                  </Text>
                </Badge>
              </View>
            ))}
          </View>

          <View className="mt-4 flex flex-col gap-2">
            <View className="flex-row justify-between">
              <Text className="text-sm font-semibold">Threshold Value:</Text>
              <Text className="text-sm font-semibold">60%</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm font-semibold">Match Overall:</Text>
              <Text className="text-sm font-semibold">90%</Text>
            </View>
            <View className="flex-row justify-between gap-4">
              <View className="flex flex-1 flex-row justify-between">
                <Text className="text-sm font-semibold">Status:</Text>
              </View>
              <Badge className="w-24 bg-green-500">
                <Text className="text-xs text-primary-foreground">Passed</Text>
              </Badge>
            </View>
          </View>
        </View>
      </View>
      <Accordion
        type="multiple"
        collapsible
        defaultValue={['item-1']}
        className="native:max-w-md max-w-sm overflow-hidden"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <Text>More details</Text>
          </AccordionTrigger>
          <AccordionContent>
            <View className="max-w-md">
              <LibraryItemInfo libraryItem={libraryItem} />
            </View>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

export default PredictLibraryItemInfo
