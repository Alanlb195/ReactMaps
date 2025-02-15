import { PropsWithChildren, useEffect } from 'react'
import { AppState } from 'react-native'
import { usePermissionStore } from '../store/permissions/usePermissionStore'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../navigation/StackNavigator';

export const PermissionsChecker = ({ children }: PropsWithChildren) => {

    const { checkLocationPermission, locationStatus } = usePermissionStore();
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    useEffect(() => {
      if ( locationStatus === 'granted' ) {
        navigation.reset({
          index: 0,
          routes: [{name: 'MapScreen'}]
        })
      } else if ( locationStatus !== 'undetermined' ) {
        navigation.reset({
          index: 0,
          routes: [{
            name: 'PermissionsScreen'
          }]
        })
      }
    }, [locationStatus])
    

    useEffect(() => {
        checkLocationPermission();
    }, [])
    

    useEffect(() => {
      const subscription = AppState.addEventListener('change', (nextAppState) => {
        // console.log('AppState', nextAppState);

        if (nextAppState === 'active') {
            checkLocationPermission();
        }
      });
    
      return () => {
        subscription.remove();
      }
    }, [])
    


    return (
        <>
            {children}
        </>
    )
}
