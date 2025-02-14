import { useState } from 'react'
import { View } from 'react-native'
import { formUrlQuery } from '~/lib/utils'
import { ESearchType } from '~/types/enum'
import { Href, useLocalSearchParams, useRouter } from 'expo-router'
import cloneDeep from 'lodash.clonedeep'
import { useTranslation } from 'react-i18next'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Text } from '../ui/text'

const BasicSearchTab = () => {
  const searchParams = useLocalSearchParams()
  const router = useRouter()
  const { t } = useTranslation('SearchScreen')
  const [values, setValues] = useState({
    title: searchParams.title || '',
    author: searchParams.author || '',
    isbn: searchParams.isbn || '',
    classificationNumber: searchParams.classificationNumber || '',
    genres: searchParams.genres || '',
    publisher: searchParams.publisher || '',
    topicalTerms: searchParams.topicalTerms || '',
  })

  const handleInputChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const resetFields = () => {
    setValues({
      title: '',
      author: '',
      isbn: '',
      classificationNumber: '',
      genres: '',
      publisher: '',
      topicalTerms: '',
    })
  }

  const handleApply = () => {
    if (Object.values(values).every((a) => a === '')) return

    const searchValues = cloneDeep(values)
    Object.keys(searchValues).forEach((k) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      searchValues[k] = searchValues[k] === '' ? undefined : searchValues[k]
    })
    const newUrl = formUrlQuery({
      url: '/search/result',
      params: searchParams.toString(),
      updates: {
        ...searchValues,
        pageIndex: '1',
        searchType: ESearchType.BASIC_SEARCH.toString(),
        search: null,
      },
    })

    router.push(newUrl as Href)
  }

  return (
    <View className="flex flex-col gap-4">
      <View className="flex gap-4">
        {Object.keys(values).map((key, index) => (
          <View key={index} className="flex">
            <Label>{t(getPlaceholder(key))}</Label>
            <Input
              placeholder={t(getPlaceholder(key))}
              value={values[key as keyof typeof values] as string}
              onChangeText={(val) => handleInputChange(key, val)}
            />
          </View>
        ))}
      </View>
      <View className="flex flex-row items-center justify-end gap-4">
        <Button
          variant="outline"
          className="flex flex-row flex-nowrap items-center gap-2"
          onPress={resetFields}
        >
          <Text className="flex flex-row items-center gap-2">{t('Reset')}</Text>
        </Button>
        <Button onPress={handleApply} className="flex flex-row flex-nowrap items-center gap-2">
          <Text className="flex flex-row items-center gap-2">{t('Search')}</Text>
        </Button>
      </View>
    </View>
  )
}

const getPlaceholder = (key: string) => {
  const placeholders: { [key: string]: string } = {
    title: 'Title',
    author: 'Author',
    isbn: 'ISBN',
    classificationNumber: 'Classification number',
    genres: 'Genres',
    publisher: 'Publisher',
    topicalTerms: 'Keyword',
  }
  return placeholders[key] || ''
}

export default BasicSearchTab
