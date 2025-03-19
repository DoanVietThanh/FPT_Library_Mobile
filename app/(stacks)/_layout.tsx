import { Stack } from 'expo-router'

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="management-tools/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="management-tools/change-instance-shelf-status"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="management-tools/guides"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}
