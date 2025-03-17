import { useQuery } from '@tanstack/react-query'
import { handleHttpError } from '~/lib/http'
import { ActionResponse } from '~/types/action-response'
import { OcrDetail } from '~/types/models'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'

type Props = {
  libraryItemId: string
  image: ImagePicker.ImagePickerSuccessResult
}
export function useOcrDetail({ libraryItemId, image }: Props) {
  return useQuery({
    queryKey: ['ocr-detail', libraryItemId],
    queryFn: async (): Promise<ActionResponse<OcrDetail>> => {
      try {
        const uri = image.assets[0].uri
        const fileName = uri.split('/').pop()
        const fileType = fileName?.split('.').pop()

        const formData = new FormData()
        formData.append('ImageToPredict', {
          uri,
          name: fileName,
          type: `image/${fileType}`,
        } as unknown as Blob)

        const { data } = await axios
          .post(
            `${process.env.EXPO_PUBLIC_API_ENDPOINT}/api/library-items/${libraryItemId}/ocr-detail`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          )
          .then((res) => res.data)
          .catch((error) => {
            console.log('🚀 ~ useOcrDetail ~ error:', error)
          })

        return {
          isSuccess: true,
          data,
        }
      } catch (error) {
        return handleHttpError(error)
      }
    },
  })
}
