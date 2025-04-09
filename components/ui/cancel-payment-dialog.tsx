'use client'

import { useState } from 'react'
import { ActivityIndicator, Text } from 'react-native'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { ETransactionStatus } from '~/types/enum'
import { useTranslation } from 'react-i18next'

type Props = {
  currentStatus: ETransactionStatus
  orderCode: string
  paymentLinkId: string
  callbackUrl: string
}

const CancelPaymentDialog = ({ currentStatus, orderCode, paymentLinkId, callbackUrl }: Props) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  console.log({ orderCode, paymentLinkId, callbackUrl })

  const handleCancel = async () => {
    try {
      setIsLoading(true)
      // Implement your cancel payment logic here
      // Example:
      // await cancelPayment(orderCode, paymentLinkId)
      setIsOpen(false)
    } catch (error) {
      console.error('Error cancelling payment:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Only show cancel button if payment is pending
  if (currentStatus !== ETransactionStatus.PENDING) {
    return null
  }

  return (
    <>
      <Button variant="outline" className="mt-4" onPress={() => setIsOpen(true)}>
        <Text>{t('Cancel payment')}</Text>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('Cancel payment')}</DialogTitle>
            <DialogDescription>
              {t('Are you sure you want to cancel this payment?')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row justify-end gap-2 sm:justify-start">
            <Button variant="secondary" onPress={() => setIsOpen(false)} disabled={isLoading}>
              <Text>{t('No, continue payment')}</Text>
            </Button>
            <Button variant="destructive" onPress={handleCancel} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text>{t('Yes, cancel payment')}</Text>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CancelPaymentDialog
