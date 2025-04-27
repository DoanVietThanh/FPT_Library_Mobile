import React from 'react'
import { Image, Text, View } from 'react-native'
import logo from '~/assets/images/logo.png'
import { cn } from '~/lib/utils'

type Props = {
  classname?: string
}

const HeaderTitle = ({ classname }: Props) => {
  return (
    <View className={cn('flex flex-row items-center gap-2', classname)}>
      <Image source={logo} style={{ height: 32, width: 40 }} resizeMode="contain" />
      <View>
        <Text className="font-semibold text-primary">Intelligent Library</Text>
        <Text className="text-muted-foreground">Thư viện thông minh</Text>
      </View>
    </View>
  )
}

export default HeaderTitle
