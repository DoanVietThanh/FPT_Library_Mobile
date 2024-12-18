import React from 'react'
import { View } from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard'
import { Skeleton } from '~/components/ui/skeleton'
import { cn } from '~/lib/utils'
import { useTranslation } from 'react-i18next'
import Toast from 'react-native-toast-message'

import { Button } from './ui/button'
import { Text } from './ui/text'

type Props = {
  codes: string[]
  isLoading: boolean
  className?: string
}

function BackupCodes({ codes, className, isLoading }: Props) {
  const {
    i18n: { language },
  } = useTranslation()
  const handleCopyCode = (code: string) => {
    console.log(code)

    Clipboard.setString(code)
    Toast.show({
      text2: (language === 'vi' ? 'Bạn đã copy mã ' : 'You have saved ') + code,
    })
  }
  return (
    <View className={cn('mt-3 flex flex-row flex-wrap justify-center gap-2', className)}>
      {isLoading
        ? Array(5)
            .fill(null)
            .map((item, i) => <Skeleton key={i} className="h-6 w-32 rounded-md" />)
        : codes.map((code) => (
            <Button
              key={code}
              variant="secondary"
              size="sm"
              onPress={() => handleCopyCode(code)}
              className="w-fit cursor-pointer select-none rounded-md border bg-card px-2"
            >
              <Text>{code}</Text>
            </Button>
          ))}
    </View>
  )
}

export default BackupCodes
