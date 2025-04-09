import { useEffect, useState } from 'react'
import { Image, ScrollView, View } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import Barcode from '@kichiyaki/react-native-barcode-generator'
import { HubConnection } from '@microsoft/signalr'
import PackageCard from '~/components/package-card'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import Loading from '~/components/ui/loading'
import NoData from '~/components/ui/no-data'
import PaymentCard from '~/components/ui/payment-card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Text } from '~/components/ui/text'
import { useAuth } from '~/contexts/auth-provider'
import useCreateLibraryCardTransaction from '~/hooks/library-card/use-create-library-card-transaction'
import useRegisterLibraryCard from '~/hooks/library-card/use-register-library-card'
import usePackage from '~/hooks/packages/use-package'
import useGetPaymentMethods from '~/hooks/payment/use-payment-methods'
import useUploadImage from '~/hooks/upload/upload-image'
import handleActionError from '~/lib/handle-action-error'
import { connectToSignalR, disconnectSignalR } from '~/lib/signalR'
import {
  offReceiveVerifyPaymentStatus,
  onReceiveVerifyPaymentStatus,
  SocketVerifyPaymentStatus,
} from '~/lib/signalR/verify-payment-status'
import { ETransactionStatus, ResourceType } from '~/types/enum'
import type { PaymentData } from '~/types/models'
import { format } from 'date-fns'
import * as ImagePicker from 'expo-image-picker'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { BookOpen, Calendar, ChevronLeft, MapPin, Upload } from 'lucide-react-native'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Pressable } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { z } from 'zod'

const cardId = 'dummy_card_id_01234567890123456789'

const libraryCardRegisterSchema = z.object({
  avatar: z.custom<File | null>((file) => file !== null, {
    message: 'Avatar is required',
  }),
  fullName: z.string().min(1, { message: 'Required' }),
  libraryCardPackageId: z.number().int().positive(),
  resourceId: z.string().nullable().catch(null),
  description: z.string().nullable().catch(null),
  paymentMethodId: z.number().int().positive({ message: 'Required' }),
  transactionType: z.number().int().positive(),
})

type TLibraryCardRegisterSchema = z.infer<typeof libraryCardRegisterSchema>

export default function LibraryCardRegister() {
  const router = useRouter()
  const { user, isLoadingAuth, accessToken } = useAuth()
  const { packageId } = useLocalSearchParams()
  const { t: tZod } = useTranslation('Zod')

  const { data: packageData, isLoading: isLoadingPackageData } = usePackage(Number(packageId))
  const { data: paymentMethods, isLoading: isLoadingPaymentMethods } = useGetPaymentMethods()
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)
  const [connection, setConnection] = useState<HubConnection | null>(null)

  const [paymentStates, setPaymentStates] = useState({
    leftTime: 0,
    canNavigate: false,
    navigateTime: 5,
    status: ETransactionStatus.PENDING,
  })

  const { mutate: uploadImage, isPending: isPendingUpload } = useUploadImage()

  const { mutate: registerLibraryCard, isPending: isPendingRegisterLibraryCard } =
    useRegisterLibraryCard()
  const { mutate: createLibraryCardTransaction, isPending: isPendingCreateLibraryCardTransaction } =
    useCreateLibraryCardTransaction()

  // Connect to SignalR
  useEffect(() => {
    if (!accessToken) return
    const connection = connectToSignalR('payment-hub', accessToken)
    setConnection(connection)
    return () => {
      disconnectSignalR(connection)
    }
  }, [accessToken])

  // Receive payment status
  useEffect(() => {
    if (!connection) return
    const callback = (event: SocketVerifyPaymentStatus) => {
      if (event.status === ETransactionStatus.PENDING) return
      setPaymentStates((prev) => ({
        ...prev,
        canNavigate: true,
        leftTime: 0,
        status: event.status,
      }))
    }
    onReceiveVerifyPaymentStatus(connection, callback)
    return () => {
      offReceiveVerifyPaymentStatus(connection, callback)
    }
  }, [connection])

  // Reduce left time
  useEffect(() => {
    const timer = setInterval(() => {
      const leftTime = paymentData?.expiredAt ? paymentData.expiredAt.getTime() - Date.now() : 0

      setPaymentStates((prev) => ({ ...prev, leftTime }))
      if (leftTime > 0 || !paymentData?.expiredAt) return
      setPaymentStates((prev) => ({
        ...prev,
        leftTime: 0,
        canNavigate: true,
        status: ETransactionStatus.EXPIRED,
      }))
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [paymentData?.expiredAt])

  // Reduce navigate time
  useEffect(() => {
    const timer = setInterval(() => {
      if (!paymentStates.canNavigate) return
      const navigateTime = paymentStates.navigateTime - 1
      if (navigateTime <= 0) {
        router.push('/me/account/library-card')
        return
      }
      setPaymentStates((prev) => ({ ...prev, navigateTime }))
    }, 1000)
    return () => clearInterval(timer)
  }, [paymentStates.canNavigate, paymentStates.navigateTime, router])

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setFocus,
    clearErrors,
  } = useForm<TLibraryCardRegisterSchema>({
    resolver: zodResolver(libraryCardRegisterSchema),
    defaultValues: {
      avatar: null,
      fullName: '',
      libraryCardPackageId: Number(packageId),
      resourceId: null,
      description: null,
      paymentMethodId: undefined,
      transactionType: 2,
    },
  })

  const watchedFullName = watch('fullName')

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      const imageUri = result.assets[0].uri
      const fileName = imageUri.split('/').pop() || 'avatar.jpg'
      const fileType = fileName.split('.').pop() || 'jpeg'

      const file = {
        uri: imageUri,
        name: fileName,
        type: `image/${fileType}`,
      } as unknown as File // Cast to File type

      setPreviewImage(imageUri)
      setValue('avatar', file) // Update the form value
      clearErrors('avatar') // Clear the validation error for avatar
    }
  }

  if (isLoadingAuth || isLoadingPackageData || isLoadingPaymentMethods) {
    return <Loading />
  }

  if (!user || !packageData || !paymentMethods) {
    return <NoData />
  }

  const formatDate = (dateString: string): string => {
    return format(new Date(dateString), 'MMM dd, yyyy')
  }

  const onSubmit = async (values: TLibraryCardRegisterSchema) => {
    if (!values.avatar) return
    uploadImage(
      {
        file: values.avatar,
        resourceType: ResourceType.PROFILE,
      },
      {
        onSuccess: (res) => {
          console.log('🚀 ~uploadImage onSubmit ~ res:', res)
          if (res.isSuccess) {
            registerLibraryCard(
              {
                avatar: res.data.secureUrl,
                fullName: values.fullName,
              },
              {
                onSuccess: () => {
                  console.log('🚀 Start create transaction: ')
                  createLibraryCardTransaction(
                    {
                      libraryCardPackageId: values.libraryCardPackageId,
                      resourceId: null,
                      description: null,
                      paymentMethodId: values.paymentMethodId,
                      transactionType: values.transactionType,
                    },
                    {
                      onSuccess: (res) => {
                        console.log('🚀 ~ onSubmit ~ res:', res)
                        if (res.isSuccess) {
                          if (res.data.paymentData) {
                            setPaymentData(res.data.paymentData)
                            return
                          }
                        }

                        if (!res.isSuccess) {
                          handleActionError(res, control, setFocus)
                        }
                      },
                    },
                  )
                },
              },
            )
          }
          if (!res.isSuccess) {
            handleActionError(res, control, setFocus)
          }
        },
      },
    )
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Library Card Registration',
          headerLeft: () => (
            <Pressable onPress={() => router.push('/more')} style={{ padding: 10 }}>
              <ChevronLeft size={24} />
            </Pressable>
          ),
        }}
      />
      <SafeAreaView className="flex-1 bg-background p-4" edges={['left', 'right', 'bottom']}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {!paymentData && (
            <View className="flex-1">
              <PackageCard packageId={Array.isArray(packageId) ? packageId[0] : packageId} />

              {/* Preview library card */}
              <View className="mt-4">
                <Text className="font-semibold">Preview library card</Text>
                <View>
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
                              previewImage ||
                              user.libraryCard?.avatar ||
                              'https://example.com/default-avatar.png',
                          }}
                          className="h-24 w-20 rounded-lg border object-contain"
                        />
                        <View className="flex flex-1 flex-col justify-between gap-2 ">
                          <Text className="text-xl font-semibold">
                            {watchedFullName || 'Your Name'}
                          </Text>
                          <Text>{user.email || 'user@example.com'}</Text>
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
                          value={cardId}
                          format="CODE128"
                          width={20}
                          height={40}
                          lineColor="black"
                          maxWidth={300}
                        />
                      </View>

                      <View className="flex flex-row justify-between">
                        <Text>Issue Date</Text>
                        <Text>29/03/2025</Text>
                      </View>
                      <View className="flex flex-row justify-between">
                        <Text>Expiry Date</Text>
                        <Text>29/03/2025</Text>
                      </View>
                    </CardContent>

                    <CardFooter>
                      <Text className="text-xs">
                        This card remains the property of ELibrary. If found, please return to any
                        ELibrary branch.
                      </Text>
                    </CardFooter>
                  </Card>
                </View>
              </View>

              {/* Personal information */}
              <View className="mt-4 flex flex-col gap-4">
                <Text className="font-semibold">Personal Information</Text>
                <View className="w-full">
                  <Label className="mb-1 text-sm font-semibold">Fullname</Label>
                  <Controller
                    control={control}
                    name="fullName"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                    )}
                  />
                  {errors.fullName?.message && (
                    <Text className="text-sm text-destructive">
                      {tZod(errors.fullName.message)}
                    </Text>
                  )}
                </View>

                <View className="w-full">
                  <Label className="mb-1 text-sm font-semibold">Avatar</Label>
                  <Controller
                    control={control}
                    name="avatar"
                    render={({ field: { value } }) => (
                      <Pressable
                        onPress={pickImage}
                        className="flex flex-row items-center justify-between rounded-md border border-input bg-transparent px-3 py-2"
                      >
                        <View className="flex flex-row items-center gap-2">
                          <Upload size={20} color="gray" />
                          <Text className={value ? 'text-foreground' : 'text-muted-foreground'}>
                            {value ? 'Image selected' : 'Select an image'}
                          </Text>
                        </View>
                        {previewImage && (
                          <Image source={{ uri: previewImage }} className="h-8 w-8 rounded-full" />
                        )}
                      </Pressable>
                    )}
                  />
                  {errors.avatar?.message && (
                    <Text className="text-sm text-destructive">{tZod(errors.avatar.message)}</Text>
                  )}
                </View>

                <View className="w-full">
                  <Label className="mb-1 text-sm font-semibold">Payment</Label>
                  <Controller
                    control={control}
                    name="paymentMethodId"
                    render={({ field: { onChange, value } }) => {
                      // Get the method name corresponding to the current paymentMethodId
                      const selectedMethod = paymentMethods.find((p) => p.paymentMethodId === value)

                      return (
                        <Select
                          value={
                            value
                              ? {
                                  value: value.toString(),
                                  label: selectedMethod?.methodName || 'Choose a payment method',
                                }
                              : undefined
                          }
                          onValueChange={(val) => {
                            if (val) {
                              onChange(Number(val.value)) // Convert to valid number
                            }
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose a payment method" />
                          </SelectTrigger>
                          <SelectContent className="w-full">
                            {paymentMethods.map((paymentMethod) => (
                              <SelectItem
                                key={paymentMethod.paymentMethodId}
                                label={paymentMethod.methodName}
                                value={paymentMethod.paymentMethodId.toString()}
                                className="w-full text-sm"
                              >
                                {paymentMethod.methodName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )
                    }}
                  />
                  {errors.paymentMethodId?.message && (
                    <Text className="text-sm text-destructive">
                      {tZod(errors.paymentMethodId.message)}
                    </Text>
                  )}
                </View>

                <Button
                  disabled={
                    isPendingUpload ||
                    isPendingCreateLibraryCardTransaction ||
                    isPendingRegisterLibraryCard
                  }
                  onPress={handleSubmit(onSubmit)}
                  className="mt-4 w-full"
                >
                  <Text>Register</Text>
                </Button>
              </View>
            </View>
          )}

          {paymentData && (
            <PaymentCard
              paymentStates={paymentStates}
              paymentData={paymentData}
              cancelPaymentUrl={'/me/more'}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  )
}
