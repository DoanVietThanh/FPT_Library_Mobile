import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import Loading from '~/components/ui/loading'
import NoData from '~/components/ui/no-data'
import useUserPendingActivity from '~/hooks/profile/use-user-pending-activity'
import { formatPrice } from '~/lib/utils'
import { Stack, useRouter } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'

const BorrowTracking = () => {
  const { t } = useTranslation('BookPage.borrow tracking')
  const router = useRouter()
  const { data, isLoading } = useUserPendingActivity()

  if (isLoading) return <Loading />
  if (!data) return <NoData />

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Borrow',
          headerLeft: () => (
            <Pressable onPress={() => router.push('/more')} className="p-3">
              <ChevronLeft size={24} />
            </Pressable>
          ),
        }}
      />
      <View className="flex-1 bg-background p-4">
        <Text className="mb-1 text-2xl font-bold">{t('borrow library items tracking')}</Text>
        <Text className="mb-4 text-muted-foreground">{t('borrow tracking desc')}</Text>

        <Card className="rounded-2xl bg-background p-4 shadow-sm">
          <View className="flex-row flex-wrap justify-between gap-x-6 gap-y-4">
            <InfoBlock label={t('total borrow')} value={data.totalBorrowing} />
            <InfoBlock label={t('total request')} value={data.totalRequesting} />
            <InfoBlock label={t('total borrow in once')} value={data.totalBorrowOnce} />
            <InfoBlock label={t('remain total')} value={data.remainTotal} />
            <InfoBlock
              label={t('unpaid fees')}
              value={formatPrice(150000)}
              textClass="text-yellow-600"
            />
          </View>
        </Card>

        <Button className="mt-4" onPress={() => router.push('/me/account/borrow/request')}>
          <Text className="text-primary-foreground">Borrow request</Text>
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
    <View className="min-w-[45%] rounded-lg px-4 py-3 shadow-sm">
      <Text className="text-sm">{label}</Text>
      <Text className={`mt-1 text-lg font-semibold ${textClass}`}>{value}</Text>
    </View>
  )
}

export default BorrowTracking
