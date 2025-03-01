import React, { useState } from 'react'
import { Alert, Image, Text, View } from 'react-native'
import AiUploadImg from '~/assets/images/ai-book-upload.png'
import { Button } from '~/components/ui/button'
import { usePredictImage } from '~/hooks/ai/predict-image'
import { usePrediction } from '~/store/ai/use-prediction'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import { Loader2, Trash } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

const AiPredictionScreen = () => {
  const router = useRouter()
  const { t: tGeneralManagement } = useTranslation('GeneralManagement')
  const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(null)
  const { setUploadImage, setBestMatchedLibraryItemId, setPredictResult } = usePrediction()
  const { mutate: predictImage, isPending } = usePredictImage()

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result)
    }
  }

  const uploadImage = async () => {
    if (!image || image.canceled) {
      console.log('No image selected')
      return
    }

    const uri = image.assets[0].uri
    const fileName = uri.split('/').pop()
    const fileType = fileName?.split('.').pop()

    const formData = new FormData()
    formData.append('ImageToPredict', {
      uri,
      name: fileName,
      type: `image/${fileType}`,
    } as unknown as Blob)

    predictImage(formData, {
      onSuccess: (response) => {
        if (response.isSuccess) {
          setUploadImage(image)
          setBestMatchedLibraryItemId(response.data.data.bestItem.libraryItemId)
          setPredictResult(response.data.data)
          router.push('/(tabs)/search/ai-prediction/result')
        }
      },
      onError: (error) => {
        console.log('Upload failed:', error)
        Alert.alert('Upload failed', error.message)
      },
    })
  }

  return (
    <SafeAreaView className="m-0 flex-1 p-4" edges={['left', 'right', 'bottom', 'top']}>
      <View className="flex-1 items-center justify-center">
        <Text className="text-center text-xl font-semibold">
          {tGeneralManagement('welcome to')}
        </Text>
        <Text className="my-2 text-center text-3xl font-semibold text-primary">
          {tGeneralManagement('book ai prediction')}
        </Text>
        <Text className="text-center font-semibold">
          {tGeneralManagement('Upload a book cover and let AI Predict the book details')}
        </Text>

        <View className="w-full flex-row justify-end gap-2">
          <Button
            variant={'secondary'}
            className="mt-2 flex-row items-center gap-2"
            disabled={isPending || !image}
            onPress={() => setImage(null)}
          >
            <Trash className="size-2" size={16} color={'red'} />
            <Text>{tGeneralManagement('clear btn')}</Text>
          </Button>
          <Button
            variant={'outline'}
            onPress={uploadImage}
            disabled={!image || isPending}
            className="mt-2 flex flex-row items-center gap-2"
          >
            <Text>{tGeneralManagement('process btn')}</Text>
            {isPending && <Loader2 className="size-4 animate-spin" />}
          </Button>
        </View>

        <TouchableOpacity onPress={pickImage} disabled={isPending}>
          <View className="m-4 w-[80vw] items-center rounded-lg border-2 border-dashed border-primary p-6">
            {!image ? (
              <View className="h-[300px] items-center gap-2">
                <Image source={AiUploadImg} className="h-48 w-48 opacity-65" resizeMode="contain" />
                <Text className="text-lg font-semibold capitalize underline">
                  {tGeneralManagement('choose image')}
                </Text>
                <Text>{tGeneralManagement('or drag and drop file here')}</Text>
                <Text className="text-sm">
                  ({tGeneralManagement('support documents')} - .jpg, .jpeg, .png, .webp)
                </Text>
                <Text className="text-sm text-danger">{tGeneralManagement('no file chosen')}</Text>
              </View>
            ) : (
              <View className="flex h-[300px] flex-col items-center justify-between gap-2">
                <View className="flex-1 items-center justify-center">
                  <Image
                    source={{ uri: image?.assets ? image.assets[0].uri : '' }}
                    className="size-64 rounded-md"
                    resizeMode="contain"
                  />
                </View>
                <Text className="text-sm">
                  ({tGeneralManagement('support documents')} - .jpg, .jpeg, .png, .webp)
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default AiPredictionScreen
