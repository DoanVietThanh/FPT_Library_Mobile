import React from 'react'
import { Image, Text, View } from 'react-native'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import LibraryItemInfo from '~/components/ui/library-item-info'
import useGetLibraryItem from '~/hooks/library-items/use-get-libraryItem'
import { usePrediction } from '~/store/ai/use-prediction'
import { useRouter } from 'expo-router'
import { Loader2, MapPin } from 'lucide-react-native'

const PredictionResultTab = () => {
  const router = useRouter()
  const { uploadedImage, bestMatchedLibraryItemId, predictResult } = usePrediction()

  const { data: libraryItem, isLoading } = useGetLibraryItem(
    bestMatchedLibraryItemId?.toString() || '',
  )

  if (isLoading) {
    return (
      <View className="flex w-full items-center justify-center">
        <Loader2 className="size-8 animate-spin" />
      </View>
    )
  }

  if (!libraryItem) {
    router.push('/(tabs)/search/ai-prediction')
    return
  }

  console.log({ uploadedImage, bestMatchedLibraryItemId, predictResult })

  return (
    <View className="">
      <Card className="space-y-2 rounded-lg border-2 p-4">
        <View className="items-center">
          {libraryItem?.coverImage && (
            <Image
              source={{ uri: libraryItem?.coverImage }}
              className="h-64 w-64"
              resizeMode="contain"
            />
          )}
        </View>
        <Button className="mx-auto mt-2 w-full flex-row items-center gap-2">
          <MapPin size={20} color={'white'} />
          <Text className="text-primary-foreground">Locate</Text>
        </Button>
      </Card>

      {/* Library Item info */}
      <Card className="mt-4 rounded-lg border-2 p-4">
        <LibraryItemInfo libraryItem={libraryItem} />
      </Card>

      {/* AI Prediction */}
      <Card className="mt-4 rounded-lg border-2 p-4">
        <Text className="text-center text-2xl font-semibold text-primary">AI-detected</Text>
        <View className="mt-4 flex flex-col gap-2">
          {predictResult &&
            predictResult.bestItem?.ocrResult.fieldPointsWithThreshole.map((item, index) => (
              <View key={`${item}-${index}`} className="flex-row justify-between gap-4">
                <View className="flex flex-1 flex-row justify-between">
                  <Text className="font-semibold">{item.name}: </Text>
                  <Text className="font-semibold">{item.matchedPoint.toFixed(1)}%</Text>
                </View>
                <Badge
                  variant={item?.isPassed ? 'success' : 'danger'}
                  className=" flex w-32 items-center justify-center text-center"
                >
                  <Text className="text-primary-foreground">
                    {item?.isPassed ? 'Passed' : 'Not passed'}
                  </Text>
                </Badge>
              </View>
            ))}
        </View>

        {predictResult && (
          <View className="mt-4 flex flex-col gap-2">
            <View className="flex-row justify-between">
              <Text className="font-semibold">Threshold Value:</Text>
              <Text className="font-semibold">
                {predictResult.bestItem?.ocrResult.confidenceThreshold.toFixed(1)}%
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-semibold">Match Overall:</Text>
              <Text className="font-semibold">
                {predictResult.bestItem?.ocrResult.totalPoint.toFixed(1)} %
              </Text>
            </View>
            <View className="flex-row justify-between gap-4">
              <View className="flex flex-1 flex-row justify-between">
                <Text className="font-semibold">Status:</Text>
              </View>
              <Badge
                variant={
                  predictResult.bestItem?.ocrResult.totalPoint >=
                  predictResult.bestItem?.ocrResult.confidenceThreshold
                    ? 'success'
                    : 'danger'
                }
                className="flex w-32 flex-nowrap items-center justify-center text-nowrap text-center"
              >
                <Text className="text-primary-foreground">
                  {predictResult.bestItem?.ocrResult.totalPoint >=
                  predictResult.bestItem?.ocrResult.confidenceThreshold
                    ? 'Passed'
                    : 'Not passed'}
                </Text>
              </Badge>
            </View>
          </View>
        )}
      </Card>
    </View>
  )
}

export default PredictionResultTab
