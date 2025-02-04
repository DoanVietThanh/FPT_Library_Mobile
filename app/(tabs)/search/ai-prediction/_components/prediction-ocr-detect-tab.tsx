import React, { useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { dummyBooks } from '~/components/home/dummy-books'
import PredictionOcrDetectStatistic from '~/components/ui/prediction-ocr-detect-statistic'

const EOcrDetectTab = {
  UPLOADED_BOOK: 'uploaded-book',
  DETECTED_BOOK: 'detected-book',
  BOTH_BOOKS: 'both-books',
}

const PredictionOcrDetectTab = () => {
  const uploadedBook = dummyBooks[0]
  const detectedBook = dummyBooks[1]

  const [currentTab, setCurrentTab] = useState(EOcrDetectTab.BOTH_BOOKS)

  return (
    <View className="w-full">
      {/* Tabs */}
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
                <Image source={{ uri: uploadedBook.image }} className="h-60 w-40 rounded-lg" />
                <Text className="mt-2 text-center text-base font-semibold">Uploaded Book</Text>
              </View>
              <View className="items-center">
                <Image source={{ uri: detectedBook.image }} className="h-60 w-40 rounded-lg" />
                <Text className="mt-2 text-center text-base font-semibold">Detected Book</Text>
              </View>
            </View>
            <PredictionOcrDetectStatistic title="Statistic uploaded book" />
            <PredictionOcrDetectStatistic title="Statistic detected book" />
          </View>
        )}

        {/* Uploaded book */}
        {currentTab === EOcrDetectTab.UPLOADED_BOOK && (
          <View className="items-center">
            <View className="flex w-full flex-row justify-evenly gap-6">
              <View className="items-center">
                <Image source={{ uri: uploadedBook.image }} className="h-60 w-40 rounded-lg" />
                <Text className="mt-2 text-center text-base font-semibold">Uploaded Book</Text>
              </View>
            </View>
            <View className="flex-row gap-6">
              <PredictionOcrDetectStatistic />
            </View>
          </View>
        )}

        {/* Detected book */}
        {currentTab === EOcrDetectTab.DETECTED_BOOK && (
          <View className="items-center">
            <View className="flex w-full flex-row justify-evenly gap-6">
              <View className="items-center">
                <Image source={{ uri: detectedBook.image }} className="h-60 w-40 rounded-lg" />
                <Text className="mt-2 text-center text-base font-semibold">Detected Book</Text>
              </View>
            </View>
            <View className="flex-row gap-6">
              <PredictionOcrDetectStatistic />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

export default PredictionOcrDetectTab
