import React, { useState } from 'react'
import { Text, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { RefreshCcw, Search } from 'lucide-react-native'

import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

const quickSearchData = [
  { id: 1, key: 'title', label: 'Nhan đề' },
  { id: 2, key: 'author', label: 'Tác giả' },
  { id: 3, key: 'keyword', label: 'Từ khóa' },
  { id: 4, key: 'category', label: 'Phân loại' },
  { id: 5, key: 'year', label: 'Năm xuất bản' },
  { id: 6, key: 'registration', label: 'Số ĐKCB' },
  { id: 7, key: 'isbn', label: 'ISBN' },
  { id: 8, key: 'allFields', label: 'Mọi trường' },
]

const BasicSearchTab = () => {
  const [checkboxStates, setCheckboxStates] = useState<{ [key: number]: boolean }>(
    quickSearchData.reduce(
      (acc, item) => {
        acc[item.id] = false
        return acc
      },
      {} as { [key: number]: boolean },
    ),
  )

  const [inputValues, setInputValues] = useState<{ [key: number]: string }>(
    quickSearchData.reduce(
      (acc, item) => {
        acc[item.id] = ''
        return acc
      },
      {} as { [key: number]: string },
    ),
  )

  const [yearFrom, setYearFrom] = useState<Date | undefined>(undefined)
  const [yearTo, setYearTo] = useState<Date | undefined>(undefined)

  const handleCheckboxChange = (id: number, checked: boolean) => {
    setCheckboxStates((prevState) => ({
      ...prevState,
      [id]: checked,
    }))
  }

  const handleInputChange = (id: number, value: string) => {
    setInputValues((prevState) => ({
      ...prevState,
      [id]: value,
    }))

    if (value.trim() !== '') {
      handleCheckboxChange(id, true)
    } else {
      handleCheckboxChange(id, false)
    }
  }

  const handleReset = () => {
    setCheckboxStates(
      quickSearchData.reduce(
        (acc, item) => {
          acc[item.id] = false
          return acc
        },
        {} as { [key: number]: boolean },
      ),
    )
    setInputValues(
      quickSearchData.reduce(
        (acc, item) => {
          acc[item.id] = ''
          return acc
        },
        {} as { [key: number]: string },
      ),
    )
    setYearFrom(undefined)
    setYearTo(undefined)
  }

  return (
    <View className="flex flex-1 flex-col gap-2 rounded-lg bg-background p-2">
      <View className="flex w-full flex-col gap-4">
        {quickSearchData.map((item) =>
          item.key === 'year' ? (
            <View key={item.id} className="flex w-full flex-col gap-2">
              <View className="flex flex-row items-center gap-2">
                <Checkbox
                  checked={checkboxStates[item.id]}
                  onCheckedChange={(checked) => handleCheckboxChange(item.id, checked)}
                />
                <Text className="text-lg font-semibold">{item.label}</Text>
              </View>
              <View className="flex flex-row gap-4">
                <View className="flex flex-1 flex-row items-center justify-center gap-2">
                  <Label htmlFor="year-from">Từ</Label>
                  <DateTimePicker
                    className="flex-1"
                    value={yearFrom || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setYearFrom(selectedDate || yearFrom)
                      handleCheckboxChange(item.id, true)
                    }}
                  />
                </View>

                <View className="flex flex-1 flex-row items-center justify-center gap-2">
                  <Label htmlFor="year-from">Đến</Label>
                  <DateTimePicker
                    className="flex-1"
                    value={yearTo || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setYearTo(selectedDate || yearTo)
                      handleCheckboxChange(item.id, true)
                    }}
                  />
                </View>
              </View>
            </View>
          ) : (
            <View key={item.id} className="flex w-full flex-col gap-2">
              <View className="flex flex-row items-center gap-2">
                <Checkbox
                  checked={checkboxStates[item.id]}
                  onCheckedChange={(checked) => handleCheckboxChange(item.id, checked)}
                />
                <Text className="text-lg font-semibold">{item.label}</Text>
              </View>
              <Input
                className="h-8 flex-1"
                placeholder={item.label}
                value={inputValues[item.id]}
                onChangeText={(value) => handleInputChange(item.id, value)}
              />
            </View>
          ),
        )}
      </View>

      <View className="flex w-full flex-col gap-4">
        <View className="flex w-full flex-row gap-2">
          <Button
            variant={'secondary'}
            onPress={handleReset}
            className="flex w-full flex-1 flex-row items-center gap-2"
          >
            <RefreshCcw size={16} color={'black'} />
            <Text className="">Reset</Text>
          </Button>
          <Button className="flex w-full flex-1 flex-row items-center gap-2">
            <Search size={16} color={'white'} />
            <Text className="text-white">Search</Text>
          </Button>
        </View>
      </View>
    </View>
  )
}

export default BasicSearchTab
