import React, { useRef, useState } from 'react'
import { Animated, View } from 'react-native'
import BookFilterTabs from '~/components/book-filter-tabs'
import { Text } from '~/components/ui/text'
import VoiceToText from '~/components/voice-to-text'
import { Mic } from '~/lib/icons/mic'
import { Stack } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import FilterBookModal from './_components/filter-book-modal'

export default function SearchPage() {
  const { t } = useTranslation('SearchScreen')

  const [openVoiceToText, setOpenVoiceToText] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState(false)
  const slideAnim = useRef(new Animated.Value(300)).current

  return (
    <>
      <Stack.Screen options={{ title: t('Title') }} />
      <SafeAreaView>
        <ScrollView>
          <View className="flex p-6">
            {/* Modal Voice to text */}
            <VoiceToText open={openVoiceToText} setOpen={setOpenVoiceToText} />
            {/* Right Sheet Modal */}
            <FilterBookModal
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              slideAnim={slideAnim}
            />

            {/* Content */}

            <View className="flex flex-row items-center justify-between">
              <Text className=" text-lg font-semibold">
                Tìm kiếm các bài viết, sách, tạp chí và các nội dung khác
              </Text>
            </View>
            <Mic
              size={24}
              className="text-foreground"
              strokeWidth={1.5}
              onPress={() => setOpenVoiceToText(true)}
            />

            {/* Filter book tabs */}
            <View className="flex flex-1 flex-col gap-2">
              <BookFilterTabs />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}
