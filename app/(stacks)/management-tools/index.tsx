import React from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { ChevronLeft } from '~/lib/icons/chevron-left'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'

function ManagementToolsScreen() {
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
        <Text className="shrink-0 text-lg font-bold">{t('Management tools')}</Text>
        <View className="flex-1"></View>
      </View>

      <ScrollView>
        <View className="flex gap-4 p-4">
          <Button
            size="lg"
            variant="outline"
            className="flex w-full flex-row justify-start gap-2"
            onPress={() => router.push('/(stacks)/management-tools/guides')}
          >
            <Text>{t('Management guides')}</Text>
          </Button>

          <Button
            onPress={() => router.push('/(stacks)/management-tools/change-instance-shelf-status')}
            size="lg"
            variant="outline"
            className="flex w-full flex-row justify-start gap-2"
          >
            <Text>{t('Change instances shelf')}</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ManagementToolsScreen
