import { ActivityIndicator, StyleSheet, View } from "react-native"
import { Map } from "../../components/maps/Map"
import { getCurrentLocation } from "../../../actions/location/location"
import { useLocationStore } from "../../store/locations/useLocationStore"
import { LoadingScreen } from "../loading/LoadingScreen"
import { useEffect } from "react"
import { Fab } from "../../components/ui/Fab"


export const MapScreen = () => {

  const { lastKnowLocation, getLocation } = useLocationStore();

  useEffect(() => {
    if (lastKnowLocation === null) {
      getLocation();
    }
  }, [])
  


  if (lastKnowLocation === null) {
    return <LoadingScreen />
  }


  return (
    <>
      <View style={{ ...style.container }}>
        <Map
          initialLocation={ lastKnowLocation }
        />
      </View>

      <Fab iconName="locate-outline" onPress={ () => console.log('Hola') } style={{ bottom: 50, right: 50 }} />
    </>
  )
}


const style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  }
})