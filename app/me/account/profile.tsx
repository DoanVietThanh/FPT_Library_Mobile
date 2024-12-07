import { Pressable, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Label } from '~/components/ui/label'
import { Separator } from '~/components/ui/separator'
import { Text } from '~/components/ui/text'
import { Stack, useRouter } from 'expo-router'
import { ChevronLeft, SquarePen } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  const router = useRouter()
  const { t } = useTranslation('Me')

  return (
    <>
      <Stack.Screen
        options={{
          title: t('Account.Profile.Title'),
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ padding: 10 }}>
              <ChevronLeft size={24} color="orange" />
            </Pressable>
          ),
        }}
      />

      <SafeAreaView className="m-0 flex-1 p-0" edges={['left', 'right', 'bottom']}>
        <View className="min-h-screen-safe flex flex-col gap-y-6 bg-secondary p-6">
          <View className="flex w-full items-center justify-start gap-2 rounded-lg bg-primary-foreground p-4">
            <View className="flex items-center justify-center rounded-full border-2 border-primary p-2">
              <AntDesign name="user" size={32} className="text-primary" />
            </View>
            <Text className="text-xl font-semibold text-primary">Doan Viet Thanh</Text>
          </View>

          <View className="flex flex-row justify-between">
            <Text className="text-xl font-semibold text-primary">
              {t('Account.Profile.OtherInfo')}
            </Text>
            <SquarePen color={'orange'} />
          </View>
          <View className="flex gap-4 rounded-lg bg-primary-foreground p-4">
            <View>
              <Label className="font-semibold">{t('Account.Profile.Gender')}</Label>
              <Text className="text-sm">Nam</Text>
            </View>
            <Separator />
            <View>
              <Label className="font-semibold">{t('Account.Profile.Phone')}</Label>
              <Text className="text-sm">0123456789</Text>
            </View>
            <Separator />
            <View>
              <Label className="font-semibold">{t('Account.Profile.Email')}</Label>
              <Text className="text-sm">thanhdvse171867@fpt.edu.vn</Text>
            </View>
            <Separator />
            <View>
              <Label className="font-semibold">{t('Account.Profile.Address')}</Label>
              <Text className="text-sm">Tam Bình, TP Thủ Đức, TP HCM</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}
