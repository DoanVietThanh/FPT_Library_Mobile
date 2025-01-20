import React, { useEffect, useState } from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { Audio } from 'expo-av'
import { StopCircle } from 'lucide-react-native'
import { Mic, Play, Send, Trash } from 'react-native-feather'

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
      console.error('Failed to start recording', err)
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

    try {
      const fileUri = recordingUri
      const fileName = fileUri.split('/').pop()
      const formData = new FormData()

      const file = {
        uri: fileUri,
        name: fileName || 'recording.wav',
        type: 'audio/wav',
      }
      const blob = await (await fetch(file.uri)).blob()
      formData.append('file', blob, file.name)

      const response = await fetch('https://your-api-endpoint.com/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (!response.ok) throw new Error('Upload failed!')

      Alert.alert('Success', 'Recording submitted successfully!')
      setRecordingUri(null)
      setDuration(0)
    } catch (error) {
      console.error('Error submitting recording:', error)
      Alert.alert('Error', 'Failed to submit recording.')
    }
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
          <DialogTitle>Voice to text</DialogTitle>
          <DialogDescription>
            Press the mic button and start speaking. The text will be recognized and written in the
            text field.
          </DialogDescription>
          <View>
            <Text>abc</Text>
          </View>
          {/* <View className="flex-1 items-center justify-center bg-gray-100 p-4">
            <Text className="mb-4 text-2xl font-bold">Voice Recorder</Text>
            <Text className="mb-8 text-4xl">{formatTime(duration)}</Text>
            <View className="mb-8 flex-row items-center justify-center space-x-4">
              {!isRecording && !recordingUri && (
                <TouchableOpacity onPress={startRecording} className="rounded-full bg-red-500 p-4">
                  <Mic stroke="white" width={24} height={24} />
                </TouchableOpacity>
              )}
              {isRecording && (
                <TouchableOpacity onPress={stopRecording} className="rounded-full bg-gray-500 p-4">
                  <StopCircle stroke="white" width={24} height={24} />
                </TouchableOpacity>
              )}
              {recordingUri && !isPlaying && (
                <TouchableOpacity onPress={playSound} className="rounded-full bg-green-500 p-4">
                  <Play stroke="white" width={24} height={24} />
                </TouchableOpacity>
              )}
              {recordingUri && isPlaying && (
                <TouchableOpacity onPress={stopSound} className="rounded-full bg-yellow-500 p-4">
                  <StopCircle stroke="white" width={24} height={24} />
                </TouchableOpacity>
              )}
            </View>
            {recordingUri && (
              <View className="mt-4 space-y-4">
                <TouchableOpacity
                  onPress={submitRecording}
                  className="rounded-lg bg-blue-500 px-6 py-3"
                >
                  <View className="flex-row items-center">
                    <Send stroke="white" width={20} height={20} />
                    <Text className="ml-2 font-semibold text-white">Submit Recording</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={deleteRecording}
                  className="rounded-lg bg-red-500 px-6 py-3"
                >
                  <View className="flex-row items-center">
                    <Trash stroke="white" width={20} height={20} />
                    <Text className="ml-2 font-semibold text-white">Delete Recording</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View> */}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default VoiceToText
