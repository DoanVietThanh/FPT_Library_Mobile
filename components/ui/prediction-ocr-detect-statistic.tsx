import React from 'react'
import { Text, View } from 'react-native'
import { cn } from '~/lib/utils'

import { Progress } from './progress'

const objectLists = [
  { id: 1, label: 'Confidence', progressValue: 18 },
  { id: 2, label: 'IoU threshold', progressValue: 45 },
  { id: 3, label: 'Person', progressValue: 86 },
  { id: 4, label: 'Chair', progressValue: 77 },
  { id: 5, label: 'Table', progressValue: 3 },
  { id: 6, label: 'Book', progressValue: 100 },
  { id: 7, label: 'Car', progressValue: 78 },
  { id: 8, label: 'Bicycle', progressValue: 10 },
  { id: 9, label: 'Laptop', progressValue: 55 },
  { id: 10, label: 'Monitor', progressValue: 65 },
  { id: 11, label: 'Keyboard', progressValue: 40 },
  { id: 12, label: 'Mouse', progressValue: 90 },
]

type Props = {
  title?: string
}

const PredictionOcrDetectStatistic = ({ title }: Props) => {
  return (
    <View className="flex flex-1 flex-col gap-2 p-4">
      <Text className="mt-2 text-center text-xl font-semibold text-primary">
        {title || 'Statistic'}
      </Text>
      {objectLists.map((objectList) => (
        <View key={objectList.id} className="flex flex-row items-center justify-between gap-2">
          <Text className="w-1/3 text-nowrap text-sm font-semibold">{objectList.label}</Text>
          <Progress
            value={objectList.progressValue}
            className="h-2 flex-1 rounded-lg bg-border"
            indicatorClassName={
              objectList.progressValue >= 80
                ? 'bg-success'
                : objectList.progressValue <= 30
                  ? 'bg-danger'
                  : ''
            }
          />

          <Text
            className={cn('text-sm font-semibold', {
              'text-success': objectList.progressValue >= 80,
              'text-danger': objectList.progressValue <= 30,
            })}
          >
            {objectList.progressValue}%
          </Text>
        </View>
      ))}
    </View>
  )
}

export default PredictionOcrDetectStatistic
