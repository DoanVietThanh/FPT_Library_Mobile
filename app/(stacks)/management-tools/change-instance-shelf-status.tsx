import React, { useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import BookCopyStatusBadge from '~/components/badge.tsx/book-copy-status-badge'
import BookCard from '~/components/cards/book-card'
import { Button } from '~/components/ui/button'
import { Dialog, DialogContent } from '~/components/ui/dialog'
import { Text } from '~/components/ui/text'
import useGetBookByBarcode, { BookByBarcode } from '~/hooks/books/use-get-book-by-barcode'
import useMoveOutOfShelf from '~/hooks/books/use-move-out-of-shelf'
import usePutOnShelf from '~/hooks/books/use-put-on-shelf'
import handleActionError from '~/lib/handle-action-error'
import { ChevronLeft } from '~/lib/icons/chevron-left'
import { Eye } from '~/lib/icons/eye'
import { Loader } from '~/lib/icons/loader'
import { MoveDown } from '~/lib/icons/move-down'
import { MoveUp } from '~/lib/icons/move-up'
import { Trash2 } from '~/lib/icons/trash2'
import { EBookCopyStatus } from '~/types/enum'
import { Camera, CameraView } from 'expo-camera'
import { useRouter } from 'expo-router'
import i18n from 'i18next'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

function ChangeInstanceShelfStatus() {
  const { t } = useTranslation('ManagementToolsScreen')
  const router = useRouter()

  const [scanning, setScanning] = useState(false)
  const [scannedInstances, setScannedInstances] = useState<BookByBarcode[]>([])

  const { mutate: getBookByBarcode, isPending: fetchingBook } = useGetBookByBarcode()
  const [scannedData, setScannedData] = useState<string | null>(null)

  const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (!scanning) return
    setScanning(false)
    setScannedData(data)
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`)
  }

  const handleRemoveBook = (barcode: string) => {
    setScannedInstances((prev) => prev.filter((b) => b.barcode !== barcode))
  }

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      if (status !== 'granted') {
        alert('Permission to access camera was denied')
      }
    })()
  }, [])

  useEffect(() => {
    if (
      fetchingBook ||
      !scannedData ||
      scannedInstances.some((instance) => instance.barcode === scannedData)
    )
      return

    getBookByBarcode(scannedData, {
      onSuccess: (res) => {
        if (res.isSuccess) {
          if (res.data) {
            setScannedInstances((prev) => {
              if (prev.find((d) => d.barcode === res.data.barcode)) return prev
              return [...prev, res.data]
            })
            return
          }

          Toast.show({
            type: 'error', // Define your custom type
            text1: i18n.language === 'vi' ? 'Lỗi' : 'Error',
            text2:
              i18n.language === 'vi'
                ? 'Không tìm thấy sách trong hệ thống'
                : 'Not found this book in system',
          })

          return
        }

        handleActionError(res)
      },
    })
  }, [scannedData])

  if (scanning) {
    return (
      <View className="relative flex-1">
        <CameraView
          onBarcodeScanned={handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['code128'],
          }}
          style={StyleSheet.absoluteFillObject}
        />
        <SafeAreaView>
          <View className="mt- px-4">
            <Pressable onPress={() => setScanning(false)}>
              <ChevronLeft size={28} className="text-primary" />
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    )
  }

  return (
    <SafeAreaView className="m-0 flex-1 p-0">
      <View className="flex flex-row items-center justify-center px-4 py-2">
        <View className="flex-1">
          <Pressable onPress={() => router.back()}>
            <ChevronLeft size={28} className="text-primary" />
          </Pressable>
        </View>
        <Text className="shrink-0 text-lg font-bold">{t('Change instances shelf')}</Text>
        <View className="flex-1"></View>
      </View>

      {/* Make this container flex-1 to ensure it fills available space */}

      {scannedInstances.length === 0 ? (
        <View className="h-full flex-1 items-center justify-center p-4">
          <Text className="text-center text-lg font-bold">{t('No books scanned')}</Text>
          <Text className="text-center">
            {t('Let start scan some book to change its status to in shelf or out of shelf')}
          </Text>
        </View>
      ) : (
        <ScrollView className="flex flex-1 flex-col gap-3 p-4">
          {scannedInstances.map((book) => (
            <ScannedBook
              key={book.barcode}
              book={book}
              onRemove={() => handleRemoveBook(book.barcode)}
            />
          ))}
        </ScrollView>
      )}

      <View className="px-4 pb-4">
        <Button disabled={fetchingBook} onPress={() => setScanning(true)}>
          <Text>{t('Scan barcode')}</Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default ChangeInstanceShelfStatus

function ScannedBook({ book, onRemove }: { book: BookByBarcode; onRemove: () => void }) {
  const { t } = useTranslation('ManagementToolsScreen')
  const [open, setOpen] = useState(false)

  const [status, setStatus] = useState(book.status)

  const { mutate: putOnShelf, isPending: puttingOnShelf } = usePutOnShelf()
  const { mutate: moveOutOfShelf, isPending: movingOutOfShelf } = useMoveOutOfShelf()

  const handlePutOnShelf = () => {
    putOnShelf(book.barcode, {
      onSuccess: (res) => {
        if (res.isSuccess) {
          setStatus(EBookCopyStatus.IN_SHELF)
          return
        }

        handleActionError(res)
      },
    })
  }

  const handleMoveOutOfShelf = () => {
    moveOutOfShelf(book.barcode, {
      onSuccess: (res) => {
        if (res.isSuccess) {
          setStatus(EBookCopyStatus.OUT_OF_SHELF)
          return
        }

        handleActionError(res)
      },
    })
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[80dvh] max-w-[90vw] overflow-y-auto">
          <BookCard libraryItem={book.libraryItem} modal />
        </DialogContent>
      </Dialog>
      <View className="flex flex-row rounded-[12px] border">
        <View className="flex flex-1 flex-col justify-between p-3">
          <View className="flex flex-row gap-4">
            <View className="shrink-0">
              <Image
                src={book.libraryItem.coverImage || '/placeholder.svg'}
                alt={book.libraryItem.title}
                width={200}
                height={300}
                className="aspect-[2/3] h-[80px] rounded-md border object-cover"
              />
            </View>
            <View className="flex flex-1 gap-y-1">
              <View className="flex flex-row items-start justify-between">
                <Text className="line-clamp-1 flex-1 text-sm font-bold">
                  {book.libraryItem.title}
                </Text>
              </View>

              <View className="mt-2 flex flex-row items-center justify-between gap-3">
                <Text className="text-sm text-muted-foreground">
                  {t('Barcode')}: {book.barcode}
                </Text>
                <View className="shrink-0">
                  <BookCopyStatusBadge status={status} />
                </View>
              </View>
            </View>
          </View>

          <View className="mt-3 flex flex-row flex-wrap gap-3">
            <Button
              onPress={() => setOpen(true)}
              size="sm"
              variant="outline"
              className="flex-1 flex-row"
            >
              <Eye className="mr-1 text-foreground" />
              <Text>{t('View details')}</Text>
            </Button>

            <Button onPress={onRemove} size="sm" variant="outline" className="flex-1 flex-row">
              <Trash2 className="mr-1 text-foreground" />
              <Text>{t('Remove')}</Text>
            </Button>
          </View>
          {(status === EBookCopyStatus.IN_SHELF || status === EBookCopyStatus.OUT_OF_SHELF) && (
            <Button
              disabled={puttingOnShelf || movingOutOfShelf}
              size="sm"
              variant="outline"
              className="mt-3 flex-row"
              onPress={() => {
                return status === EBookCopyStatus.IN_SHELF
                  ? handleMoveOutOfShelf()
                  : handlePutOnShelf()
              }}
            >
              {status === EBookCopyStatus.IN_SHELF ? (
                <MoveDown className="mr-1 text-foreground" />
              ) : (
                <MoveUp className="mr-1 text-foreground" />
              )}
              <Text>
                {t(status === EBookCopyStatus.IN_SHELF ? 'Remove on shelf' : 'Put on shelf')}
              </Text>

              {(puttingOnShelf || movingOutOfShelf) && (
                <Loader className="ml-1 size-6 animate-spin text-foreground" />
              )}
            </Button>
          )}
        </View>
      </View>
    </>
  )
}
