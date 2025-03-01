import React, { useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import PredictionOcrDetectStatistic from '~/components/ui/prediction-ocr-detect-statistic'
import { useOcrDetect } from '~/hooks/ai/use-ocr-detect'
import useGetLibraryItem from '~/hooks/library-items/use-get-libraryItem'
import { usePrediction } from '~/store/ai/use-prediction'
import { Loader2 } from 'lucide-react-native'

const EOcrDetectTab = {
  BOTH_BOOKS: 'both-books',
  UPLOADED_BOOK: 'uploaded-book',
  DETECTED_BOOK: 'detected-book',
}

const PredictionOcrDetectTab = () => {
  const [currentTab, setCurrentTab] = useState(EOcrDetectTab.BOTH_BOOKS)
  const { uploadedImage, bestMatchedLibraryItemId } = usePrediction()
  const { data: bestMatchedLibraryItem, isLoading } = useGetLibraryItem(
    bestMatchedLibraryItemId?.toString() || '',
  )

  const { data: ocrDetect, isPending: isLoadingOcrDetail } = useOcrDetect({
    libraryItemId: bestMatchedLibraryItemId?.toString() || '',
    image: uploadedImage!,
  })

  if (isLoading || isLoadingOcrDetail) {
    return (
      <View className="flex w-full items-center justify-center">
        <Loader2 className="size-8 animate-spin" />
      </View>
    )
  }

  console.log('🚀 ~ PredictionOcrDetectTab ~ ocrDetect:', ocrDetect)
  return (
    <View className="w-full">
      <View className="mb-4 flex-row justify-around">
        {Object.values(EOcrDetectTab).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setCurrentTab(tab)}
            className={`rounded-lg p-2 ${currentTab === tab && 'bg-primary'}`}
          >
            <Text
              className={`capitalize ${currentTab === tab && 'bg-primary text-primary-foreground'}`}
            >
              {tab.replace('-', ' ')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView>
        {/* Both books */}
        {currentTab === EOcrDetectTab.BOTH_BOOKS && (
          <View>
            <View className="flex w-full flex-row justify-evenly gap-6">
              <View className="items-center">
                <Image
                  source={{ uri: uploadedImage?.assets ? uploadedImage.assets[0].uri : '' }}
                  className="h-60 w-40 rounded-lg"
                />
                <Text className="mt-2 text-center text-base font-semibold">Uploaded Book</Text>
              </View>
              <View className="items-center">
                <Image
                  source={{ uri: bestMatchedLibraryItem?.coverImage || undefined }}
                  className="h-60 w-40 rounded-lg"
                />
                <Text className="mt-2 text-center text-base font-semibold">Detected Book</Text>
              </View>
            </View>
            <PredictionOcrDetectStatistic
              title="Statistic uploaded book"
              detectValues={ocrDetect?.isSuccess ? ocrDetect?.data.importImageDetected : []}
            />
            <PredictionOcrDetectStatistic
              title="Statistic detected book"
              detectValues={ocrDetect?.isSuccess ? ocrDetect?.data.currentItemDetected : []}
            />
          </View>
        )}

        {/* Uploaded book */}
        {currentTab === EOcrDetectTab.UPLOADED_BOOK && (
          <View className="items-center">
            <View className="flex w-full flex-row justify-evenly gap-6">
              <View className="items-center">
                <Image
                  source={{ uri: uploadedImage?.assets ? uploadedImage.assets[0].uri : '' }}
                  className="h-60 w-40 rounded-lg"
                />
                <Text className="mt-2 text-center text-base font-semibold">Uploaded Book</Text>
              </View>
            </View>
            <View className="flex-row gap-6">
              <PredictionOcrDetectStatistic
                title="Statistic uploaded book"
                detectValues={ocrDetect?.isSuccess ? ocrDetect?.data.importImageDetected : []}
              />
            </View>
          </View>
        )}

        {/* Detected book */}
        {currentTab === EOcrDetectTab.DETECTED_BOOK && (
          <View className="items-center">
            <View className="flex w-full flex-row justify-evenly gap-6">
              <View className="items-center">
                <Image
                  source={{ uri: bestMatchedLibraryItem?.coverImage || undefined }}
                  className="h-60 w-40 rounded-lg"
                />
                <Text className="mt-2 text-center text-base font-semibold">Detected Book</Text>
              </View>
            </View>
            <View className="flex-row gap-6">
              <PredictionOcrDetectStatistic
                title="Statistic detected book"
                detectValues={ocrDetect?.isSuccess ? ocrDetect?.data.currentItemDetected : []}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

export default PredictionOcrDetectTab
