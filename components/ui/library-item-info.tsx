import React, { ForwardRefExoticComponent, RefAttributes } from 'react'
import { Text, View } from 'react-native'
import BookBorrowDialog from '~/app/(tabs)/home/books/_components/book-borrow-dialog'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { cn } from '~/lib/utils'
import { LibraryItem } from '~/types/models'
import { useRouter } from 'expo-router'
import {
  BookMarked,
  BookOpen,
  BookX,
  Box,
  Calendar,
  Clock,
  Coins,
  Globe,
  Headphones,
  Heart,
  Languages,
  LucideProps,
  MapPin,
  Printer,
  ScrollText,
  Star,
  Users,
} from 'lucide-react-native'
import { useTranslation } from 'react-i18next'

type Props = {
  libraryItem: LibraryItem
}

const LibraryItemInfo = ({ libraryItem }: Props) => {
  console.log('🚀 ~ BookInfoCard ~ libraryItem:', libraryItem.libraryItemId)
  const router = useRouter()
  const {
    t,
    i18n: { language },
  } = useTranslation('BookPage')

  return (
    <View className="flex w-full flex-col gap-4 rounded-lg bg-primary-foreground p-4">
      <Text className="text-sm font-semibold italic">
        An edition of {libraryItem?.title as string} ({libraryItem?.publicationYear})
      </Text>
      <Text className="text-xl font-semibold text-primary">{libraryItem?.title as string}</Text>

      {libraryItem.summary && <Text className="text-sm">{libraryItem.summary}</Text>}

      {libraryItem?.authors.length > 0 && libraryItem?.authors[0].fullName && (
        <Text className="text-md font-medium">by {libraryItem?.authors[0].fullName as string}</Text>
      )}
      <View className="flex flex-row items-center justify-between gap-2">
        <Badge variant={'draft'} className="w-fit">
          <Text className="text-sm text-primary-foreground">
            No.{libraryItem.editionNumber} Edition
          </Text>
        </Badge>
        <Badge variant={'draft'} className="w-fit">
          <Text className="text-sm text-primary-foreground">
            {language === 'vi'
              ? libraryItem.category.vietnameseName
              : libraryItem.category.englishName}
          </Text>
        </Badge>
        <View className="flex flex-row items-center gap-2">
          <Star size={16} color="orange" fill={'orange'} />
          <Text className="font-semibold">{libraryItem?.avgReviewedRate} / 5</Text>
        </View>
      </View>
      <Separator />
      {/* Detail list */}
      <InfoItem
        className="text-sm"
        icon={Users}
        label={t('fields.responsibility')}
        value={libraryItem.responsibility}
      />
      <InfoItem icon={Globe} label={t('fields.language')} value={libraryItem.language} />
      <InfoItem
        icon={Languages}
        label={t('fields.originLanguage')}
        value={libraryItem.originLanguage}
      />
      <InfoItem
        icon={Calendar}
        label={t('fields.publicationYear')}
        value={libraryItem.publicationYear?.toString()}
      />
      <InfoItem icon={Printer} label={t('fields.publisher')} value={libraryItem.publisher} />
      <InfoItem
        icon={MapPin}
        label={t('fields.publicationPlace')}
        value={libraryItem.publicationPlace}
      />
      {libraryItem.estimatedPrice && (
        <InfoItem
          icon={Coins}
          label={t('fields.estimatedPrice')}
          value={`${libraryItem.estimatedPrice.toLocaleString()} VND`}
        />
      )}
      <InfoItem
        icon={ScrollText}
        label={t('fields.pageCount')}
        value={libraryItem.pageCount?.toString()}
      />
      <InfoItem icon={BookOpen} label={t('fields.genres')} value={libraryItem.genres} />
      <InfoItem icon={MapPin} label={t('fields.shelf')} value={libraryItem.shelf?.shelfNumber} />
      {/* Inventory */}
      <View>
        <Text className="text-lg font-semibold text-primary">
          Inventory ({libraryItem.libraryItemInventory.availableUnits}/
          {libraryItem.libraryItemInventory.totalUnits})
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <View style={{ width: '30%' }}>
            <InventoryItem
              icon={Box}
              label={t('fields.totalUnits')}
              value={libraryItem.libraryItemInventory.totalUnits}
              color="blue"
            />
          </View>
          <View style={{ width: '30%' }}>
            <InventoryItem
              icon={BookMarked}
              label={t('fields.availableUnits')}
              value={libraryItem.libraryItemInventory.availableUnits}
              color="green"
            />
          </View>
          <View style={{ width: '30%' }}>
            <InventoryItem
              icon={Clock}
              label={t('fields.requestUnits')}
              value={libraryItem.libraryItemInventory.requestUnits}
              color="orange"
            />
          </View>
          <View style={{ width: '30%' }}>
            <InventoryItem
              icon={BookX}
              label={t('fields.borrowedUnits')}
              value={libraryItem.libraryItemInventory.borrowedUnits}
              color="red"
            />
          </View>
          <View style={{ width: '30%' }}>
            <InventoryItem
              icon={Clock}
              label={t('fields.reservedUnits')}
              value={libraryItem.libraryItemInventory.reservedUnits}
              color="purple"
            />
          </View>
        </View>
      </View>

      <Separator />
      <View className="flex flex-row items-center justify-between gap-4">
        <Button variant={'outline'} className="flex flex-row items-center gap-2 ">
          <Heart size={24} color={'red'} className="text-primary-foreground" />
        </Button>
        <BookBorrowDialog />
        <Button
          onPress={() => router.push(`/home/books/${libraryItem.libraryItemId}/ebook?audio=true`)}
          variant={'outline'}
          className="flex flex-row items-center gap-2 "
        >
          <Headphones size={24} color={'black'} />
        </Button>
        <Button
          onPress={() => router.push(`/home/books/${libraryItem.libraryItemId}/ebook?audio=false`)}
          variant={'outline'}
          className="flex flex-row items-center gap-2 "
        >
          <BookOpen size={24} color={'black'} />
        </Button>
      </View>
    </View>
  )
}

export default LibraryItemInfo

const InfoItem = ({
  icon: Icon,
  label,
  value,
  className,
  color,
}: {
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
  label: string
  value: string | null | undefined
  className?: string
  color?: string
}) => (
  <View className={cn('flex flex-row items-center gap-2', className)}>
    <Icon size={16} color={color || 'green'} />
    <Text className="font-medium">{label}:</Text>
    <Text numberOfLines={2} ellipsizeMode="tail">
      {value || 'N/A'}
    </Text>
  </View>
)

const InventoryItem = ({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
  label: string
  value: number
  color: string
}) => (
  <View className="flex items-center gap-2 rounded-md border p-2 shadow-sm">
    <Icon className="size-4" color={color} />
    <Text className="text-xs font-medium">
      {label} {value}
    </Text>
  </View>
)
