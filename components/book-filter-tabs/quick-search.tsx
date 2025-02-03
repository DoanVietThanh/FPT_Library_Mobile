import React, { useState } from 'react'
import { Text, View } from 'react-native'
import {
  Option,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { useRouter } from 'expo-router'
import { RefreshCcw, Search } from 'lucide-react-native'

import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

const quickSearchData = [
  { id: 1, value: 'quick', label: 'Tìm nhanh' },
  { id: 2, value: 'title', label: 'Tiêu đề' },
  { id: 3, value: 'author', label: 'Tác giả' },
  { id: 4, value: 'keyword', label: 'Từ khóa' },
  { id: 5, value: 'ISBN', label: 'ISBN' },
  { id: 6, value: 'category', label: 'Danh mục' },
  { id: 7, value: 'published', label: 'Năm xuất bản' },
]

const QuickSearchTab = () => {
  const router = useRouter()
  const [checkedSearchNoMark, setCheckedSearchNoMark] = useState(false)
  const [checkedSearchExact, setCheckedSearchExact] = useState(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectedOption, setSelectedOption] = useState<{ label: string; value: string }>({
    label: 'Tìm nhanh',
    value: 'quick',
  })

  const handleReset = () => {
    setCheckedSearchNoMark(false)
    setCheckedSearchExact(false)
    setSearchValue('')
    setSelectedOption({
      label: 'Tìm nhanh',
      value: 'quick',
    })
  }

  return (
    <View className="flex-1 rounded-lg bg-background p-2">
      <View className="flex w-full flex-col gap-4">
        <View className="flex w-full flex-row items-center justify-between gap-2">
          <Label numberOfLines={1}>Tìm kiếm theo</Label>
          <Select
            className="flex-1"
            value={selectedOption}
            onValueChange={(option: Option | undefined) => {
              if (option) {
                setSelectedOption(option)
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                className="native:text-lg text-sm text-foreground"
                placeholder="Keyword"
              />
            </SelectTrigger>
            <SelectContent align="start" className="w-2/3">
              <SelectGroup>
                {quickSearchData.map((item) => (
                  <SelectItem key={item.id} label={item.label} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </View>
        <View className="flex w-full flex-row gap-2">
          <View className="flex w-full flex-1 flex-row items-center gap-2">
            <Label htmlFor="search-no-mark"> Tìm không dấu</Label>
            <Checkbox
              className="native:text-lg text-sm text-foreground"
              id="search-no-mark"
              checked={checkedSearchNoMark}
              onCheckedChange={(checked) => setCheckedSearchNoMark(checked)}
            />
          </View>

          <View className="flex w-full flex-1 flex-row items-center gap-2">
            <Label htmlFor="search-exact">Tìm chính xác</Label>
            <Checkbox
              className="native:text-lg text-sm text-foreground"
              id="search-exact"
              checked={checkedSearchExact}
              onCheckedChange={(checked) => setCheckedSearchExact(checked)}
            />
          </View>
        </View>
        <Input
          placeholder="Tìm kiếm"
          className="flex-1"
          value={searchValue}
          onChangeText={setSearchValue}
        />

        <View className="flex w-full flex-row gap-2">
          <Button
            variant={'secondary'}
            onPress={handleReset}
            className="flex w-full flex-1 flex-row items-center gap-2"
          >
            <RefreshCcw size={16} color={'black'} />
            <Text className="">Reset</Text>
          </Button>
          <Button
            onPress={() => router.push('/search/result')}
            className="flex w-full flex-1 flex-row items-center gap-2"
          >
            <Search size={16} color={'white'} />
            <Text className="text-white">Search</Text>
          </Button>
        </View>
      </View>
    </View>
  )
}

export default QuickSearchTab
