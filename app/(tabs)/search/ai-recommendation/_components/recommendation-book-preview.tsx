import React from 'react'
import { Image, ScrollView, Text, useWindowDimensions, View } from 'react-native'
import { Table, TableCell, TableRow } from '~/components/ui/table'
import useGetLibraryItem from '~/hooks/library-items/use-get-libraryItem'
import { LibraryItem, LibraryItemsRecommendation } from '~/types/models'
import { useRouter } from 'expo-router'
import { CheckCircle2, CircleX, Loader2 } from 'lucide-react-native'

const MIN_COLUMN_WIDTHS = [240, 180, 180, 120]

type Props = {
  result: LibraryItemsRecommendation
  detectedLibraryItem: LibraryItem
  comparedLibraryItemId: string
}

const RecommendationBookPreview = ({
  result,
  detectedLibraryItem,
  comparedLibraryItemId,
}: Props) => {
  const { width } = useWindowDimensions()
  const router = useRouter()
  const { data: comparedLibraryItem, isLoading: isLoadingComparedLibraryItem } = useGetLibraryItem(
    comparedLibraryItemId?.toString() || '',
  )

  const columnWidths = React.useMemo(() => {
    return MIN_COLUMN_WIDTHS.map((minWidth) => {
      const evenWidth = width / MIN_COLUMN_WIDTHS.length
      return evenWidth > minWidth ? evenWidth : minWidth
    })
  }, [width])

  if (isLoadingComparedLibraryItem) {
    return (
      <View className="flex w-full items-center justify-center">
        <Loader2 className="size-8 animate-spin" />
      </View>
    )
  }

  if (!comparedLibraryItem || !detectedLibraryItem) {
    router.push('/(tabs)/search/ai-recommendation')
    return null
  }

  const renderTableRow = (
    label: string,
    detectedValue: string | undefined,
    comparedValue: string | undefined,
    isMatched: boolean,
  ) => (
    <TableRow>
      <TableCell
        style={{ width: columnWidths[0] }}
        className="border font-semibold text-primary-foreground"
      >
        <Text>{label.replace(/([A-Z])/g, ' $1').trim()}</Text>
      </TableCell>
      <TableCell style={{ width: columnWidths[1] }} className="border">
        <Text>{detectedValue}</Text>
      </TableCell>
      <TableCell style={{ width: columnWidths[2] }} className="border">
        <Text>{comparedValue}</Text>
      </TableCell>
      <TableCell style={{ width: columnWidths[3] }} className="flex-row justify-center border">
        {isMatched ? (
          <CheckCircle2 size={24} color={'green'} />
        ) : (
          <CircleX size={24} color={'red'} />
        )}
      </TableCell>
    </TableRow>
  )

  return (
    <ScrollView horizontal bounces={false} showsHorizontalScrollIndicator={false}>
      <Table aria-labelledby="invoice-table">
        <TableRow>
          <TableCell
            style={{ width: columnWidths[0] }}
            className="font-semibold text-primary-foreground"
          ></TableCell>
          <TableCell
            style={{ width: columnWidths[1] }}
            className="flex flex-row justify-start border"
          >
            <Image
              source={{ uri: detectedLibraryItem.coverImage || '' }}
              className="h-20 w-14 rounded-lg shadow-lg"
            />
          </TableCell>
          <TableCell
            style={{ width: columnWidths[2] }}
            className="flex flex-row justify-start border"
          >
            <Image
              source={{ uri: comparedLibraryItem.coverImage || '' }}
              className="h-20 w-14 rounded-lg shadow-lg"
            />
          </TableCell>
          <TableCell style={{ width: columnWidths[3] }} className="text-center"></TableCell>
        </TableRow>

        {renderTableRow(
          'Title',
          detectedLibraryItem.title,
          comparedLibraryItem.title,
          result.matchedProperties.find((item) => item.name === 'Title')?.isMatched ?? false,
        )}
        {renderTableRow(
          'Subtitle',
          detectedLibraryItem.subTitle?.toString(),
          comparedLibraryItem.subTitle?.toString(),
          result.matchedProperties.find((item) => item.name === 'SubTitle')?.isMatched ?? false,
        )}
        {renderTableRow(
          'Language',
          detectedLibraryItem.language,
          comparedLibraryItem.language,
          result.matchedProperties.find((item) => item.name === 'Language')?.isMatched ?? false,
        )}
        {renderTableRow(
          'OriginLanguage',
          detectedLibraryItem.originLanguage?.toString(),
          comparedLibraryItem.originLanguage?.toString(),
          result.matchedProperties.find((item) => item.name === 'OriginLanguage')?.isMatched ??
            false,
        )}
        {renderTableRow(
          'PublicationYear',
          detectedLibraryItem.publicationYear?.toString(),
          comparedLibraryItem.publicationYear?.toString(),
          result.matchedProperties.find((item) => item.name === 'PublicationYear')?.isMatched ??
            false,
        )}
        {renderTableRow(
          'Publisher',
          detectedLibraryItem.publisher?.toString(),
          comparedLibraryItem.publisher?.toString(),
          result.matchedProperties.find((item) => item.name === 'Publisher')?.isMatched ?? false,
        )}
        {renderTableRow(
          'ClassificationNumber',
          detectedLibraryItem.classificationNumber?.toString(),
          comparedLibraryItem.classificationNumber?.toString(),
          result.matchedProperties.find((item) => item.name === 'ClassificationNumber')
            ?.isMatched ?? false,
        )}
        {renderTableRow(
          'CutterNumber',
          detectedLibraryItem.cutterNumber?.toString(),
          comparedLibraryItem.cutterNumber?.toString(),
          result.matchedProperties.find((item) => item.name === 'CutterNumber')?.isMatched ?? false,
        )}
      </Table>
    </ScrollView>
  )
}

export default RecommendationBookPreview
