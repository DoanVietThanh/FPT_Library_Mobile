import React from 'react'
import { Pressable, View } from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard'
import { Skeleton } from '~/components/ui/skeleton'
import { useTranslation } from 'react-i18next'
import Toast from 'react-native-toast-message'

type Props = {
  codes: string[]
  isLoading: boolean
}

function BackupCodes({ codes }: Props) {
  const {
    i18n: { language },
  } = useTranslation()
  const handleCopyCode = (code: string) => {
    Clipboard.setString(code)
    Toast.show({
      text2: language === 'vi' ? 'Bạn đã copy mã ' : 'You have saved ' + code,
    })
  }
  return (
    <View className="mt-3 flex flex-wrap justify-center gap-2">
      {codes.map((code) => (
        <Pressable
          key={code}
          onPress={() => handleCopyCode(code)}
          className="cursor-pointer select-none rounded-md border bg-card px-2 text-card-foreground"
        >
          {code}
        </Pressable>
      ))}
      {Array(5)
        .fill(null)
        .map((item, i) => (
          <Skeleton key={i} className="h-6 w-32 rounded-md" />
        ))}
    </View>
  )
}

export default BackupCodes
