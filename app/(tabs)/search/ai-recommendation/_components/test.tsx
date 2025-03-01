import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Text, View } from 'react-native'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { dummyBooks } from '~/components/home/dummy-books'
import { Button } from '~/components/ui/button'

const BookList = () => {
  const [selectedBookTitle, setSelectedBookTitle] = useState<string | null>(null)
  const sheetRef = useRef<BottomSheet>(null)

  const snapPoints = useMemo(() => ['25%', '50%', '80%'], [])

  const handleShowPreview = (title: string) => {
    setSelectedBookTitle(title)
    sheetRef.current?.snapToIndex(2) // Hiển thị BottomSheet
  }

  return (
    <View>
      {dummyBooks.map((book) => (
        <View key={book.id} style={{ marginBottom: 10 }}>
          <Text>{book.title}</Text>
          <Text>{book.author}</Text>
          <Button onPress={() => handleShowPreview(book.title)}>
            <Text>Show preview</Text>
          </Button>
        </View>
      ))}

      {/* Bottom Sheet */}
      <BottomSheet ref={sheetRef} snapPoints={snapPoints} enableDynamicSizing={false}>
        <BottomSheetView style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{selectedBookTitle}</Text>
        </BottomSheetView>
      </BottomSheet>
    </View>
  )
}

export default BookList
