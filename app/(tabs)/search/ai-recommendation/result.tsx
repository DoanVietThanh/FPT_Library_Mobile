import * as React from 'react'
import { View } from 'react-native'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { Text } from '~/components/ui/text'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import RecommendationResultTab from './_components/recommendation-result-tab'

enum ERecommendationTab {
  RESULT = 'result',
}

export default function AiRecommendationResult() {
  const [value, setValue] = React.useState<ERecommendationTab>(ERecommendationTab.RESULT)
  return (
    <>
      <SafeAreaView className="m-0 flex-1 p-0" edges={['left', 'right', 'bottom']}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false} overScrollMode="never">
          <View className="min-h-screen-safe flex flex-col gap-y-6 bg-secondary p-6">
            <Tabs
              value={value}
              onValueChange={(value) => setValue(value as ERecommendationTab)}
              className="mx-auto flex max-w-[400px] flex-col "
            >
              <ScrollView horizontal>
                <TabsList className="w-full flex-row bg-background">
                  <TabsTrigger className="flex-1" value={ERecommendationTab.RESULT}>
                    <Text>Result</Text>
                  </TabsTrigger>
                </TabsList>
              </ScrollView>

              <TabsContent value={ERecommendationTab.RESULT} className="mt-4 flex-1">
                <RecommendationResultTab />
              </TabsContent>
            </Tabs>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}
