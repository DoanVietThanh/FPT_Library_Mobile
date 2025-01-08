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
        name="sign-in/password-method/[type]/[email]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sign-in/otp-method/[email]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="mfa/[email]/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="mfa/[email]/enable"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="mfa/[email]/recovery"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="reset-password/[type]/[email]"
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
