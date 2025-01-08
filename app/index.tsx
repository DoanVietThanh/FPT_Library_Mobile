import { Image, ScrollView, View } from 'react-native'
import fptLogo from '~/assets/images/fpt-logo.png'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { useAuth } from '~/contexts/auth-provider'
import { Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function App() {
  const { isLoadingAuth, isLoggedIn } = useAuth()

  if (!isLoadingAuth && isLoggedIn) {
    return <Redirect href="/home" />
  }

  return (
    <SafeAreaView className="relative h-full">
      {isLoadingAuth && (
        <View className="fixed z-10 flex h-full w-full items-center justify-center">
          <Image source={fptLogo} className="h-[84px] w-[130px]" resizeMode="contain" />
        </View>
      )}

      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="min-h-[85vh] w-full items-center justify-center px-4">
          <Image source={fptLogo} className="h-[84px] w-[130px]" resizeMode="contain" />

          {/* <Image
            source={images.cards}
            className="h-[300px] w-full max-w-[380px]"
            resizeMode="contain"
          /> */}

          <View className="relative mt-5">
            <Text className="text-center text-2xl font-bold">
              Discover Endless Knowledge with{' '}
              <Text className="text-nowrap text-2xl font-bold text-primary">F-library</Text>
            </Text>

            {/* <Image
                source={images.path}
                className='absolute -bottom-2 -right-8 h-[15px] w-[136px]'
                resizeMode='contain'
              /> */}
          </View>

          <Text className="font-p-regular mt-7 text-center text-sm text-accent-foreground">
            Where knowledge meets technology: explore an endless world of reading with us
          </Text>

          <Button className="mt-6" onPress={() => router.push('/sign-in')}>
            <Text>Continue with email</Text>
          </Button>

          <Button className="mt-6" onPress={() => router.push('/(tabs)/home')}>
            <Text>Home</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
