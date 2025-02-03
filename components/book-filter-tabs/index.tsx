import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { cn } from '~/lib/utils'

import AdvancedSearchTab from './advanced-search-tab'
import BasicSearchTab from './basic-search-tab'
import QuickSearchTab from './quick-search'

const BookFilterTabs = () => {
  const [value, setValue] = useState('quick-search')

  return (
    <View className="justify-center">
      <Tabs
        value={value}
        onValueChange={setValue}
        className="mx-auto w-full max-w-[400px] flex-col gap-2"
      >
        <TabsList className="w-full flex-row">
          <TabsTrigger
            value="quick-search"
            className={cn('flex-1 rounded-lg', value === 'quick-search' && 'bg-primary text-white')}
          >
            <Text className={cn(value === 'quick-search' && 'text-white')}>Quick</Text>
          </TabsTrigger>
          <TabsTrigger
            value="basic-search"
            className={cn('flex-1 rounded-lg', value === 'basic-search' && 'bg-primary')}
          >
            <Text className={cn(value === 'basic-search' && 'text-white')}>Basic</Text>
          </TabsTrigger>
          <TabsTrigger
            value="advanced-search"
            className={cn('flex-1 rounded-lg', value === 'advanced-search' && 'bg-primary')}
          >
            <Text className={cn(value === 'advanced-search' && 'text-white')}>Advanced</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="quick-search">
          <QuickSearchTab />
        </TabsContent>
        <TabsContent value="basic-search">
          <BasicSearchTab />
        </TabsContent>
        <TabsContent value="advanced-search">
          <AdvancedSearchTab />
        </TabsContent>
      </Tabs>
    </View>
  )
}

export default BookFilterTabs
