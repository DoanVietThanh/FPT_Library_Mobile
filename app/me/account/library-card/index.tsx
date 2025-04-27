import React, { useState } from 'react'
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import Barcode from '@kichiyaki/react-native-barcode-generator'
import PackageCard from '~/components/package-card'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card'
import Loading from '~/components/ui/loading'
import NoData from '~/components/ui/no-data'
import { Separator } from '~/components/ui/separator'
import { useAuth } from '~/contexts/auth-provider'
import usePackages from '~/hooks/packages/use-packages'
import { Package } from '~/types/models'
import { format } from 'date-fns'
import { Stack, useRouter } from 'expo-router'
import { BookOpen, Calendar, CheckCircle, ChevronLeft, MapPin } from 'lucide-react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

const MeLibraryCard = () => {
  const router = useRouter()
  const { user, isLoadingAuth } = useAuth()
  console.log('🚀 ~ Home ~ user:', user)
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
          headerTitle: 'Library Card',
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
                  <Text className="mb-2 text-xl font-semibold">Library Card</Text>
                  <Card className="overflow-hidden rounded-xl">
                    <CardHeader className="flex flex-row justify-between bg-primary text-primary-foreground">
                      <View className="flex flex-row items-center gap-2">
                        <BookOpen size={24} color={'white'} />
                        <Text className="text-lg font-semibold text-primary-foreground">
                          ELibrary
                        </Text>
                      </View>
                      <Text className="text-lg text-primary-foreground">Member Card</Text>
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

                      {/* <View className="flex flex-row justify-between">
                        <Text>Issue Date</Text>
                        <Text>{formatDate(user.libraryCard?.issueDate || '')}</Text>
                      </View>
                      <View className="flex flex-row justify-between">
                        <Text>Expiry Date</Text>
                        <Text>{formatDate(user.libraryCard?.expiryDate || '')}</Text>
                      </View> */}
                    </CardContent>

                    <CardFooter>
                      <Text className="text-xs">
                        This card remains the property of ELibrary. If found, please return to any
                        ELibrary branch.
                      </Text>
                    </CardFooter>
                  </Card>
                </View>

                {/* Information */}
                <View>
                  <Text className="mb-2 text-xl font-semibold">Card Information</Text>
                  <Card className="flex flex-col gap-4 p-4">
                    <View className="flex flex-row items-center justify-between gap-2">
                      <View className="flex flex-row items-center gap-2">
                        <BookOpen size={16} color={'gray'} />
                        <Text>Issuance Method</Text>
                      </View>
                      <Text>{user?.libraryCard?.issuanceMethod}</Text>
                    </View>

                    <View className="flex flex-row items-center justify-between gap-2">
                      <View className="flex flex-row items-center gap-2">
                        <BookOpen size={16} color={'gray'} />
                        <Text>Allow Borrow More</Text>
                      </View>
                      <Text>{user?.libraryCard?.isAllowBorrowMore ? '✅' : '❌'}</Text>
                    </View>

                    <View className="flex flex-row items-center justify-between gap-2">
                      <View className="flex flex-row items-center gap-2">
                        <BookOpen size={16} color={'gray'} />
                        <Text>Max Items at Once</Text>
                      </View>
                      <Text>{user?.libraryCard?.maxItemOnceTime}</Text>
                    </View>

                    <View className="flex flex-row items-center justify-between gap-2">
                      <View className="flex flex-row items-center gap-2">
                        <BookOpen size={16} color={'gray'} />
                        <Text>Total Missed Pickups</Text>
                      </View>
                      <Text>{user?.libraryCard?.totalMissedPickUp}</Text>
                    </View>

                    <View className="flex flex-row items-center justify-between gap-2">
                      <View className="flex flex-row items-center gap-2">
                        <BookOpen size={16} color={'gray'} />
                        <Text>Reminder Sent</Text>
                      </View>
                      <Text>{user?.libraryCard?.isReminderSent ? '✅' : '❌'}</Text>
                    </View>

                    <View className="flex flex-row items-center justify-between gap-2">
                      <View className="flex flex-row items-center gap-2">
                        <BookOpen size={16} color={'gray'} />
                        <Text>Extended</Text>
                      </View>
                      <Text>{user?.libraryCard?.isExtended ? '✅' : '❌'}</Text>
                    </View>

                    <View className="flex flex-row items-center justify-between gap-2">
                      <View className="flex flex-row items-center gap-2">
                        <BookOpen size={16} color={'gray'} />
                        <Text>Extension Count</Text>
                      </View>
                      <Text>{user?.libraryCard?.extensionCount}</Text>
                    </View>

                    <View className="flex flex-row items-center justify-between gap-2">
                      <View className="flex flex-row items-center gap-2">
                        <Calendar size={16} color={'gray'} />
                        <Text>Expiry Date</Text>
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
                <Text className="mb-4 text-2xl font-bold">Library Card Introduction</Text>

                <View className="mb-6 space-y-4">
                  <Text className="text-xl font-semibold">What is a Library Card?</Text>
                  <Text>
                    A library card is your key to accessing our extensive collection of books,
                    digital resources, and exclusive services. It is a personal identification that
                    grants you borrowing privileges and access to our facilities.
                  </Text>
                </View>

                <View className="mb-6 space-y-4">
                  <Text className="text-xl font-semibold">Who is it for?</Text>
                  <Text>
                    Our library card is perfect for students, researchers, professionals, and anyone
                    with a passion for knowledge and learning. Available to all residents aged 12
                    and above.
                  </Text>
                </View>

                <View className="mb-6 space-y-4">
                  <Text className="text-xl font-semibold">Benefits?</Text>
                  <View className="flex flex-col">
                    <View className="flex flex-row items-center gap-2">
                      <CheckCircle size={16} className="size-4" color={'green'} />
                      <Text>Borrow up to 10 books at once</Text>
                    </View>
                    <View className="flex flex-row items-center gap-2">
                      <CheckCircle size={16} className="size-4" color={'green'} />
                      <Text>Access to digital resources and e-books</Text>
                    </View>
                    <View className="flex flex-row items-center gap-2">
                      <CheckCircle size={16} className="size-4" color={'green'} />
                      <Text>Reserve books and study rooms</Text>
                    </View>
                    <View className="flex flex-row items-center gap-2">
                      <CheckCircle size={16} className="size-4" color={'green'} />
                      <Text>Participate in exclusive events</Text>
                    </View>
                  </View>
                </View>

                <View className="mb-6 space-y-4">
                  <Text className="text-xl font-semibold">Policies?</Text>
                  <View className="flex flex-col">
                    <View className="flex flex-row items-center gap-2">
                      <CheckCircle size={16} className="size-4" color={'green'} />
                      <Text>Valid for 1 year from date of issue</Text>
                    </View>
                    <View className="flex flex-row items-center gap-2">
                      <CheckCircle size={16} className="size-4" color={'green'} />
                      <Text>Books can be borrowed for up to 3 weeks</Text>
                    </View>
                    <View className="flex flex-row items-center gap-2">
                      <CheckCircle size={16} className="size-4" color={'green'} />
                      <Text>Late returns incur a small fee</Text>
                    </View>
                    <View className="flex flex-row items-center gap-2">
                      <CheckCircle size={16} className="size-4" color={'green'} />
                      <Text>Replacement fee for lost cards</Text>
                    </View>
                  </View>
                </View>

                <Separator />
                <View className="mt-4 flex flex-col gap-2">
                  <Text className="text-center text-xl font-semibold">
                    Important Information{' '}
                    <Text className="text-2xl font-semibold text-danger">(*)</Text>
                  </Text>
                  <Text className="text-justify text-sm">
                    By registering for a library card, you agree to follow our library rules and
                    policies. You are responsible for all materials borrowed with your card and any
                    fees incurred. Please notify us immediately if your card is lost or stolen.
                  </Text>
                  <Text className="text-lg font-semibold">
                    Please select a package that best suits your needs and preferences.
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
                    I understand and want to continue
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
