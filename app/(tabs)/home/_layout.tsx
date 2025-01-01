import React from 'react'
import { Stack } from 'expo-router'

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="books/[bookId]" options={{ headerShown: true, title: 'Book Detail' }} />
    </Stack>
  )
}
