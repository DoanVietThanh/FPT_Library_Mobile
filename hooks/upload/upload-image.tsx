import { useMutation } from '@tanstack/react-query'
import { useAuth } from '~/contexts/auth-provider'
import { handleHttpError } from '~/lib/http'
import { ActionResponse } from '~/types/action-response'
import { ResourceType } from '~/types/enum'
import axios from 'axios'

type Props = {
  file: File
  resourceType: ResourceType
}

type TUploadImageData = {
  secureUrl: string
  publicId: string
}

function useUploadImage() {
  const { accessToken } = useAuth()

  return useMutation({
    mutationFn: async ({
      file,
      resourceType,
    }: Props): Promise<ActionResponse<TUploadImageData>> => {
      try {
        console.log(123)

        const formData = new FormData()
        formData.append('file', file)
        formData.append('resourceType', resourceType)

        const { data } = await axios
          .post(`${process.env.EXPO_PUBLIC_API_ENDPOINT}/api/resources/images/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => res.data)

        console.log(456)
        return {
          isSuccess: true,
          data,
        }
      } catch (error) {
        console.log('🚀 ~ useUploadImage ~ error:', error)
        return handleHttpError(error)
      }
    },
  })
}

export default useUploadImage
