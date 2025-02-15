import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { Platform } from 'react-native'
import { Location } from '../../../infrastructure/interfaces/location.interface';
import { useEffect, useRef, useState } from 'react';
import { useLocationStore } from '../../store/locations/useLocationStore';
import { Fab } from '../ui/Fab';


interface Props {
    showsUserLocation?: boolean;
    initialLocation: Location;
}

export const Map = ({ showsUserLocation = true, initialLocation }: Props) => {

    const mapRef = useRef<MapView | null>();
    const { getLocation, lastKnownLocation, watchLocation, clearWatchLocation, userLocationList } = useLocationStore();
    const camaraLocation = useRef<Location>(initialLocation);
    const [isFollowingUser, setIsFollowingUser] = useState(true);
    const [isShowingPolilyne, setIsShowingPolilyne] = useState(true);

    const moveCameraToLocation = (location: Location) => {

        if (!mapRef.current) return;

        mapRef.current.animateCamera({ center: location })
    }

    useEffect(() => {
        watchLocation();

        return () => {
            clearWatchLocation();
        }
    }, [])

    useEffect(() => {
        if (lastKnownLocation && isFollowingUser) {
            moveCameraToLocation(lastKnownLocation);
        }
    }, [lastKnownLocation, isFollowingUser])



    const getCurrentLocation = async () => {
        const location = await getLocation();
        if (!location) return;
        moveCameraToLocation(location);
    }

    return (
        <>
            <MapView
                ref={(map) => mapRef.current = map}
                showsUserLocation={showsUserLocation}
                provider={Platform.OS === 'ios' ? undefined : PROVIDER_GOOGLE} // remove if not using Google Maps
                style={{ flex: 1 }}
                region={{
                    latitude: camaraLocation.current.latitude,
                    longitude: camaraLocation.current.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121
                }}
                onTouchStart={() => setIsFollowingUser(false)}
            >

                {
                    isShowingPolilyne && (
                        <Polyline
                            coordinates={userLocationList}
                            strokeWidth={8}
                            strokeColors={[
                                'red',
                                'green',
                                'yellow'
                            ]}
                        />
                    )
                }

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

            <Fab
                iconName={isShowingPolilyne ? "eye-outline" : "eye-off-outline"}
                onPress={() => setIsShowingPolilyne(!isShowingPolilyne)}
                style={{
                    bottom: 190, right: 20
                }}
            />

            <Fab
                iconName={isFollowingUser ? "walk-outline" : "accessibility-outline"}
                onPress={() => setIsFollowingUser(!isFollowingUser)}
                style={{
                    bottom: 120, right: 20
                }}
            />


            <Fab
                iconName="compass-outline"
                onPress={getCurrentLocation}
                style={{
                    bottom: 50, right: 20
                }}
            />


        </>
    )
}