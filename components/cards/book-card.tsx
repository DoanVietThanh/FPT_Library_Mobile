'use client'

import { Image, View } from 'react-native'
import { cn } from '~/lib/utils'
import { Author, BookEdition, Category, LibraryItemAuthor } from '~/types/models'
import { convert } from 'html-to-text'
import { useTranslation } from 'react-i18next'

import { Badge } from '../ui/badge'
import { Text } from '../ui/text'

interface LibraryItemProps {
  libraryItem: BookEdition & {
    category?: Category
    libraryItemAuthors?: (LibraryItemAuthor & { author: Author })[]
  }
  modal?: boolean
}

export default function LibraryItemCard({ libraryItem, modal }: LibraryItemProps) {
  const {
    accompanyingMaterial,
    additionalAuthors,

    bibliographicalNote,

    category,

    classificationNumber,
    coverImage,

    cutterNumber,
    dimensions,
    ean,
    edition,

    estimatedPrice,
    generalNote,
    genres,

    isbn,
    language,
    libraryItemAuthors,

    pageCount,
    physicalDetails,

    publicationYear,
    publisher,

    subTitle,
    summary,
    title,
    topicalTerms,
  } = libraryItem

  const {
    t,
    i18n: { language: locale },
  } = useTranslation('BooksManagementPage')

  // Format price with VND currency
  const formattedPrice = estimatedPrice
    ? new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(estimatedPrice)
    : null

  return (
    <View className={cn('flex w-full flex-col', modal && 'max-w-[95vw]')}>
      <View className="flex flex-row gap-2">
        <View className="shrink-0">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={title}
              className="aspect-[2/3] h-[135px] w-[90px] rounded-md border object-cover"
            />
          ) : (
            <View className="h-[135px] w-[90px]">
              <Text className="text-sm">No image</Text>
            </View>
          )}
        </View>
        <View className="flex-1">
          <View>
            <View className="mt-2 flex flex-col ">
              <View className="flex flex-row items-start justify-between">
                <Text className="line-clamp-1 flex-1 text-sm font-bold">{title}</Text>
              </View>
              {category && (
                <Badge className="absolute right-2 top-2">
                  <Text className="text-sm">
                    {locale === 'vi' ? category.vietnameseName : category.englishName}
                  </Text>
                </Badge>
              )}
            </View>
            {subTitle && (
              <Text className="line-clamp-1 text-xs text-muted-foreground">{subTitle}</Text>
            )}
          </View>

          <View className="flex flex-row flex-wrap gap-x-6 ">
            {libraryItemAuthors && libraryItemAuthors.length > 0 && (
              <View>
                <Text className="text-sm font-medium">{t('Authors')}:</Text>{' '}
                <Text className="text-sm">
                  {libraryItemAuthors.map((a) => a.author.fullName).join(', ')}
                </Text>
              </View>
            )}

            {publisher && (
              <Text className="text-sm">
                {t('Publisher')}: {publisher}
              </Text>
            )}

            {publicationYear && (
              <Text className="text-sm">
                {t('Year')}: {publicationYear}
              </Text>
            )}

            {pageCount && (
              <Text className="text-sm">
                {t('Page count')}: {pageCount}
              </Text>
            )}
          </View>
        </View>
      </View>

      {summary && (
        <View className="py-2">
          <Text className="line-clamp-3 text-xs">{convert(summary)}</Text>
        </View>
      )}

      <View className="">
        <View className="flex flex-row flex-wrap justify-between gap-x-3 gap-y-1">
          {additionalAuthors && (
            <Text className="text-sm">
              {t('Additional authors')}: {additionalAuthors}
            </Text>
          )}

          {language && (
            <Text className="text-sm">
              {t('Language')}: {language}
            </Text>
          )}

          {edition && (
            <Text className="text-sm">
              {t('Edition')}: {edition}
            </Text>
          )}

          {isbn && <Text className="text-sm">ISBN: {isbn}</Text>}

          {ean && <Text className="text-sm">EAN: {ean}</Text>}

          {classificationNumber && <Text className="text-sm">DDC: {classificationNumber}</Text>}

          {cutterNumber && (
            <Text className="text-sm">
              {t('Cutter number')}: {cutterNumber}
            </Text>
          )}

          {estimatedPrice && (
            <Text className="text-sm">
              {t('Estimated price')}: {formattedPrice}
            </Text>
          )}

          {dimensions && (
            <Text className="text-sm">
              {t('Dimensions')}: {dimensions}
            </Text>
          )}

          {physicalDetails && (
            <Text className="text-sm">
              {t('Physical details')}: {physicalDetails}
            </Text>
          )}

          {accompanyingMaterial && (
            <Text className="text-sm">
              {t('Accompanying material')}: {accompanyingMaterial}
            </Text>
          )}
        </View>

        {genres && (
          <Text className="text-sm">
            {t('Genres')}: {genres}
          </Text>
        )}

        {topicalTerms && (
          <Text className="text-sm">
            {t('Topical terms')}: {topicalTerms}
          </Text>
        )}

        {generalNote && (
          <Text className="text-sm">
            {t('General note')}: {generalNote}
          </Text>
        )}

        {bibliographicalNote && (
          <Text className="text-sm">
            {t('Bibliographical note')}: {bibliographicalNote}
          </Text>
        )}
      </View>
    </View>
  )
}
