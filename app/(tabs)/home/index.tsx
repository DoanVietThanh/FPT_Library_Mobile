import React from 'react'
import { View } from 'react-native'
import HomeBanner from '~/components/home/banner'
import HomeBookList from '~/components/home/home-book-list'
import useGetCategories from '~/hooks/categories/use-get-cagories'
import { splitCamelCase } from '~/lib/utils'
import { Loader } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  const {
    i18n: { language },
  } = useTranslation()
  const { data: categories, isLoading } = useGetCategories()

  if (isLoading || !categories) {
    return (
      <View className="flex flex-row justify-center">
        <Loader className="size-9 animate-spin" />
      </View>
    )
  }

  return (
    <>
      <SafeAreaView className="m-0 flex-1 p-0" edges={['left', 'right']}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false} overScrollMode="never">
          <View className="min-h-screen-safe flex flex-col gap-y-6 bg-secondary p-6 ">
            <HomeBanner />
            {categories &&
              categories.map((category) => (
                <HomeBookList
                  key={category.categoryId}
                  categoryId={category.categoryId}
                  title={
                    language === 'vi'
                      ? category.vietnameseName
                      : splitCamelCase(category.englishName)
                  }
                />
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}
