import React, { useState } from 'react'
import { Text, View } from 'react-native'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { formUrlQuery } from '~/lib/utils'
import { ESearchType } from '~/types/enum'
import { Href, useLocalSearchParams, useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

const valueToLabel = {
  '0': 'Title',
  '1': 'Author',
  '2': 'ISBN',
  '3': 'Classification number',
  '4': 'Genres',
  '5': 'Publisher',
  '6': 'Keyword',
  quick: 'All',
} as const

type TKeyWordValue = '0' | '1' | '2' | '3' | '4' | '5' | '6' | 'quick'

const QuickSearchTab = () => {
  const { t } = useTranslation('SearchScreen')
  const router = useRouter()
  const searchParams = useLocalSearchParams()

  const [keywordValue, setKeywordValue] = useState<TKeyWordValue>(() =>
    z
      .enum(['0', '1', '2', '3', '4', '5', '6', 'quick'])
      .catch('quick')
      .parse(searchParams.searchWithKeyword),
  )

  const [searchWithSpecial, setSearchWithSpecial] = useState(
    () => z.enum(['true', 'false']).catch('true').parse(searchParams.searchWithSpecial) === 'true',
  )
  const [isMatchExact, setIsMatchExact] = useState(
    () => z.enum(['true', 'false']).catch('false').parse(searchParams.isMatchExact) === 'true',
  )
  const [searchValue, setSearchValue] = useState(searchParams.search || '')

  const handleApply = () => {
    if (!searchValue) return

    const newUrl = formUrlQuery({
      url: '/search/result',
      params: searchParams.toString(),
      updates: {
        pageIndex: '1',
        searchType: ESearchType.QUICK_SEARCH.toString(),
        isMatchExact: isMatchExact ? 'true' : 'false',
        searchWithSpecial: searchWithSpecial ? 'true' : 'false',
        searchWithKeyword: keywordValue === 'quick' ? null : keywordValue,
        search: searchValue,
      },
    })

    router.push(newUrl as Href)
  }

  return (
    <View className="space-y-4">
      <View className="flex flex-row items-center gap-2">
        <Select
          value={{ label: valueToLabel[keywordValue], value: keywordValue }}
          onValueChange={(option) => setKeywordValue((option?.value || 'quick') as TKeyWordValue)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Keywords" />
          </SelectTrigger>
          <SelectContent className="min-w-[180px]">
            {Object.keys(valueToLabel).map((value) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              const label = valueToLabel[value]

              return (
                <SelectItem key={value} label={t(label)} value={value}>
                  {t(label)}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>

        <Input
          value={searchValue as string}
          onChangeText={setSearchValue}
          className="flex-1"
          placeholder={t('Search')}
        />
      </View>
      <View className="mt-4 flex flex-col justify-between gap-4">
        <View className="flex flex-1 flex-row justify-start gap-8">
          <View className="flex flex-row items-center gap-2">
            <Checkbox
              checked={searchWithSpecial}
              onCheckedChange={(val) => setSearchWithSpecial(Boolean(val))}
              id="search-no-mark"
            />
            <Label className="cursor-pointer font-normal" htmlFor="search-no-mark">
              {t('Special character')}
            </Label>
          </View>
          <View className="flex flex-row items-center gap-2">
            <Checkbox
              checked={isMatchExact}
              onCheckedChange={(val) => setIsMatchExact(Boolean(val))}
              id="search-exact"
            />
            <Label className="cursor-pointer font-normal" htmlFor="search-exact">
              {t('Match exact')}
            </Label>
          </View>
        </View>
        <Button
          size="default"
          onPress={handleApply}
          className="flex flex-row flex-nowrap items-center gap-2"
        >
          <Text className="text-primary-foreground">{t('Search')}</Text>
        </Button>
      </View>
    </View>
  )
}

export default QuickSearchTab
