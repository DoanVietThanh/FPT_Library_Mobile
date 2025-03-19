/* eslint-disable prettier/prettier */
import { useEffect, useRef, useState } from 'react'
import {
  IndoorRendererOptions,
  IndoorWidgetOptions,
  MapController,
  WoosmapView,
} from '@woosmap/react-native-woosmap'
import loader from '~/assets/icons/map-loading.gif'
import { useLocalSearchParams } from 'expo-router'

const indoorWidgetConfiguration: IndoorWidgetOptions = {
  units: 'metric', // Define the distance unit for route distance calculation
  ui: {
    primaryColor: '#147672',
    secondaryColor: '#751461',
  },
}

export default function MapScreen() {
  const mapRef = useRef<MapController>(null)
  const { ref } = useLocalSearchParams()
  const [mapLoaded, setMapLoaded] = useState(false)

  const indoorRendererConfiguration: IndoorRendererOptions = {
    defaultFloor: 1, //Render map with default floor
    centerMap: true,
    venue: 'intelligent_library_v2',
    responsive: 'mobile',
    highlightPOIByRef: (ref as string) || undefined,
  }

  useEffect(() => {
    if (!mapLoaded || !ref || !mapRef.current) return
    console.log('highlightFeatureByRef', { ref })
    mapRef.current.highlightFeatureByRef(ref as string)
  }, [ref, mapRef])

  return (
    <WoosmapView
      ref={mapRef}
      wooskey="woos-2861ec1d-05d1-3d4b-a4dd-1dfefe85769e"
      indoorRendererConfiguration={indoorRendererConfiguration}
      indoorWidgetConfiguration={indoorWidgetConfiguration}
      widget
      activateIndoorProduct
      i18nIsDynamicList
      defaultIndoorVenueKey="intelligent_library_v2"
      loader={loader}
      loaded={() => {
        console.log('loaded')
      }}
      indoor_venue_loaded={async (venue) => {
        console.log(JSON.stringify({ venue }))
        setMapLoaded(true)
      }}
      indoor_level_changed={(info) => {
        console.log('Level changed ' + JSON.stringify(info))
      }}
      indoor_feature_selected={(info) => {
        console.log('Feature selected ' + JSON.stringify(info))
      }}
      indoor_user_location={(info) => {
        console.log('User location ' + JSON.stringify(info))
      }}
      indoor_highlight_step={(info) => {
        console.log('Step info ' + JSON.stringify(info))
      }}
      indoor_navigation_started={() => {
        console.log('Navigation Started')
      }}
      indoor_navigation_exited={() => {
        console.log('Navigation ended')
        mapRef.current?.clearDirections()
      }}
    />
  )
}
