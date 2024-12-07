import { View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Text } from '~/components/ui/text'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  const { t } = useTranslation('MoreScreen')

  return (
    <SafeAreaView className="m-0 flex-1 p-0" edges={['left', 'right', 'bottom']}>
      <View className="min-h-screen-safe flex flex-col gap-y-6 bg-secondary p-6">
        <View className="flex w-full flex-row items-center justify-start gap-4 rounded-lg bg-primary-foreground p-4">
          <View className="flex items-center justify-center rounded-full border-2 border-primary p-2">
            <AntDesign name="user" size={32} className="text-primary" />
          </View>
          <View>
            <Text className="text-xl font-semibold text-primary">Doan Viet Thanh</Text>
            <Text>{t('ChangeInfo')}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
