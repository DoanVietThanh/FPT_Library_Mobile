'use client'

import React from 'react'
import { EBookCopyStatus } from '~/types/enum'
import { useTranslation } from 'react-i18next'

import { Badge } from '../ui/badge'
import { Text } from '../ui/text'

type Props = {
  status: EBookCopyStatus
}

const getTypeColor = (type: EBookCopyStatus) => {
  switch (type) {
    case EBookCopyStatus.IN_SHELF:
      return 'success'
    case EBookCopyStatus.OUT_OF_SHELF:
      return 'warning'
    case EBookCopyStatus.BORROWED:
      return 'info'
    case EBookCopyStatus.RESERVED:
      return 'progress'
    case EBookCopyStatus.DELETED:
      return 'danger'
    default:
      return 'default'
  }
}

function BookCopyStatusBadge({ status }: Props) {
  const { t } = useTranslation('Badges')
  return (
    <Badge variant={getTypeColor(status)} className="flex w-28 justify-center rounded-md">
      <Text>{t('BookCopyStatus.' + status)}</Text>
    </Badge>
  )
}

export default BookCopyStatusBadge
