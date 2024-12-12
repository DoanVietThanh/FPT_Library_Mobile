import { View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar'
import { MoonStar } from '~/lib/icons/moon-star'
import { Sun } from '~/lib/icons/sun'
import { useColorScheme } from '~/lib/use-color-scheme'
import { cn } from '~/lib/utils'

import { Button } from './button'

export function ThemeToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme()
  return (
    <Button
      size="icon"
      variant="ghost"
      onPress={() => {
        const newTheme = isDarkColorScheme ? 'light' : 'dark'
        setColorScheme(newTheme)
        setAndroidNavigationBar(newTheme)
        AsyncStorage.setItem('theme', newTheme)
      }}
    >
      {({ pressed }) => (
        <View className={cn(pressed && 'opacity-70')}>
          {isDarkColorScheme ? (
            <MoonStar className="text-foreground" size={23} strokeWidth={1.25} />
          ) : (
            <Sun className="text-foreground" size={24} strokeWidth={1.25} />
          )}
        </View>
      )}
    </Button>
  )
}
