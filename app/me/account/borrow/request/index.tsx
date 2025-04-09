import React from 'react'
import { Text, View } from 'react-native'
import BorrowRequestStatusBadge from '~/components/badge.tsx/borrow-request-status-badge'
import { Card } from '~/components/ui/card'
import { Label } from '~/components/ui/label'
import Loading from '~/components/ui/loading'
import useBorrowRequestsPatron from '~/hooks/borrow/use-borrow-requests-patron'
import { format } from 'date-fns'
import { Href, Stack, useRouter } from 'expo-router'
import { ChevronLeft, Clock } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { Pressable, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

const BorrowRequest = () => {
  const { t } = useTranslation('BookPage')
  const { data: borrowRequests, isLoading } = useBorrowRequestsPatron()
  const router = useRouter()

  if (isLoading) return <Loading />

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Borrow request',
          headerLeft: () => (
            <Pressable onPress={() => router.push('/me/account/borrow')} style={{ padding: 10 }}>
              <ChevronLeft size={24} />
            </Pressable>
          ),
        }}
      />

      <SafeAreaView className="m-0 flex-1 p-0" edges={['left', 'right']}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false} overScrollMode="never">
          <View className="min-h-screen-safe bg-secondary p-6">
            <View className="flex flex-col gap-4">
              {borrowRequests?.sources.map((request) => (
                <Pressable
                  onPress={() =>
                    router.push(`/me/account/borrow/request/${request.borrowRequestId}` as Href)
                  }
                  key={request.borrowRequestId}
                >
                  <Card className="flex flex-col gap-2 p-4">
                    <View className="flex flex-row items-center justify-between">
                      <View className="flex flex-row items-center gap-2">
                        <Clock size={16} color="gray" />
                        <Label>{t('borrow tracking.request date')}</Label>
                      </View>
                      <Text>{format(new Date(request.requestDate), 'HH:mm dd/MM/yyyy')}</Text>
                    </View>

                    <View className="flex flex-row items-center justify-between">
                      <View className="flex flex-row items-center gap-2">
                        <Clock size={16} color="gray" />
                        <Label>{t('borrow tracking.expiration date')}</Label>
                      </View>
                      <Text>{format(new Date(request.expirationDate), 'HH:mm dd/MM/yyyy')}</Text>
                    </View>

                    <View className="flex flex-row items-center justify-between">
                      <Label>{t('borrow tracking.total request items')}</Label>
                      <Text>{request.totalRequestItem}</Text>
                    </View>

                    <View className="flex flex-row items-center justify-between">
                      <Label>{t('borrow tracking.status')}</Label>
                      <BorrowRequestStatusBadge status={request.status} />
                    </View>
                  </Card>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default BorrowRequest
