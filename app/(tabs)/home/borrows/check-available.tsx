import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import Loading from '~/components/ui/loading'
import useCheckAvailableBorrowRequest from '~/hooks/borrow/use-check-available-borrow-request'
import { useBorrowStore } from '~/store/borrow/use-borrow-store'
import { useRouter } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import AvailableBorrowLibraryItem from './_components/available-borrow-library-item'
import AvailableBorrowResource from './_components/available-borrow-resource'

const CheckAvailableBorrow = () => {
  const router = useRouter()
  const { t } = useTranslation('BookPage')
  const { selectedLibraryItemIds, selectedResourceIds } = useBorrowStore()
  const [allowToReserveItems, setAllowToReserveItems] = useState<number[]>([])
  const [allowToBorrowResources, setAllowToBorrowResources] = useState<number[]>([])
  const { data, isLoading, refetch } = useCheckAvailableBorrowRequest(selectedLibraryItemIds)

  const isAllowedBorrowRequest: boolean =
    data?.alreadyBorrowedItems.length === 0 &&
    data?.alreadyRequestedItems.length === 0 &&
    data?.alreadyReservedItems.length === 0

  useEffect(() => {
    refetch()
  }, [refetch])

  if (isLoading) return <Loading />

  console.log('🚀 ~ CheckAvailableBorrow ~ isAllowedBorrowRequest:', isAllowedBorrowRequest)
  console.log('🚀 ~ CheckAvailableBorrow ~ data:', data)

  return (
    <>
      <SafeAreaView className="m-0 flex-1 p-0" edges={['left', 'right']}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false} overScrollMode="never">
          <View className="min-h-screen-safe flex flex-col gap-y-2 bg-secondary p-6 ">
            <View className="flex-row items-center gap-2">
              <ChevronLeft onPress={() => router.back()} size={20} color="black" />
              <Text className="text-xl font-semibold">Borrow list</Text>
            </View>

            {/* Succeed to request borrow */}
            {isAllowedBorrowRequest && data && (
              <View className="flex flex-col gap-2">
                {data?.allowToBorrowItems.length > 0 && (
                  <View>
                    <Text className="font-semibold">
                      {t('allow to borrow')} ({data?.allowToBorrowItems.length})
                    </Text>
                    {data?.allowToBorrowItems.map((item) => (
                      <AvailableBorrowLibraryItem key={item.libraryItemId} libraryItem={item} />
                    ))}
                  </View>
                )}

                {data?.allowToReserveItems.length > 0 && (
                  <View>
                    <Text className="font-semibold">
                      {t('allow to reserve')} ({data?.allowToReserveItems.length})
                    </Text>
                    <Text className="text-danger">{t('allow to reserve message')}</Text>
                    {data?.allowToReserveItems.map((item) => (
                      <AvailableBorrowLibraryItem
                        key={item.libraryItemId}
                        libraryItem={item}
                        allowToReserveItems={allowToReserveItems}
                        setAllowToReserveItems={setAllowToReserveItems}
                      />
                    ))}
                  </View>
                )}
              </View>
            )}

            {/* Fail to request borrow */}
            {!isAllowedBorrowRequest && data && selectedLibraryItemIds.length > 0 && (
              <View className="flex flex-col gap-2">
                {data?.alreadyRequestedItems?.length > 0 && (
                  <View>
                    <Text className="font-semibold">
                      {t('already requested items')} ({data?.alreadyRequestedItems.length})
                    </Text>
                    <Text className="text-danger">
                      {t('the document has been requested by you')}. &nbsp;
                      {t('please delete from borrow list')}
                    </Text>
                    {data?.alreadyRequestedItems.map((item) => (
                      <AvailableBorrowLibraryItem key={item.libraryItemId} libraryItem={item} />
                    ))}
                  </View>
                )}

                {data?.alreadyBorrowedItems.length > 0 && (
                  <View>
                    <Text className="font-semibold">
                      {t('already borrowed items')} ({data?.alreadyBorrowedItems.length}
                      &nbsp;items)
                    </Text>
                    <Text className="text-danger">
                      {t('the document is being borrowed by you')}. &nbsp;
                      {t('please delete from borrow list')}
                    </Text>
                    {data?.alreadyBorrowedItems.map((item) => (
                      <AvailableBorrowLibraryItem key={item.libraryItemId} libraryItem={item} />
                    ))}
                  </View>
                )}

                {data?.alreadyReservedItems.length > 0 && (
                  <View>
                    <Text className="font-semibold">
                      {t('already reserved items')} ({data?.alreadyReservedItems.length}
                      &nbsp; items)
                    </Text>
                    <Text className="text-danger">
                      {t('the document has been booked by you')}. &nbsp;
                      {t('please delete from borrow list')}
                    </Text>
                    {data?.alreadyReservedItems.map((item) => (
                      <AvailableBorrowLibraryItem key={item.libraryItemId} libraryItem={item} />
                    ))}
                  </View>
                )}
              </View>
            )}

            {selectedResourceIds.length > 0 && (
              <View className="flex flex-col gap-2">
                <Text className="font-semibold">
                  {t('allow to borrow')} ({selectedResourceIds.length})
                </Text>
                {selectedResourceIds.map((id) => (
                  <AvailableBorrowResource
                    key={id}
                    allowToBorrowResources={allowToBorrowResources}
                    setAllowToBorrowResources={setAllowToBorrowResources}
                    resourceId={+id}
                  />
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default CheckAvailableBorrow
