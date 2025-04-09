import * as React from 'react'
import { View } from 'react-native'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { Text } from '~/components/ui/text'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import PredictionOcrDetailTab from './_components/prediction-ocr-detail-tab'
import PredictionOcrDetectTab from './_components/prediction-ocr-detect-tab'
import PredictionOtherMatchesTab from './_components/prediction-other-matches-tab'
import PredictionResultTab from './_components/prediction-result-tab'

enum EPredictionTab {
  RESULT = 'result',
  OCR_DETAIL = 'ocr-detail',
  OCR_DETECTS = 'ocr-detects',
  OCR_MATCHES = 'ocr-matches',
}

export default function AiPredictionResult() {
  const [value, setValue] = React.useState<EPredictionTab>(EPredictionTab.RESULT)
  return (
    <>
      <SafeAreaView className="m-0 flex-1 p-0" edges={['left', 'right', 'bottom']}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false} overScrollMode="never">
          <View className="min-h-screen-safe flex flex-col gap-y-6 bg-secondary p-6">
            <Tabs
              value={value}
              onValueChange={(value) => setValue(value as EPredictionTab)}
              className="mx-auto flex max-w-[400px] flex-col "
            >
              <ScrollView horizontal>
                <TabsList className="w-full flex-row bg-background">
                  <TabsTrigger className="flex-1" value={EPredictionTab.RESULT}>
                    <Text>Result</Text>
                  </TabsTrigger>
                  <TabsTrigger className="flex-1" value={EPredictionTab.OCR_DETAIL}>
                    <Text>OCR detail</Text>
                  </TabsTrigger>
                  <TabsTrigger className="flex-1" value={EPredictionTab.OCR_DETECTS}>
                    <Text>OCR detects</Text>
                  </TabsTrigger>
                  <TabsTrigger className="flex-1" value={EPredictionTab.OCR_MATCHES}>
                    <Text>Other matches</Text>
                  </TabsTrigger>
                </TabsList>
              </ScrollView>

              <TabsContent value={EPredictionTab.RESULT} className="mt-4 flex-1">
                <PredictionResultTab />
              </TabsContent>
              <TabsContent value={EPredictionTab.OCR_DETAIL} className="mt-4 flex-1">
                <PredictionOcrDetailTab />
              </TabsContent>
              <TabsContent value={EPredictionTab.OCR_DETECTS} className="mt-4 flex-1">
                <PredictionOcrDetectTab />
              </TabsContent>
              <TabsContent value={EPredictionTab.OCR_MATCHES} className="mt-4 flex-1">
                <PredictionOtherMatchesTab />
              </TabsContent>
            </Tabs>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}
