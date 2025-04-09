import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Stack, useRouter } from 'expo-router'

export default function HomeLayout() {
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
        name="books/[bookId]"
        options={{
          headerShown: true,
          title: 'Book Detail',
          headerLeft: () => (
            <TouchableOpacity
              className="rounded-full border border-gray-300 bg-background p-2 shadow-md"
              onPress={() => router.back()}
            >
              <Feather name="arrow-left" size={16} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="books/resources/[resourceId]"
        options={{
          headerShown: true,
          title: 'Resource',
          headerLeft: () => (
            <TouchableOpacity
              className="rounded-full border border-gray-300 bg-background p-2 shadow-md"
              onPress={() => router.back()}
            >
              <Feather name="arrow-left" size={16} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="books/[bookId]/ebook"
        options={{
          headerShown: true,
          title: 'Book Ebook',
          headerLeft: () => (
            <TouchableOpacity
              className="rounded-full border border-gray-300 bg-background p-2 shadow-md"
              onPress={() => router.back()}
            >
              <Feather name="arrow-left" size={16} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="borrows/index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="borrows/check-available"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}
