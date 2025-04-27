import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import Loading from '~/components/ui/loading'
import NoData from '~/components/ui/no-data'
import useUserPendingActivity from '~/hooks/profile/use-user-pending-activity'
import { Stack, useRouter } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'

const BorrowTracking = () => {
  const { t } = useTranslation('BookPage')
  const router = useRouter()
  const { data, isLoading } = useUserPendingActivity()

  if (isLoading) return <Loading />
  if (!data) return <NoData />

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: t('borrow'),
          headerLeft: () => (
            <Pressable onPress={() => router.push('/more')} className="p-3">
              <ChevronLeft size={24} />
            </Pressable>
          ),
        }}
      />
      <View className="flex-1 bg-background p-4">
        <Text className="mb-1 text-2xl font-bold">
          {t('borrow tracking.borrow library items tracking')}
        </Text>
        <Text className="mb-4 text-muted-foreground">
          {t('borrow tracking.borrow tracking desc')}
        </Text>

        <Card className="rounded-2xl bg-background p-4 shadow-sm">
          <View className="flex-row flex-wrap justify-between gap-x-6 gap-y-4">
            <InfoBlock label={t('borrow tracking.total borrow')} value={data.totalBorrowing} />
            <InfoBlock label={t('borrow tracking.total request')} value={data.totalRequesting} />
            <InfoBlock
              label={t('borrow tracking.total borrow in once')}
              value={data.totalBorrowOnce}
            />
            <InfoBlock label={t('borrow tracking.remain total')} value={data.remainTotal} />
          </View>
        </Card>

        <Button className="mt-4" onPress={() => router.push('/me/account/borrow/request')}>
          <Text className="text-primary-foreground">{t('borrow tracking.borrow request')}</Text>
        </Button>
      </View>
    </>
  )
}

function InfoBlock({
  label,
  value,
  textClass = '',
}: {
  label: string
  value: string | number
  textClass?: string
}) {
  return (
    <View className="w-1/2 rounded-lg">
      <Text className="text-sm">{label}</Text>
      <Text className={`mt-1 text-lg font-semibold ${textClass}`}>{value}</Text>
    </View>
  )
}

export default BorrowTracking
