import React from 'react'
import { ScrollView, useWindowDimensions, View } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import LibraryItemStatusBadge from '~/components/ui/libraryItem-status-badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'
import { ELibraryItemStatus } from '~/types/enum'
import { LibraryItem } from '~/types/models'
import { EllipsisVertical } from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {
  libraryItemId: string
  libraryItem: LibraryItem
}

const MIN_COLUMN_WIDTHS = [40, 60, 120, 120, 120]

const BookInstancesTab = ({ libraryItemId, libraryItem }: Props) => {
  const { width } = useWindowDimensions()
  const insets = useSafeAreaInsets()

  const columnWidths = React.useMemo(() => {
    return MIN_COLUMN_WIDTHS.map((minWidth) => {
      const evenWidth = width / MIN_COLUMN_WIDTHS.length
      return evenWidth > minWidth ? evenWidth : minWidth
    })
  }, [width])

  return (
    <View>
      <ScrollView horizontal bounces={false} showsHorizontalScrollIndicator={false}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead style={{ width: columnWidths[0] }}>
                <Text>STT</Text>
              </TableHead>
              <TableHead style={{ width: columnWidths[1] }}>
                <Text>Code</Text>
              </TableHead>
              <TableHead style={{ width: columnWidths[2] }}>
                <Text>Barcode</Text>
              </TableHead>
              <TableHead style={{ width: columnWidths[3] }}>
                <Text>Status</Text>
              </TableHead>
              <TableHead style={{ width: columnWidths[4] }}>
                <Text>Action</Text>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <FlashList
              data={libraryItem.libraryItemInstances}
              estimatedItemSize={45}
              contentContainerStyle={{ paddingBottom: insets.bottom }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <TableRow
                    key={item.libraryItemId}
                    className={cn('active:bg-secondary', index % 2 && 'bg-muted/40')}
                  >
                    <TableCell style={{ width: columnWidths[0] }}>
                      <Text>{index + 1}</Text>
                    </TableCell>
                    <TableCell style={{ width: columnWidths[1] }}>
                      <Text>{item.barcode}</Text>
                    </TableCell>
                    <TableCell style={{ width: columnWidths[2] }}>
                      {/* <Barcode value={item.barcode || ''} format="CODE128" /> */}
                      <Text>__</Text>
                    </TableCell>
                    <TableCell style={{ width: columnWidths[3] }}>
                      <LibraryItemStatusBadge
                        status={item.status as unknown as ELibraryItemStatus}
                      />
                    </TableCell>
                    <TableCell style={{ width: columnWidths[4] }}>
                      <EllipsisVertical />
                    </TableCell>
                  </TableRow>
                )
              }}
            />
          </TableBody>
        </Table>
      </ScrollView>
    </View>
  )
}

export default BookInstancesTab
