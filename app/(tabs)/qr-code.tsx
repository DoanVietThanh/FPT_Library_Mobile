import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { useAuth } from '~/contexts/auth-provider'
import { useSocket } from '~/contexts/socket-provider'
import { Camera, CameraView } from 'expo-camera'
import i18n from 'i18next' // Import the i18n instance directly

export default function ScannerScreen() {
  const { accessToken } = useAuth()
  const { socket, authenticated } = useSocket()
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [scanned, setScanned] = useState<boolean>(false)
  const [scannedData, setScannedData] = useState('')

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted')
    }

    getCameraPermissions()
  }, [])

  useEffect(() => {
    if (scannedData && scanned && authenticated && socket && accessToken) {
      socket.emit('isbn-scanned', { token: accessToken, isbn: scannedData })
    }
  }, [scannedData, scanned, authenticated, socket, accessToken])

  const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (scanned || scannedData) return
    setScanned(true)
    setScannedData(data)
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`)
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={styles.container}>
      {!scanned && (
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['ean13'],
          }}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      {scanned && (
        <View className="flex flex-row justify-center">
          <Button
            onPress={() => {
              setScanned(false)
              setScannedData('')
            }}
          >
            <Text>{i18n.language === 'vi' ? 'Quét lại' : 'Scan again'}</Text>
          </Button>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
})
