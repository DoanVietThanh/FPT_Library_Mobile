import React, { useRef, useState } from 'react'
import { Animated, Easing, View } from 'react-native'
import BookFilterTabs from '~/components/book-filter-tabs'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import VoiceToText from '~/components/voice-to-text'
import { Stack } from 'expo-router'
import { Filter, Mic } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import FilterBookModal from './_components/filter-book-modal'

export default function SearchBook() {
  const { t } = useTranslation('SearchScreen')
  const [openVoiceToText, setOpenVoiceToText] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState(false)
  const slideAnim = useRef(new Animated.Value(300)).current

  const openRightSheet = () => {
    setIsVisible(true)
    Animated.timing(slideAnim, {
      toValue: 0, // Bring the modal in view
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start()
  }

  return (
    <>
      <Stack.Screen options={{ title: t('Title') }} />
      <SafeAreaView className="m-0 flex-1 p-0" edges={['left', 'right', 'bottom']}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="min-h-screen-safe flex flex-col gap-2 bg-secondary p-6">
            {/* Modal Voice to text */}
            <VoiceToText open={openVoiceToText} setOpen={setOpenVoiceToText} />
            {/* Right Sheet Modal */}
            <FilterBookModal
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              slideAnim={slideAnim}
            />

            {/* Content */}
            <Text className="text-lg font-semibold">
              Tìm kiếm các bài viết, sách, tạp chí và các nội dung khác
            </Text>
            <View className="flex flex-row items-center gap-2">
              <Button
                variant={'outline'}
                onPress={openRightSheet}
                className="flex flex-row items-center gap-2"
              >
                <Filter size={16} color="black" />
                <Text>Tất cả bộ lọc</Text>
              </Button>
              <Mic size={24} color="black" onPress={() => setOpenVoiceToText(true)} />
            </View>

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
