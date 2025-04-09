import React from 'react'
import { Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'

const NoData = () => {
  const {
    i18n: { language },
  } = useTranslation()
  return (
    <View>
      <Text className="text-sm">{language === 'en' ? 'No data' : 'Không có dữ liệu'}</Text>
    </View>
  )
}

export default NoData
