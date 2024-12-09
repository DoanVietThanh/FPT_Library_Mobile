import { Stack } from 'expo-router'

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="sign-in/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sign-in/password-method/[email]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="reset-password/[email]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="verify-email/[email]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}
