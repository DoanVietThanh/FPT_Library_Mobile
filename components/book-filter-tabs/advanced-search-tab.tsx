'use client'

import { useState } from 'react'
import { View } from 'react-native'
import { Plus } from '~/lib/icons/plus'
import { formUrlQuery } from '~/lib/utils'
import {
  advancedFilters,
  EAdvancedFilterBookField,
  EAdvancedFilterType,
  EFilterOperator,
  ESearchType,
} from '~/types/enum'
import { format } from 'date-fns'
import { Href, useLocalSearchParams, useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import uuid from 'react-native-uuid'
import { z } from 'zod'

import { Button } from '../ui/button'
import { Text } from '../ui/text'
import AdvancedSearchItem from './advanced-search-item'

const uuidv4 = uuid.v4

export type FOV = {
  id: string
  f: EAdvancedFilterBookField | null
  o: EFilterOperator | null
  v: string | number | [string | null, string | null]
}

const parseToStringArr = z
  .string()
  .or(z.array(z.string()))
  .optional()
  .catch([])
  .transform((data) => (data ? (Array.isArray(data) ? data : [data]) : [])).parse

const AdvancedSearchTab = () => {
  const router = useRouter()
  const searchParams = useLocalSearchParams()
  const { t } = useTranslation('SearchScreen')
  const [bookQueries, setBookQueries] = useState<FOV[]>(() => {
    const f = parseToStringArr(searchParams.f)
    const o = parseToStringArr(searchParams.o)
    const v = parseToStringArr(searchParams.v)

    if (f.length !== o.length || f.length !== v.length) return []

    return f.map((_, i) => {
      const type =
        advancedFilters.find((a) => a.field === (f[i] as EAdvancedFilterBookField))?.type ||
        EAdvancedFilterType.TEXT

      let value: string | number | [string | null, string | null] = ''

      switch (type) {
        case EAdvancedFilterType.TEXT:
          value = v[i]
          break
        case EAdvancedFilterType.NUMBER:
          value = +v[i]
          break
        case EAdvancedFilterType.ENUM:
          value = +v[i]
          break
        case EAdvancedFilterType.DATE:
          value = v[i].split(',').map((d) => (!d || d === 'null' ? null : d)) as [
            string | null,
            string | null,
          ]
          break
      }

      return {
        id: uuidv4(),
        f: f[i] as EAdvancedFilterBookField,
        o: +o[i] as unknown as EFilterOperator | null,
        v: value,
      }
    })
  })

  const selectedFields = bookQueries
    .map((item) => item.f)
    .filter(Boolean) as EAdvancedFilterBookField[]

  const handleNewFov = () =>
    setBookQueries((prev) => [...prev, { id: uuidv4(), f: null, o: null, v: '' }])

  const handleDeleteFov = (id: string) => setBookQueries((prev) => prev.filter((f) => f.id !== id))

  const handleChangeFov = (id: string, fov: FOV) => {
    setBookQueries((prev) => prev.map((item) => (item.id === id ? fov : item)))
  }

  const handleApply = () => {
    const filteredQuery = bookQueries
      .filter((f) => f.v !== '' && JSON.stringify(f.v) !== JSON.stringify([null, null]))
      .map((f) => {
        if (Array.isArray(f.v)) {
          return {
            ...f,
            v: f.v.map((a) => (a === null ? 'null' : format(new Date(a), 'yyyy-MM-dd'))).join(','),
            id: undefined,
          }
        }
        return { ...f, id: undefined }
      })

    const newUrl = formUrlQuery({
      url: '/search/result',
      params: searchParams.toString(),
      updates: {
        f: filteredQuery.map((f) => f.f),
        o: filteredQuery.map((f) => (f.o === null ? 'null' : f.o.toString())),
        v: filteredQuery.map((f) => f.v.toString()),
        pageIndex: '1',
        searchType: ESearchType.ADVANCED_SEARCH.toString(),
        search: null,
      },
    })

    console.log(newUrl)

    router.push(newUrl as Href)
  }

  return (
    <View className="mt-2 flex flex-col gap-4">
      {bookQueries.map((fov) => (
        <AdvancedSearchItem
          onDeleteFov={handleDeleteFov}
          key={fov.id}
          fov={fov}
          selectedFields={selectedFields}
          onChangeFov={handleChangeFov}
          onNewFov={handleNewFov}
        />
      ))}
      <View className="mt-4 flex flex-row flex-wrap items-center justify-between gap-4">
        <Button onPress={handleNewFov} className="flex flex-row items-center gap-2">
          <Text>
            <Plus className="text-primary-foreground" />
          </Text>
          <Text>{t('Add new')}</Text>
        </Button>
        <View className="flex flex-row items-center gap-2">
          <Button
            onPress={() => setBookQueries([])}
            variant="outline"
            className="flex flex-row items-center gap-2"
          >
            <Text>{t('Reset')}</Text>
          </Button>
          <Button
            onPress={handleApply}
            variant="default"
            className="flex flex-row items-center gap-2"
          >
            <Text>{t('Search')}</Text>
          </Button>
        </View>
      </View>
    </View>
  )
}

export default AdvancedSearchTab
