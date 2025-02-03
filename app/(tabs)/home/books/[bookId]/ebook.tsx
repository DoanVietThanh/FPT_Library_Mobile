import React, { useEffect, useRef, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'
import { dummyBooks } from '~/components/home/dummy-books'
import { Button } from '~/components/ui/button'
import { Audio } from 'expo-av'
import { useLocalSearchParams } from 'expo-router'
import { Heart, Share } from 'lucide-react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview'

const BookEbook = () => {
  const { bookId, audio } = useLocalSearchParams()
  const [sound, setSound] = useState<Audio.Sound | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const intervalRef = useRef<NodeJS.Timer | null>(null)

  const book = dummyBooks.find((book) => book.id.toString() === bookId)

  const handlePlayPause = async () => {
    if (!sound) return
    if (isPlaying) {
      await sound.pauseAsync()
      setIsPlaying(false)
    } else {
      await sound.playAsync()
      setIsPlaying(true)
    }
  }

  const loadAudio = async () => {
    try {
      const { sound: loadedSound } = await Audio.Sound.createAsync({
        uri: 'https://ia803008.us.archive.org/3/items/a_day_with_great_poets_1308_librivox/a_day_with_great_poets_01_byron_128kb.mp3',
      })
      setSound(loadedSound)
      loadedSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setDuration(status.durationMillis || 0)
          setCurrentTime(status.positionMillis || 0)
        }
      })
    } catch (error) {
      console.error('Error loading audio:', error)
    }
  }

  useEffect(() => {
    loadAudio()
    return () => {
      if (sound) {
        sound.unloadAsync()
      }
    }
  }, [])

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(async () => {
        if (sound) {
          const status = await sound.getStatusAsync()
          if (status.isLoaded) {
            setCurrentTime(status.positionMillis || 0)
          }
        }
      }, 500)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current as unknown as number)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current as unknown as number)
    }
  }, [isPlaying])

  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000)
    const seconds = Math.floor((millis % 60000) / 1000)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const handleSeek = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value)
      setCurrentTime(value)
    }
  }

  return (
    <SafeAreaView className="m-0 flex-1 p-0" edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="">
        <View className="min-h-screen-safe flex flex-col gap-y-6 bg-secondary p-6">
          <View className="h-[60vh] w-full items-center justify-center rounded-lg bg-background p-4">
            <Text>PDF Viewer (Placeholder)</Text>
            <WebView
              className="h-[200px] w-[200px] flex-1 bg-red-700"
              source={{
                uri: `https://docs.google.com/gview?embedded=true&url=https://file.nhasachmienphi.com/pdf/nhasachmienphi-206-mon-canh-dinh-duong-cho-tre-em.pdf`,
              }}
            />

            <WebView
              source={{
                uri: `https://docs.google.com/gview?embedded=true&url=https://file.nhasachmienphi.com/pdf/nhasachmienphi-206-mon-canh-dinh-duong-cho-tre-em.pdf`,
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </View>

          {audio === 'true' && (
            <View className="flex w-full flex-col justify-center rounded-lg bg-background p-4">
              <Text className="text-xl font-semibold text-primary">
                Audio Player - {book?.title}
              </Text>
              {/* <Image source={{ uri: book?.image }} className="h-24 w-32 rounded-lg object-contain" /> */}
              <View className="flex w-full flex-row items-center justify-between gap-2">
                <Text style={{ fontSize: 16 }}>{formatTime(currentTime)}</Text>
                <View className="flex-1">
                  <Slider
                    minimumValue={0}
                    maximumValue={duration}
                    value={currentTime}
                    onValueChange={handleSeek}
                    minimumTrackTintColor="#4CAF50"
                    maximumTrackTintColor="#DDD"
                    thumbTintColor="black"
                  />
                </View>
                <Text style={{ fontSize: 16 }}>{formatTime(duration)}</Text>
              </View>

              <View className="flex w-full flex-row items-center justify-between">
                <Button variant={'secondary'} size={'icon'}>
                  <Heart size={24} color="red" />
                </Button>

                <TouchableOpacity
                  onPress={handlePlayPause}
                  className="flex w-fit items-center justify-center rounded-full bg-primary p-2"
                >
                  <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="white" />
                </TouchableOpacity>

                <Button variant={'secondary'} size={'icon'}>
                  <Share size={24} color="black" />
                </Button>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default BookEbook
