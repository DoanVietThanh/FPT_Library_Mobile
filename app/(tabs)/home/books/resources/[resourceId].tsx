import { useEffect, useState } from 'react'
import { Dimensions, Linking, StyleSheet, Text, View } from 'react-native'
import { Button } from '~/components/ui/button'
import Loading from '~/components/ui/loading'
import { useAuth } from '~/contexts/auth-provider'
import * as FileSystem from 'expo-file-system'
import { useLocalSearchParams } from 'expo-router'
import { useTranslation } from 'react-i18next'
import Pdf from 'react-native-pdf'
import Toast from 'react-native-toast-message'

const DigitalResourcePage = () => {
  const { t: tGeneralManagement } = useTranslation('GeneralManagement')
  const { accessToken } = useAuth()
  const { isPreview, resourceId } = useLocalSearchParams()
  const [pdfPath, setPdfPath] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchPdf() {
      setLoading(true)
      try {
        const url =
          isPreview === 'true'
            ? `/api/library-items/resource/${resourceId}/preview`
            : `/api/library-items/resource/${resourceId}`

        // Đường dẫn lưu file
        const fileUri = `${FileSystem.documentDirectory}${resourceId}.pdf`

        // Kiểm tra file có sẵn không
        const fileInfo = await FileSystem.getInfoAsync(fileUri)
        if (fileInfo.exists) {
          console.log('Dùng file đã lưu:', fileUri)
          setPdfPath(fileUri)
          setLoading(false)
          return
        }

        console.log('Tải file PDF từ server...')
        const downloadResumable = FileSystem.createDownloadResumable(
          `${process.env.EXPO_PUBLIC_API_ENDPOINT}${url}`,
          fileUri,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )

        const downloadResult = await downloadResumable.downloadAsync()

        if (downloadResult && downloadResult.uri) {
          setPdfPath(downloadResult.uri)
        } else {
          throw new Error('Không thể tải file')
        }
      } catch (error) {
        console.error('Lỗi khi tải PDF:', error)
        Toast.show({
          text1: tGeneralManagement('error'),
          text2: tGeneralManagement('resourceNotFound'),
          type: 'error',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPdf()
  }, [accessToken, resourceId, isPreview, tGeneralManagement])

  return (
    <View className="flex-1 bg-background">
      <View className="flex flex-row items-center justify-end gap-2 px-4 py-2">
        <Button
          variant={'outline'}
          onPress={() => {
            if (pdfPath) Linking.openURL(pdfPath)
          }}
        >
          <Text>Open</Text>
        </Button>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <Loading />
        </View>
      ) : pdfPath ? (
        <Pdf
          trustAllCerts={false}
          source={{ uri: pdfPath }}
          style={styles.pdf}
          onLoadComplete={(numberOfPages) => {
            console.log(`PDF có số trang: ${numberOfPages}`)
          }}
          onError={(error) => {
            console.log('Lỗi hiển thị PDF:', error)
            Toast.show({
              type: 'error',
              text1: 'Lỗi hiển thị PDF',
            })
          }}
          renderActivityIndicator={() => (
            <View>
              <Loading />
            </View>
          )}
        />
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text>Không thể hiển thị PDF</Text>
        </View>
      )}
    </View>
  )
}

export default DigitalResourcePage

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})
