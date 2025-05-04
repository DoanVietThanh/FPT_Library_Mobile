import React, { useState } from 'react'
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import Barcode from '@kichiyaki/react-native-barcode-generator'
import PackageCard from '~/components/package-card'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import Loading from '~/components/ui/loading'
import NoData from '~/components/ui/no-data'
import { Separator } from '~/components/ui/separator'
import { useAuth } from '~/contexts/auth-provider'
import usePackages from '~/hooks/packages/use-packages'
import { Package } from '~/types/models'
import { format } from 'date-fns'
import { Stack, useRouter } from 'expo-router'
import { BookOpen, Calendar, CheckCircle, ChevronLeft, MapPin } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

const MeLibraryCard = () => {
  const router = useRouter()
  const { t } = useTranslation('MeLibraryCard')
  const { user, isLoadingAuth } = useAuth()
  const { data: packages, isLoading: isLoadingPackages } = usePackages()
  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(null)

  if (isLoadingAuth || isLoadingPackages) {
    return <Loading />
  }

  if (!user || !packages || packages.length === 0) {
    return null
  }

  const formatDate = (dateString: string): string => {
    if (!dateString) return 'N/A' // Tránh lỗi khi dateString là rỗng

    // Chuẩn hóa định dạng: Thêm `000` nếu phần thập phân thiếu
    const normalizedDate = dateString.replace(/(\.\d{1,2})$/, '')

    try {
      return format(new Date(normalizedDate), 'MMM dd, yyyy')
    } catch (error) {
      console.error('🚀 ~ formatDate error:', error)
      return 'Invalid Date'
    }
  }

  const handleContinue = () => {
    if (selectedPackageId) {
      router.push(`/me/account/library-card/register?packageId=${selectedPackageId}`)
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: t('Library Card'),
          headerLeft: () => (
            <Pressable onPress={() => router.push('/more')} style={{ padding: 10 }}>
              <ChevronLeft size={24} />
            </Pressable>
          ),
        }}
      />
      <SafeAreaView className="m-0 flex-1 p-0" edges={['left', 'right']}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false} overScrollMode="never">
          <View className="min-h-screen-safe p-6">
            {/* Library card */}
            {user.libraryCard ? (
              <View className="flex flex-col gap-y-6">
                <View>
                  <Text className="mb-2 text-xl font-semibold">{t('Library Card')}</Text>
                  <Card className="overflow-hidden rounded-xl">
                    <CardHeader className="flex flex-row justify-between bg-primary text-primary-foreground">
                      <View className="flex flex-row items-center gap-2">
                        <BookOpen size={24} color={'white'} />
                        <Text className="text-lg font-semibold text-primary-foreground">
                          ELibrary
                        </Text>
                      </View>
                      {/* <Text className="text-lg text-primary-foreground">Member Card</Text> */}
                    </CardHeader>
                    <CardContent>
                      <View className="my-4 flex flex-row items-start gap-4 ">
                        <Image
                          source={{
                            uri:
                              user.libraryCard?.avatar || 'https://example.com/default-avatar.png',
                          }}
                          className="h-24 w-20 rounded-lg object-contain"
                        />
                        <View className="flex flex-1 flex-col justify-between gap-2 ">
                          <Text className="text-xl font-semibold">
                            {user.libraryCard?.fullName}
                          </Text>
                          <Text>{user?.email}</Text>
                          {user.dob ? (
                            <View className="flex flex-row items-center">
                              <Calendar size={16} color="gray" />
                              <Text> {formatDate(user.dob)}</Text>
                            </View>
                          ) : (
                            <NoData />
                          )}
                          {user.address && (
                            <View className="flex flex-row items-center gap-1 text-sm">
                              <MapPin size={16} color={'gray'} />
                              <Text>{user?.address}</Text>
                            </View>
                          )}
                        </View>
                      </View>

                      <View className="flex flex-row justify-center p-4">
                        <Barcode
                          value={user.libraryCard?.barcode || ''}
                          format="CODE128"
                          width={20}
                          height={40}
                          lineColor="black"
                          maxWidth={300}
                        />
                      </View>
                    </CardContent>
                  </Card>
                </View>

                {/* Information */}
                <View>
                  <Text className="mb-2 text-xl font-semibold">{t('Card Information')}</Text>
                  <Card className="flex flex-col gap-4 p-4">
                    <View className="flex flex-row items-center justify-between gap-2">
                      <View className="flex flex-row items-center gap-2">
                        <BookOpen size={16} color={'gray'} />
                        <Text>{t('Issuance Method')}</Text>
                      </View>
                      <Text>{user?.libraryCard?.issuanceMethod}</Text>
                    </View>

                    <View className="flex flex-row items-center justify-between gap-2">
                      <View className="flex flex-row items-center gap-2">
                        <BookOpen size={16} color={'gray'} />
                        <Text>{t('Allow Borrow More')}</Text>
                      </View>
                      <Text>{user?.libraryCard?.isAllowBorrowMore ? '✅' : '❌'}</Text>
                    </View>

                    <View className="flex flex-row items-center justify-between gap-2">
                      <View className="flex flex-row items-center gap-2">
                        <BookOpen size={16} color={'gray'} />
                        <Text>{t('Max Items at Once')}</Text>
                      </View>
                      <Text>{user?.libraryCard?.maxItemOnceTime}</Text>
                    </View>

                    <View className="flex flex-row items-center justify-between gap-2">
                      <View className="flex flex-row items-center gap-2">
                        <BookOpen size={16} color={'gray'} />
                        <Text>{t('Total Missed Pickups')}</Text>
                      </View>
                      <Text>{user?.libraryCard?.totalMissedPickUp}</Text>
                    </View>

                    <View className="flex flex-row items-center justify-between gap-2">
                      <View className="flex flex-row items-center gap-2">
                        <BookOpen size={16} color={'gray'} />
                        <Text>{t('Reminder Sent')}</Text>
                      </View>
                      <Text>{user?.libraryCard?.isReminderSent ? '✅' : '❌'}</Text>
                    </View>

                    <View className="flex flex-row items-center justify-between gap-2">
                      <View className="flex flex-row items-center gap-2">
                        <BookOpen size={16} color={'gray'} />
                        <Text>{t('Extended')}</Text>
                      </View>
                      <Text>{user?.libraryCard?.isExtended ? '✅' : '❌'}</Text>
                    </View>

                    <View className="flex flex-row items-center justify-between gap-2">
                      <View className="flex flex-row items-center gap-2">
                        <BookOpen size={16} color={'gray'} />
                        <Text>{t('Extension Count')}</Text>
                      </View>
                      <Text>{user?.libraryCard?.extensionCount}</Text>
                    </View>

                    <View className="flex flex-row items-center justify-between gap-2">
                      <View className="flex flex-row items-center gap-2">
                        <Calendar size={16} color={'gray'} />
                        <Text>{t('Expiry Date')}</Text>
                      </View>
                      {user?.libraryCard?.expiryDate ? (
                        <Text>{formatDate(user?.libraryCard?.expiryDate)}</Text>
                      ) : (
                        <NoData />
                      )}
                    </View>
                  </Card>
                </View>
              </View>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text className="mb-4 text-2xl font-bold">{t('Library Card Introduction')}</Text>

                <View className="mb-6 space-y-4">
                  <Text className="text-xl font-semibold">{t('What is a Library Card')}</Text>
                  <Text>{t('library card defi')}</Text>
                </View>

                <View className="mb-6 space-y-4">
                  <Text className="text-xl font-semibold">{t('Who is it for')}</Text>
                  <Text>{t('Who is it for desc')}</Text>
                </View>

                <View className="mb-6 space-y-4">
                  <Text className="text-xl font-semibold">{t('Benefits')}</Text>
                  <View className="flex flex-col">
                    <View className="flex flex-row items-center gap-2">
                      <CheckCircle size={16} className="size-4" color={'green'} />
                      <Text>{t('Borrow up to 3 books at once')}</Text>
                    </View>
                    <View className="flex flex-row items-center gap-2">
                      <CheckCircle size={16} className="size-4" color={'green'} />
                      <Text>{t('Borrow ebooks and audiobooks')}</Text>
                    </View>
                    <View className="flex flex-row items-center gap-2">
                      <CheckCircle size={16} className="size-4" color={'green'} />
                      <Text>{t('Reserve library items')}</Text>
                    </View>
                  </View>
                </View>

                <View className="mb-6 space-y-4">
                  <Text className="text-xl font-semibold">{t('Policies')}</Text>
                  <View className="flex flex-col">
                    <View className="flex flex-row items-center gap-2">
                      <CheckCircle size={16} className="size-4" color={'green'} />
                      <Text>{t('No benefits if library card is expire')}</Text>
                    </View>
                    <View className="flex flex-row items-center gap-2">
                      <CheckCircle size={16} className="size-4" color={'green'} />
                      <Text>{t('Lost items incur a penalty fee')}</Text>
                    </View>
                    <View className="flex flex-row items-center gap-2">
                      <CheckCircle size={16} className="size-4" color={'green'} />
                      <Text>{t('Late returns incur a penalty fee')}</Text>
                    </View>
                    <View className="flex flex-row items-center gap-2">
                      <CheckCircle size={16} className="size-4" color={'green'} />
                      <Text>
                        {t('Must re-register to continue receiving benefits if card is lost')}
                      </Text>
                    </View>
                  </View>
                </View>

                <Separator />
                <View className="mt-4 flex flex-col gap-2">
                  <Text className="text-center text-xl font-semibold">
                    {t('Important Information')}
                    <Text className="text-2xl font-semibold text-danger">(*)</Text>
                  </Text>
                  <Text className="text-justify text-sm">{t('Important Information desc')}</Text>
                  <Text className="text-lg font-semibold">
                    {t('Please select a package that best suits your needs')}
                  </Text>
                </View>

                {packages.map((item: Package) => (
                  <TouchableOpacity
                    key={item.libraryCardPackageId}
                    onPress={() =>
                      setSelectedPackageId((prev) =>
                        prev === item.libraryCardPackageId ? null : item.libraryCardPackageId,
                      )
                    }
                  >
                    <PackageCard packageId={item.libraryCardPackageId.toString()} />
                  </TouchableOpacity>
                ))}

                <Button onPress={handleContinue} disabled={!selectedPackageId}>
                  <Text className="text-center font-semibold text-primary-foreground">
                    {t('I understand and want to continue')}
                  </Text>
                </Button>
              </ScrollView>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default MeLibraryCard
