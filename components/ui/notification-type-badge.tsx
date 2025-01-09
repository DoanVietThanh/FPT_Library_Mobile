'use client'

import React from 'react'
import { ENotificationType } from '~/types/enum'
import { useTranslation } from 'react-i18next'

import { Badge } from './badge'
import { Text } from './text'

type Props = {
  type: ENotificationType
}

export const getTypeColor = (type: ENotificationType) => {
  switch (type) {
    case ENotificationType.EVENT:
      return 'success'
    case ENotificationType.NOTICE:
      return 'info'
    case ENotificationType.REMINDER:
      return 'danger'
    default:
      return 'default'
  }
}

function NotificationTypeBadge({ type }: Props) {
  const { t } = useTranslation('Badges.NotificationType')
  return (
    <Badge variant={getTypeColor(type)} className="flex w-24 justify-center">
      <Text>{t(type)}</Text>
    </Badge>
  )
}

export default NotificationTypeBadge
