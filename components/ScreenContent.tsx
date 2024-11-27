import { View } from 'react-native'

import { EditScreenInfo } from './EditScreenInfo'
import { Text } from './ui/text'

type ScreenContentProps = {
  title: string
  path: string
  children?: React.ReactNode
}

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  return (
    <View className="flex flex-1 items-center justify-center">
      <Text className="text-xl font-bold text-yellow-500">{title}</Text>
      <View className="h-1 w-full" />
      <EditScreenInfo path={path} />
      {children}
    </View>
  )
}
