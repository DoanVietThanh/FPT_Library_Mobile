import React from 'react'
import { Pressable, View } from 'react-native'
import { Text } from '~/components/ui/text'
import { ChevronLeft } from '~/lib/icons/chevron-left'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

function EmployeeGuidesScreen() {
  const { t } = useTranslation('ManagementToolsScreen')
  const router = useRouter()
  return (
    <SafeAreaView className="m-0 flex-1 p-0">
      <View className="flex flex-row items-center justify-center px-4 py-2">
        <View className="flex-1">
          <Pressable onPress={() => router.back()}>
            <ChevronLeft size={28} className="text-primary" />
          </Pressable>
        </View>
        <Text className="shrink-0 text-lg font-bold">{t('Management guides')}</Text>
        <View className="flex-1"></View>
      </View>

      <ScrollView>
        <Text>TODO</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EmployeeGuidesScreen
