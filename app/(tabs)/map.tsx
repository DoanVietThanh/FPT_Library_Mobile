/* eslint-disable prettier/prettier */
import { useEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import {
  IndoorRendererOptions,
  IndoorWidgetOptions,
  MapController,
  WoosmapView,
} from '@woosmap/react-native-woosmap'
import loader from '~/assets/icons/map-loading.gif'
import { useLocalSearchParams } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import WebView from 'react-native-webview'

const indoorWidgetConfiguration: IndoorWidgetOptions = {
  units: 'metric', // Define the distance unit for route distance calculation
  ui: {
    primaryColor: '#147672',
    secondaryColor: '#751461',
  },
}

export default function MapScreen() {
  const { ref } = useLocalSearchParams()
  const {
    i18n: { language },
  } = useTranslation()
  // const mapRef = useRef<MapController>(null)
  // const [mapLoaded, setMapLoaded] = useState(false)

  // const indoorRendererConfiguration: IndoorRendererOptions = {
  //   defaultFloor: 1, //Render map with default floor
  //   centerMap: true,
  //   venue: 'intelligent_library_v2',
  //   responsive: 'mobile',
  //   highlightPOIByRef: (ref as string) || undefined,
  // }

  // useEffect(() => {
  //   if (!mapLoaded || !ref || !mapRef.current) return

  //   const handleChangeRef = async () => {
  //     await mapRef.current!.highlightFeatureByRef(ref as string)
  //     await mapRef.current!.setZoom(2)
  //   }

  //   handleChangeRef()
  // }, [ref, mapRef])

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      bounces={false}
      scrollEnabled={false}
      overScrollMode="never"
      automaticallyAdjustContentInsets={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <WebView
        source={{
          uri: `https://elibrary-capstone.vercel.app/vi/full-map?${ref ? `ref=${ref}` : ''}&responsive=mobile`,
        }}
        className="flex-0 h-screen-safe w-[100dvh]"
        scrollEnabled={false} // Tắt scroll
        bounces={false} // Tắt bounce trên iOS
        overScrollMode="never" // Tắt overscroll trên Android
        scalesPageToFit={false} // Ngăn tự động điều chỉnh tỷ lệ
        automaticallyAdjustContentInsets={false} // Ngăn điều chỉnh nội dung khi có bàn phím
        showsVerticalScrollIndicator={false} // Ẩn thanh cuộn
        showsHorizontalScrollIndicator={false}
        javaScriptEnabled={true}
        domStorageEnabled={true} // Đảm bảo JS hoạt động đầy đủ
        injectedJavaScript={`
                // Chèn meta viewport để cố định tỷ lệ và tắt zoom
                const meta = document.createElement('meta');
                meta.setAttribute('name', 'viewport');
                meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
                document.getElementsByTagName('head')[0].appendChild(meta);
      
                // Tắt scroll và zoom bằng CSS
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
                document.body.style.height = '100%';
                document.documentElement.style.overflow = 'hidden';
      
                // Ngăn sự kiện zoom từ touch
                document.addEventListener('touchmove', function (event) {
                  if (event.scale !== 1) { event.preventDefault(); }
                }, { passive: false });
              `}
      />
    </ScrollView>

    //   </View>
    // </SafeAreaView>
  )
}
