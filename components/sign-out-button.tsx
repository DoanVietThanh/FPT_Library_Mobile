import React from 'react'
import { View } from 'react-native'
import { useAuth } from '~/contexts/auth-provider'
import { LogOut } from '~/lib/icons/log-out'
import { cn } from '~/lib/utils'

import { Button } from './ui/button'

function SignOutButton() {
  const { signOut } = useAuth()
  return (
    <Button size="icon" variant="ghost" onPress={signOut}>
      {({ pressed }) => (
        <View className={cn(pressed && 'opacity-70')}>
          <LogOut className="text-foreground" />
        </View>
      )}
    </Button>
  )
}

export default SignOutButton
