import React from 'react'
import { Text, View } from 'react-native'
import { dummyBooks } from '~/components/home/dummy-books'
import PredictLibraryItemInfo from '~/components/ui/predict-library-item-info'
import { usePrediction } from '~/store/ai/use-prediction'

const PredictionOtherMatchesTab = () => {
  const book = dummyBooks[0]

  const { predictResult } = usePrediction()

  if (!book) {
    return <Text className="text-center text-lg">Book not found</Text>
  }

  return (
    <View className="flex flex-col gap-2">
      {predictResult?.otherItems?.map((item) => (
        <PredictLibraryItemInfo
          key={book.id}
          libraryItemId={item.libraryItemId.toString()}
          ocrResult={item.ocrResult}
        />
      ))}
    </View>
  )
}

export default PredictionOtherMatchesTab
