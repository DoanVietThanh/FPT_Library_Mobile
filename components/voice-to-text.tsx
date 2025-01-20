import React, { useEffect, useState } from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { Audio } from 'expo-av'
import { StopCircle } from 'lucide-react-native'
import { Mic, Play } from 'react-native-feather'

import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'

type Props = { open: boolean; setOpen: (value: boolean) => void }

const VoiceToText = ({ open, setOpen }: Props) => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null)
  const [sound, setSound] = useState<Audio.Sound | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [recordingUri, setRecordingUri] = useState<string | null>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync()
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      )

      setRecording(recording)
      setIsRecording(true)
      setDuration(0)
    } catch (err) {
      Alert.alert('Error', 'Failed to start recording.')
      console.error(err)
    }
  }

  const stopRecording = async () => {
    if (!recording) return

    setIsRecording(false)
    await recording.stopAndUnloadAsync()
    const uri = recording.getURI()
    setRecordingUri(uri)
    setRecording(null)
  }

  const playSound = async () => {
    if (!recordingUri) return

    const { sound } = await Audio.Sound.createAsync({ uri: recordingUri })
    setSound(sound)
    setIsPlaying(true)
    await sound.playAsync()
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        setIsPlaying(false)
      }
    })
  }

  const stopSound = async () => {
    if (!sound) return

    await sound.stopAsync()
    setIsPlaying(false)
  }

  const deleteRecording = () => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this recording?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setRecordingUri(null)
          setDuration(0)
        },
      },
    ])
  }

  const submitRecording = async () => {
    if (!recordingUri) return
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleOnChange = (value: boolean) => {
    setOpen(value)
    if (value) {
      startRecording()
    } else {
      stopRecording()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOnChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Voice to Text</DialogTitle>
          <DialogDescription>
            Press the mic button to start recording and play it back before submission.
          </DialogDescription>

          <View className="flex items-center justify-center p-4">
            <Text className="text-3xl font-semibold">{formatTime(duration)}</Text>
            <View className="flex-row items-center space-x-4">
              {!isRecording && !recordingUri && (
                <TouchableOpacity
                  onPress={startRecording}
                  className="rounded-full bg-danger p-5"
                  accessibilityLabel="Start Recording"
                >
                  <Mic stroke="white" width={30} height={30} />
                </TouchableOpacity>
              )}
              {isRecording && (
                <TouchableOpacity
                  onPress={stopRecording}
                  className="rounded-full bg-warning p-5"
                  accessibilityLabel="Stop Recording"
                >
                  <StopCircle stroke="white" width={30} height={30} />
                </TouchableOpacity>
              )}
              {recordingUri && !isPlaying && (
                <TouchableOpacity
                  onPress={playSound}
                  className="rounded-full bg-danger p-5"
                  accessibilityLabel="Play Recording"
                >
                  <Play stroke="white" width={30} height={30} />
                </TouchableOpacity>
              )}
              {recordingUri && isPlaying && (
                <TouchableOpacity
                  onPress={stopSound}
                  className="rounded-full bg-warning p-5"
                  accessibilityLabel="Stop Playback"
                >
                  <StopCircle stroke="white" width={30} height={30} />
                </TouchableOpacity>
              )}
            </View>
            {recordingUri && (
              <View className="mt-6 flex flex-row gap-4">
                <Button
                  variant={'secondary'}
                  onPress={deleteRecording}
                  accessibilityLabel="Delete Recording"
                >
                  <Text className="text-center font-semibold">Clear</Text>
                </Button>
                <Button onPress={submitRecording} accessibilityLabel="Submit Recording">
                  <Text className="text-center font-semibold text-primary-foreground">Submit</Text>
                </Button>
              </View>
            )}
          </View>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default VoiceToText
