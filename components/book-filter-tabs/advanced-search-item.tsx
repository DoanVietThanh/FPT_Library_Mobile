import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Check } from '~/lib/icons/Check'
import { ChevronsUpDown } from '~/lib/icons/chevrons-up-down'
import { Trash2 } from '~/lib/icons/trash2'
import { cn } from '~/lib/utils'
import {
  advancedFilters,
  EAdvancedFilterBookField,
  EAdvancedFilterType,
  EFilterOperator,
  filterOperatorToLabel,
  TAdvancedFilters,
} from '~/types/enum'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Text } from '../ui/text'
import { type FOV } from './advanced-search-tab'

type Props = {
  fov: FOV
  selectedFields: EAdvancedFilterBookField[]
  onNewFov: () => void
  onChangeFov: (id: string, f: FOV) => void
  onDeleteFov: (id: string) => void
}

const defaultO = {
  [EAdvancedFilterType.TEXT]: EFilterOperator.INCLUDES,
  [EAdvancedFilterType.NUMBER]: EFilterOperator.EQUALS,
  [EAdvancedFilterType.DATE]: EFilterOperator.EQUALS,
  [EAdvancedFilterType.ENUM]: EFilterOperator.EQUALS,
}

const defaultV = {
  [EAdvancedFilterType.TEXT]: '',
  [EAdvancedFilterType.NUMBER]: 0,
  [EAdvancedFilterType.DATE]: [null, null] as [string | null, string | null],
  [EAdvancedFilterType.ENUM]: 0,
}

const AdvancedSearchItem = ({ selectedFields, onChangeFov, onDeleteFov, fov }: Props) => {
  const { t } = useTranslation('SearchScreen')
  const [field, setField] = useState<TAdvancedFilters>()

  const [openSelectF, setOpenSelectF] = useState(false)

  const renderOperator = (field: TAdvancedFilters) => {
    const dateFrom = (fov?.v as [string | null, string | null])?.[0]
    const dateTo = (fov?.v as [string | null, string | null])?.[1]
    switch (field.type) {
      case EAdvancedFilterType.TEXT:
        return (
          <View className="flex w-full flex-row items-center gap-2">
            <Select
              value={{
                value: fov.o?.toString() || '',
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                label: t(filterOperatorToLabel.get(fov.o?.toString() || '0') || ''),
              }}
              onValueChange={(value) => {
                onChangeFov(fov.id, {
                  ...fov,
                  o: +(value?.value || '0'),
                })
              }}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder={t('Select')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem label={t('Includes')} value={EFilterOperator.INCLUDES.toString()}>
                  {t('Includes')}
                </SelectItem>
                <SelectItem label={t('Equals')} value={EFilterOperator.EQUALS.toString()}>
                  {t('Equals')}
                </SelectItem>
                <SelectItem
                  label={t('Not equals')}
                  value={EFilterOperator.NOT_EQUALS_TO.toString()}
                >
                  {t('Not equals')}
                </SelectItem>
              </SelectContent>
            </Select>
            <Input
              value={fov.v.toString()}
              className="flex-1"
              placeholder="Enter text"
              onChangeText={(val) => onChangeFov(fov.id, { ...fov, v: val })}
            />
          </View>
        )
      case EAdvancedFilterType.NUMBER:
        return (
          <View className="flex w-full flex-row items-center gap-2">
            <Select
              value={{
                value: fov.o?.toString() || '',
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                label: t(filterOperatorToLabel.get(fov.o?.toString() || '1') || ''),
              }}
              onValueChange={(value) =>
                onChangeFov(fov.id, {
                  ...fov,
                  o: +(value?.value || '1'),
                })
              }
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder={t('Select')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem label={t('Equals')} value={EFilterOperator.EQUALS.toString()}>
                  {t('Equals')}
                </SelectItem>
                <SelectItem
                  label={t('Not equals')}
                  value={EFilterOperator.NOT_EQUALS_TO.toString()}
                >
                  {t('Not equals')}
                </SelectItem>
                <SelectItem label={t('Less than')} value={EFilterOperator.LESS_THAN.toString()}>
                  {t('Less than')}
                </SelectItem>
                <SelectItem
                  label={t('Less than or equals')}
                  value={EFilterOperator.LESS_THAN_OR_EQUALS_TO.toString()}
                >
                  {t('Less than or equals')}
                </SelectItem>
                <SelectItem
                  label={t('Greater than')}
                  value={EFilterOperator.GREATER_THAN.toString()}
                >
                  {t('Greater than')}
                </SelectItem>
                <SelectItem
                  label={t('Greater than or equals')}
                  value={EFilterOperator.GREATER_THAN_OR_EQUALS_TO.toString()}
                >
                  {t('Greater than or equals')}
                </SelectItem>
              </SelectContent>
            </Select>
            <Input
              value={fov.v as string}
              keyboardType="numeric"
              className="flex-1"
              placeholder="Enter number"
              onChangeText={(val) =>
                onChangeFov(fov.id, {
                  ...fov,
                  v: val,
                })
              }
            />
          </View>
        )
      case EAdvancedFilterType.DATE:
        return (
          <View className="flex w-full flex-row items-center gap-2">
            <View className="flex flex-1 flex-row items-center gap-2">
              <Label htmlFor={`from-${field.field}`}>From</Label>
              <DateTimePicker
                value={dateFrom ? new Date(dateFrom) : new Date()}
                id={`from-${field.field}`}
                onChange={(_, date) => {
                  const value = date ? format(date, 'yyyy-MM-dd') : null

                  onChangeFov(fov.id, {
                    ...fov,
                    o: 0,
                    v: [value, (fov.v as [string | null, string | null])[1]], // "date,null"
                  })
                }}
              />
            </View>
            <View className="flex flex-1 flex-row items-center gap-2">
              <Label htmlFor={`to-${field.field}`}>To</Label>
              <DateTimePicker
                value={dateTo ? new Date(dateTo) : new Date()}
                id={`to-${field.field}`}
                onChange={(_, date) => {
                  const value = date ? format(date, 'yyyy-MM-dd') : null

                  onChangeFov(fov.id, {
                    ...fov,
                    o: 0,
                    v: [(fov.v as [string | null, string | null])[0], value], // "date,null"
                  })
                }}
              />
            </View>
          </View>
        )
      case EAdvancedFilterType.ENUM:
        return (
          <View className="flex w-full flex-row items-center gap-2">
            <Select
              value={{
                value: fov.o?.toString() || '',
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                label: t(filterOperatorToLabel.get(fov.o?.toString() || '1') || ''),
              }}
              onValueChange={(value) =>
                onChangeFov(fov.id, {
                  ...fov,
                  o: +(value?.value || '1'),
                })
              }
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder={t('Select')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem label={t('Equals')} value={EFilterOperator.EQUALS.toString()}>
                  {t('Equals')}
                </SelectItem>
                <SelectItem
                  label={t('Not equals')}
                  value={EFilterOperator.NOT_EQUALS_TO.toString()}
                >
                  {t('Not equals')}
                </SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={{
                value: fov.v.toString() || '',
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                label: t(filterOperatorToLabel.get(fov.o?.toString() || '1') || ''),
              }}
              onValueChange={(value) =>
                onChangeFov(fov.id, {
                  ...fov,
                  v: value?.value || '',
                })
              }
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder={t('Choose')} />
              </SelectTrigger>
              <SelectContent>
                {field.selections?.map((selection) => (
                  <SelectItem
                    label={t(selection.label)}
                    key={selection.value}
                    value={selection.value.toString()}
                  >
                    {t(selection.label)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </View>
        )

      default:
        return '...'
    }
  }

  useEffect(() => {
    if (!fov.f) return
    setField(() => advancedFilters.find((filter) => filter.field === fov.f))
  }, [fov.f])

  return (
    <View className="flex flex-row items-center gap-2">
      <Popover onOpenChange={setOpenSelectF}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openSelectF}
            className="flex  flex-row items-center justify-between gap-2"
          >
            <Text>
              {fov.f
                ? t(advancedFilters.find((f) => f.field === fov.f)?.field as string)
                : t('Select')}
            </Text>
            <Text>
              <ChevronsUpDown size={16} className="opacity-50" />
            </Text>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="overflow-y-auto p-0">
          <ScrollView
            style={{ overflowY: 'auto' }}
            contentContainerStyle={{ flexGrow: 1 }}
            className="max-h-[40vh] overflow-y-auto"
          >
            {advancedFilters.map((f) => {
              const hasSelected = selectedFields.includes(f.field)
              return (
                <Button
                  variant="ghost"
                  key={f.field}
                  onPress={() => {
                    if (hasSelected) return
                    onChangeFov(fov.id, {
                      ...fov,
                      f: f.field,
                      o: defaultO[f.type],
                      v: defaultV[f.type],
                    })
                    setOpenSelectF(false)
                  }}
                  className="flex flex-row items-center justify-between"
                >
                  <Text>{t(f.field)}</Text>
                  <Text>
                    <Check className={cn('ml-auto', hasSelected ? 'opacity-100' : 'opacity-0')} />
                  </Text>
                </Button>
              )
            })}
          </ScrollView>
        </PopoverContent>
      </Popover>

      <View className="flex-1">{field && renderOperator(field)}</View>

      <Trash2
        onPress={() => onDeleteFov(fov.id)}
        color="red"
        size={16}
        className="cursor-pointer"
      />
    </View>
  )
}

export default AdvancedSearchItem
