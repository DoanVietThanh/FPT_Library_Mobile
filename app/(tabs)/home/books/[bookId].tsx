import React from 'react'
import { Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

const BookDetail = () => {
  const { bookId } = useLocalSearchParams()

  return (
    <>
      <SafeAreaView className="m-0 flex-1 p-0" edges={['left', 'right', 'bottom']}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="min-h-screen-safe flex flex-col gap-y-6 bg-secondary p-6">
            <Text>Book Detail {bookId}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default BookDetail
