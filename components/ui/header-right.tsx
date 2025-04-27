import React from 'react'
import { View } from 'react-native'
import { cn } from '~/lib/utils'

import { HeaderDropdown } from './header-dropdown'
import { ThemeToggle } from './theme-toggle'

type Props = {
  classname?: string
}

const HeaderRight = ({ classname }: Props) => {
  return (
    <View className={cn('flex flex-row gap-2 pr-2', classname)}>
      <ThemeToggle />
      <HeaderDropdown />
    </View>
  )
}

export default HeaderRight
