import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Stack, useRouter } from 'expo-router'

export default function AiRecommendationLayout() {
  const router = useRouter()
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="result"
        options={{
          headerShown: false,
          title: 'Recommendation Result',
          headerLeft: () => (
            <TouchableOpacity
              className="rounded-full border p-2 shadow-md"
              onPress={() => router.back()}
            >
              <Feather name="arrow-left" size={16} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  )
}
