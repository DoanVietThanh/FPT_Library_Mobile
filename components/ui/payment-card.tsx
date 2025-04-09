import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native'
import { Badge } from '~/components/ui/badge'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { cn, formatLeftTime } from '~/lib/utils'
import { ETransactionStatus } from '~/types/enum'
import { PaymentData } from '~/types/models'
import { useTranslation } from 'react-i18next'
import QRCode from 'react-native-qrcode-svg'

import CancelPaymentDialog from './cancel-payment-dialog'
import Copitor from './copitor'

type Props = {
  paymentStates: {
    leftTime: number
    canNavigate: boolean
    navigateTime: number
    status: ETransactionStatus
  }
  paymentData: PaymentData
  cancelPaymentUrl: string
}

const PaymentCard = ({ paymentStates, paymentData, cancelPaymentUrl }: Props) => {
  const { t } = useTranslation('GeneralManagement')

  return (
    <ScrollView className="flex-1 bg-background p-4">
      <Card className="w-full overflow-hidden">
        <CardHeader className="rounded-t-lg bg-primary">
          <Text className="text-center text-xl font-bold text-primary-foreground">
            {t('QR payment')}
          </Text>
          <Text className="text-center text-primary-foreground opacity-80">
            {t('Please scan the QR code below to make payment')}
          </Text>
        </CardHeader>
        <CardContent className="p-0">
          <View className="flex flex-col">
            {/* QR Code Section */}
            <View className="flex flex-col items-center justify-center border-b p-6">
              <View className="mb-4 flex flex-row items-center rounded-full bg-primary px-4 py-1">
                {paymentStates.status === ETransactionStatus.PENDING ? (
                  <View className="flex flex-row items-center">
                    <Text className="text-sm font-medium text-primary-foreground">
                      {t('Pending payment')}
                    </Text>
                    <ActivityIndicator size="small" color="#fff" className="ml-2" />
                  </View>
                ) : (
                  <Text className="text-sm font-medium text-primary-foreground">
                    {t('Auto redirect after n seconds', {
                      seconds: paymentStates.navigateTime,
                    })}
                  </Text>
                )}
              </View>
              <View className="relative">
                <View
                  className={cn(
                    'flex w-full justify-center rounded-lg border-2 bg-background p-4',
                    paymentStates.status !== ETransactionStatus.PENDING && 'opacity-30',
                  )}
                >
                  <QRCode
                    value={paymentData.qrCode}
                    size={200}
                    backgroundColor="white"
                    color="black"
                  />
                </View>

                {paymentStates.status !== ETransactionStatus.PENDING && (
                  <Image
                    source={{
                      uri:
                        paymentStates.status === ETransactionStatus.PAID
                          ? '/assets/images/payment-success.png'
                          : '/assets/images/payment-fail.png',
                    }}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      width: 80,
                      height: 80,
                      transform: [{ translateX: -40 }, { translateY: -40 }],
                    }}
                  />
                )}
              </View>
              <Badge variant="default" className="mt-4">
                <Text className="text-sm font-medium text-primary-foreground">
                  {paymentStates.status === ETransactionStatus.PENDING &&
                    `${t('Time remaining')}: ${formatLeftTime(paymentStates.leftTime / 1000)}`}
                  {paymentStates.status === ETransactionStatus.PAID && t('Payment successful')}
                  {paymentStates.status === ETransactionStatus.CANCELLED && t('Payment cancelled')}
                  {paymentStates.status === ETransactionStatus.EXPIRED && t('Payment expired')}
                </Text>
              </Badge>

              <CancelPaymentDialog
                currentStatus={paymentStates.status}
                orderCode={paymentData.orderCode}
                paymentLinkId={paymentData.paymentLinkId}
                callbackUrl={cancelPaymentUrl}
              />
            </View>

            {/* Payment Details Section */}
            <View className="p-6">
              <View className="w-full space-y-4">
                <View>
                  <Text className="mb-2 text-sm font-medium">{t('Payment description')}</Text>
                  <View className="flex flex-row items-center gap-2 rounded-md bg-muted p-3">
                    <Text className="flex-1 text-sm">{paymentData.description}</Text>
                    <Copitor content={paymentData.description} />
                  </View>
                </View>

                <View className="text-sm text-muted-foreground">
                  <Text className="mb-2 font-medium">{t('How to make payment')}</Text>
                  <View className="pl-5">
                    <View className="mb-2 flex flex-row">
                      <Text className="mr-2">1.</Text>
                      <Text>{t('qr payment guide 1')}</Text>
                    </View>
                    <View className="mb-2 flex flex-row">
                      <Text className="mr-2">2.</Text>
                      <Text>{t('qr payment guide 2')}</Text>
                    </View>
                    <View className="flex flex-row">
                      <Text className="mr-2">3.</Text>
                      <Text>{t('qr payment guide 3')}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </CardContent>
      </Card>
    </ScrollView>
  )
}

export default PaymentCard
