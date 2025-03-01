import React from 'react'
import { Text, View } from 'react-native'
import { cn } from '~/lib/utils'
import { DetectedValue } from '~/types/models'

import { Progress } from './progress'

type Props = {
  title?: string
  detectValues: DetectedValue[]
}

const PredictionOcrDetectStatistic = ({ title, detectValues }: Props) => {
  return (
    <View className="flex flex-1 flex-col gap-2 p-4">
      <Text className="mt-2 text-center text-xl font-semibold text-primary">
        {title || 'Statistic'}
      </Text>
      {detectValues.map((value) => (
        <View key={value.name} className="flex flex-row items-center justify-between gap-2">
          <Text className="w-1/3 text-nowrap text-sm font-semibold">{value.name as string}</Text>
          <Progress
            value={value.percentage}
            className="h-2 flex-1 rounded-lg bg-border"
            indicatorClassName={
              value.percentage >= 80 ? 'bg-success' : value.percentage <= 30 ? 'bg-danger' : ''
            }
          />

          <Text
            className={cn('text-sm font-semibold', {
              'text-success': value.percentage >= 80,
              'text-danger': value.percentage <= 30,
            })}
          >
            {value.percentage.toFixed(1)}%
          </Text>
        </View>
      ))}
    </View>
  )
}

export default PredictionOcrDetectStatistic
