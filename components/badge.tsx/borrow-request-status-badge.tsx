import React from 'react'
import { Text } from 'react-native'
import { EBorrowRequestStatus } from '~/types/enum'
import { useTranslation } from 'react-i18next'

import { Badge } from '../ui/badge'

type Props = {
  status: EBorrowRequestStatus
}

const getTypeColor = (type: EBorrowRequestStatus) => {
  switch (type) {
    case EBorrowRequestStatus.BORROWED:
      return 'info'
    case EBorrowRequestStatus.CANCELLED:
      return 'warning'
    case EBorrowRequestStatus.CREATED:
      return 'progress'
    case EBorrowRequestStatus.EXPIRED:
      return 'danger'
    default:
      return 'default'
  }
}

function BorrowRequestStatusBadge({ status }: Props) {
  const { t } = useTranslation('Badges')
  return (
    <Badge variant={getTypeColor(status)} className="flex w-[84px] justify-center">
      <Text className="text-primary-foreground">
        {t(`BorrowRequestStatus.${status.toString()}`)}
      </Text>
    </Badge>
  )
}

export default BorrowRequestStatusBadge
