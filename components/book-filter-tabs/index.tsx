import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { useTranslation } from 'react-i18next'

import AdvancedSearchTab from './advanced-search-tab'
import BasicSearchTab from './basic-search-tab'
import QuickSearchTab from './quick-search'

const BookFilterTabs = () => {
  const { t } = useTranslation('SearchScreen')
  const [value, setValue] = useState('quick-search')

  return (
    <View className="justify-center">
      <Tabs value={value} onValueChange={setValue} className="mx-auto w-full flex-col gap-1.5">
        <TabsList className="w-full flex-row">
          <TabsTrigger value="quick-search" className="flex-1 rounded-md">
            <Text>{t('Quick')}</Text>
          </TabsTrigger>
          <TabsTrigger value="basic-search" className="flex-1 rounded-md">
            <Text>{t('Basic')}</Text>
          </TabsTrigger>
          <TabsTrigger value="advanced-search" className="flex-1 rounded-md">
            <Text>{t('Advance')}</Text>
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
