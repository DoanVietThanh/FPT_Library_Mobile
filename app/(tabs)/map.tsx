/* eslint-disable prettier/prettier */
import { useRef } from 'react'
import {
  IndoorRendererOptions,
  IndoorWidgetOptions,
  MapController,
  WoosmapView,
} from '@woosmap/react-native-woosmap'
import { Text } from '~/components/ui/text'

const indoorRendererConfiguration: IndoorRendererOptions = {
  defaultFloor: 0, //Render map with default floor
  centerMap: true,
  venue: 'fpt_library',
  responsive: 'mobile',
}
const indoorWidgetConfiguration: IndoorWidgetOptions = {
  units: 'metric', // Define the distance unit for route distance calculation
}

export default function MapScreen() {
  const mapRef = useRef<MapController>(null)

  console.log('MapScreen')

  return (
    <>
      <Text>Hello</Text>
      <WoosmapView
        ref={mapRef}
        wooskey="woos-2861ec1d-05d1-3d4b-a4dd-1dfefe85769e"
        indoorRendererConfiguration={indoorRendererConfiguration}
        indoorWidgetConfiguration={indoorWidgetConfiguration}
        widget
        activateIndoorProduct
        defaultIndoorVenueKey="fpt_library"
        loaded={() => {
          console.log('loaded')
        }}
        indoor_venue_loaded={async (venue) => {
          console.log(JSON.stringify({ venue }))
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
    </>
  )
}
