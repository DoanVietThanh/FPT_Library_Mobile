import { Stack } from 'expo-router'

export default function MeAccountLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="me/account"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}
