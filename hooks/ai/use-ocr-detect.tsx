import { useQuery } from '@tanstack/react-query'
import { handleHttpError } from '~/lib/http'
import { ActionResponse } from '~/types/action-response'
import { OcrDetect } from '~/types/models'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'

type Props = {
  libraryItemId: string
  image: ImagePicker.ImagePickerSuccessResult
}
export function useOcrDetect({ libraryItemId, image }: Props) {
  return useQuery({
    queryKey: [`library-items/${libraryItemId}/detect`],
    queryFn: async (): Promise<ActionResponse<OcrDetect>> => {
      try {
        const uri = image.assets[0].uri
        const fileName = uri.split('/').pop()
        const fileType = fileName?.split('.').pop()

        const formData = new FormData()
        formData.append('ImageToDetect', {
          uri,
          name: fileName,
          type: `image/${fileType}`,
        } as unknown as Blob)

        const { data } = await axios
          .post(
            `${process.env.EXPO_PUBLIC_API_ENDPOINT}/api/library-items/${libraryItemId}/ai/raw-detect`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          )
          .then((res) => res.data)
          .catch((error) => {
            console.log('🚀 ~ useOcrDetect ~ error:', error)
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
