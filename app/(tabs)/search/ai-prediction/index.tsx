import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import AiUploadImg from '~/assets/images/ai-book-upload.png'
import { Button } from '~/components/ui/button'
import * as ImagePicker from 'expo-image-picker'
import { Href, useRouter } from 'expo-router'

const AiPredictionScreen = () => {
  const router = useRouter()
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setPreviewImage(result.assets[0].uri)
    }
  }

  const handleRemoveFile = () => {
    setPreviewImage(null)
  }

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-center text-xl font-semibold">Welcome to</Text>
      <Text className="my-2 text-center text-3xl font-semibold text-primary">
        Book AI prediction
      </Text>
      <Text className="text-center font-semibold">
        Upload a book cover and let AI predict the book details
      </Text>

      {previewImage && (
        <View className="w-full flex-row justify-end gap-2">
          <Button variant={'outline'} onPress={handleRemoveFile} className="mt-2">
            <Text>Clear</Text>
          </Button>
          <Button
            variant={'ghost'}
            onPress={() => router.push(`/search/ai-prediction/result` as Href)}
            disabled={!previewImage}
            className="mt-2"
          >
            <Text>Let's start</Text>
          </Button>
        </View>
      )}

      <TouchableOpacity
        onPress={pickImage}
        className="mt-4 w-full items-center rounded-lg border-2 border-dashed border-primary p-6"
      >
        {!previewImage ? (
          <>
            <Image source={AiUploadImg} className="h-48 w-48 opacity-65" resizeMode="contain" />
            <Text className="text-lg font-semibold underline">Choose Image</Text>
            <Text>or drag and drop file here</Text>
            <Text className="text-sm">(supports .jpg, .jpeg, .png, .webp)</Text>
            <Text className="text-sm text-danger">No file chosen</Text>
          </>
        ) : (
          <Image
            source={{ uri: previewImage }}
            className="h-48 w-48 rounded-md"
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>
    </View>
  )
}

export default AiPredictionScreen
