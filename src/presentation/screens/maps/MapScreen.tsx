import { StyleSheet, View } from "react-native"
import { Map } from "../../components/maps/Map"
import { useLocationStore } from "../../store/locations/useLocationStore"
import { LoadingScreen } from "../loading/LoadingScreen"
import { useEffect } from "react"

export const MapScreen = () => {

  const { lastKnownLocation, getLocation } = useLocationStore();

  useEffect(() => {
    if (lastKnownLocation === null) {
      getLocation();
    }
  }, [])
  


  if (lastKnownLocation === null) {
    return <LoadingScreen />
  }


  return (
      <View style={{ ...style.container }}>
        <Map
          initialLocation={ lastKnownLocation }
        />
      </View>
  )
}


const style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  }
})