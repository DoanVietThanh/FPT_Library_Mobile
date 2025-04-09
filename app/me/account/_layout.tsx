import { Stack } from 'expo-router'

export default function MeAccountLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="account/library-card/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="account/library-card/register"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="account/borrow/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="account/borrow/digital/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="account/borrow/record/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="account/borrow/request/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="account/borrow/request/[borrowRequestId]/index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}
