import React from 'react'
import { Text, View } from 'react-native'
import BorrowRequestStatusBadge from '~/components/badge.tsx/borrow-request-status-badge'
import Loading from '~/components/ui/loading'
import NoData from '~/components/ui/no-data'
import useBorrowRequestPatron from '~/hooks/borrow/use-borrow-request-patron'
import { formatDate } from 'date-fns'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { BookOpen, Calendar, ChevronLeft, Clock, FileText } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { Pressable, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import BorrowBookPreview from '../../_components/borrow-book-preview'
import BorrowReserveItemPreview from '../../_components/borrow-reserve-item-preview'
import BorrowResourcePreview from '../../_components/borrow-resource-preview'

const BorrowRequestDetail = () => {
  const { t } = useTranslation('BookPage')
  const { borrowRequestId } = useLocalSearchParams()
  const router = useRouter()
  const { data: borrowRequest, isLoading } = useBorrowRequestPatron(+borrowRequestId)

  if (isLoading) return <Loading />
  if (!borrowRequest) return <NoData />

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: t('borrow tracking.borrow request detail'),
          headerLeft: () => (
            <Pressable onPress={() => router.push('/me/account/borrow/request')} className="p-2">
              <ChevronLeft size={24} />
            </Pressable>
          ),
        }}
      />

      <SafeAreaView className="flex-1 bg-secondary" edges={['left', 'right']}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false} overScrollMode="never">
          <View className="p-6">
            {/* Status Overview */}
            <View className="mb-6 rounded-xl bg-primary/10 p-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-bold text-primary">
                  {t('borrow tracking.status')}
                </Text>
                <BorrowRequestStatusBadge status={borrowRequest.status} />
              </View>

              <View className="mt-4 flex-row flex-wrap gap-6">
                <View>
                  <Text className="text-xs text-muted-foreground">
                    {t('borrow tracking.request date')}
                  </Text>
                  <View className="flex-row items-center gap-2">
                    <Calendar size={14} className="mr-1 text-primary" />
                    <Text>{formatDate(borrowRequest.requestDate, 'HH:mm dd/MM/yyyy')}</Text>
                  </View>
                </View>

                <View>
                  <Text className="text-xs text-muted-foreground">
                    {t('borrow tracking.expiration date')}
                  </Text>
                  <View className="flex-row items-center gap-2">
                    <Clock size={14} className="mr-1 text-primary" />
                    <Text>
                      {borrowRequest.expirationDate ? (
                        formatDate(borrowRequest.expirationDate, 'HH:mm dd/MM/yyyy')
                      ) : (
                        <NoData />
                      )}
                    </Text>
                  </View>
                </View>

                <View>
                  <Text className="text-xs text-muted-foreground">
                    {t('borrow tracking.total items')}
                  </Text>
                  <View className="flex-row items-center gap-2">
                    <BookOpen size={14} className="mr-1 text-primary" />
                    <Text>{borrowRequest.totalRequestItem}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Request Detail Card */}
            <View className="mb-6 rounded-xl bg-background p-4 shadow">
              <View className="mb-3 flex-row items-center">
                <FileText size={20} className="mr-2 text-primary" />
                <Text className="text-lg font-bold">{t('borrow tracking.request details')}</Text>
              </View>

              <View className="space-y-4">
                {borrowRequest.description && (
                  <View className="rounded-md bg-muted/20 p-3">
                    <Text className="text-sm font-semibold text-muted-foreground">
                      {t('borrow tracking.description')}
                    </Text>
                    <Text className="text-sm">{borrowRequest.description}</Text>
                  </View>
                )}

                {borrowRequest.cancelledAt && (
                  <View>
                    <Text className="text-sm font-semibold text-muted-foreground">
                      {t('borrow tracking.cancelled at')}
                    </Text>
                    <Text>{formatDate(borrowRequest.cancelledAt, 'HH:mm dd/MM/yyyy')}</Text>
                  </View>
                )}

                {borrowRequest.cancellationReason && (
                  <View>
                    <Text className="text-sm font-semibold text-muted-foreground">
                      {t('borrow tracking.cancellation reason')}
                    </Text>
                    <Text>{borrowRequest.cancellationReason}</Text>
                  </View>
                )}

                <View className="flex-row justify-between">
                  <View>
                    <Text className="text-sm font-semibold text-muted-foreground">
                      {t('borrow tracking.reminder sent')}
                    </Text>
                    <Text className="text-sm">
                      {borrowRequest.isReminderSent
                        ? t('borrow tracking.yes')
                        : t('borrow tracking.no')}
                    </Text>
                  </View>

                  <View>
                    <Text className="text-sm font-semibold text-muted-foreground">
                      {t('borrow tracking.pending resources')}
                    </Text>
                    <Text className="text-sm">
                      {borrowRequest.isExistPendingResources
                        ? t('borrow tracking.yes')
                        : t('borrow tracking.no')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Library Items Preview */}
            {borrowRequest.libraryItems?.length > 0 && (
              <View className="mb-6 rounded-xl bg-background p-4 shadow">
                <Text className="mb-3 text-lg font-bold text-primary">
                  {t('borrow tracking.library items')}
                </Text>
                <View className="flex flex-col gap-2">
                  {borrowRequest.libraryItems.map((item) => (
                    <BorrowBookPreview
                      key={`/borrow/library-items/${item.libraryItemId}`}
                      libraryItem={item}
                    />
                  ))}
                </View>
              </View>
            )}

            {/* Reservation Queue */}
            {borrowRequest.reservationQueues?.length > 0 && (
              <View className="rounded-xl bg-background p-4 shadow">
                <Text className="mb-3 text-lg font-bold text-primary">
                  {t('borrow tracking.reservation queue')}
                </Text>
                <View className="flex flex-col gap-2">
                  {borrowRequest.reservationQueues.map((queue) => (
                    <BorrowReserveItemPreview
                      reservationQueue={queue}
                      expandable={true}
                      libraryItem={queue.libraryItem}
                      key={`/borrow/reservation-queues/${queue.libraryItemId}`}
                    />
                  ))}
                </View>
              </View>
            )}

            {borrowRequest.borrowRequestResources?.length > 0 && (
              <View className="rounded-xl bg-background p-4 shadow">
                <Text className="mb-3 text-lg font-bold text-primary">
                  {t('borrow tracking.borrow request resource')}
                </Text>
                <View className="flex flex-col gap-2">
                  {borrowRequest.borrowRequestResources.map((resource) => (
                    <BorrowResourcePreview
                      resource={resource}
                      key={`/borrow/borrow-request-resources/${resource.resourceId}`}
                    />
                  ))}
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default BorrowRequestDetail
