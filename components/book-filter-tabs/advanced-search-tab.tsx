import React from 'react'
import { Text, View } from 'react-native'
import { Plus } from 'lucide-react-native'

import { Button } from '../ui/button'

const AdvancedSearchTab = () => {
  return (
    <View className="flex flex-1 flex-row items-center justify-between rounded-lg bg-background p-2">
      <Button className="flex flex-row items-center gap-2">
        <Plus size={16} className="" color={'white'} />
        <Text className="text-primary-foreground">Add new field</Text>
      </Button>
      <View className="flex flex-row items-center gap-2">
        <Button variant={'secondary'}>
          <Text>Reset</Text>
        </Button>
        <Button>
          <Text className="text-primary-foreground">Apply filter</Text>
        </Button>
      </View>
    </View>
  )
}

export default AdvancedSearchTab
