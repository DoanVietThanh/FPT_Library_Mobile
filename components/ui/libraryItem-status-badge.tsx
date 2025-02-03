'use client'

import { Text } from 'react-native'
import { ELibraryItemStatus } from '~/types/enum'

import { Badge } from './badge'

type Props = {
  status: number | ELibraryItemStatus
}

const badgeConfig = (
  type: number | ELibraryItemStatus,
): { badgeVariant: 'draft' | 'success' | 'default'; label: string } => {
  switch (type) {
    case 0 || ELibraryItemStatus.Draft:
      return {
        badgeVariant: 'draft',
        label: 'Draft',
      }
    case 1 || ELibraryItemStatus.Published:
      return {
        badgeVariant: 'success',
        label: 'Published',
      }
    default:
      return {
        badgeVariant: 'default',
        label: 'Published',
      }
  }
}

function LibraryItemStatusBadge({ status }: Props) {
  return (
    <Badge variant={badgeConfig(status).badgeVariant} className="flex w-fit justify-center">
      <Text>{badgeConfig(status).label}</Text>
    </Badge>
  )
}

export default LibraryItemStatusBadge
