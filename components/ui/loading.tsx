import React from 'react'
import { View } from 'react-native'
import { Loader2 } from 'lucide-react-native'

const Loading = () => {
  return (
    <View className="flex flex-row justify-center">
      <Loader2 className="size-9 animate-spin" />
    </View>
  )
}

export default Loading
