import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Platform } from 'react-native'
import { Location } from '../../../infrastructure/interfaces/location.interface';
import { useRef } from 'react';


interface Props {
    showsUserLocation?: boolean;
    initialLocation: Location;
}

export const Map = ({ showsUserLocation = true, initialLocation }: Props) => {

    const mapRef = useRef<MapView|null>();

    return (
        <>
            <MapView
                ref={ (map) => mapRef.current = map}
                showsUserLocation={showsUserLocation}
                provider={Platform.OS === 'ios' ? undefined : PROVIDER_GOOGLE} // remove if not using Google Maps
                style={{ flex: 1 }}
                region={{
                    latitude: initialLocation.latitude,
                    longitude: initialLocation.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121
                }}
            >
                {/* <Marker
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324
                    }}
                    title='Hola'
                    description='Este en un hola a usar los mapas en React Native, Welcome! :)'
                    image={ require('../../../assets/custom-marker.png') }
                /> */}

            </MapView>
        </>
    )
}