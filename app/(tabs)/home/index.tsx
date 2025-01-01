import React from 'react'
import { View } from 'react-native'
import HomeBanner from '~/components/home/banner'
import HomeBookList from '~/components/home/home-book-list'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  return (
    <>
      <SafeAreaView className="m-0 flex-1 py-4" edges={['left', 'right', 'bottom']}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="min-h-screen-safe flex flex-col gap-y-6 bg-secondary p-6">
            <HomeBanner />
            <HomeBookList title="Best seller" totalBooks={120} />
            <HomeBookList title="Recommend for You" totalBooks={12} />
            <HomeBookList title="Recent Reading" totalBooks={40} />
            <HomeBookList title="Academic Book" totalBooks={24} />
            <HomeBookList title="News" totalBooks={17} />
            <HomeBookList title="Children Book" totalBooks={10} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}
