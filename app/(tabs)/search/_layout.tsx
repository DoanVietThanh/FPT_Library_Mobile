import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Stack, useRouter } from 'expo-router'

export default function SearchBookLayout() {
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
          title: 'Search Book Result',
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
      <Stack.Screen
        name="search-page"
        options={{
          headerShown: false,
          title: 'Search Page',
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
