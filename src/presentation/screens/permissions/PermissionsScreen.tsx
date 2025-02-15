import { Pressable, Text, View } from 'react-native'
import { globalStyles } from '../../../config/theme/styles'
import { usePermissionStore } from '../../store/permissions/usePermissionStore'

export const PermissionsScreen = () => {

  const { locationStatus, requestLocationPermission } = usePermissionStore();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        
        <Text>Location permissions</Text>

        <Pressable
          onPress={ () => requestLocationPermission() }
          style={{
            ...globalStyles.btnPrimary
          }}
        >
          <Text style={{ color: 'white' }}>Enable localization</Text>
        </Pressable>

        <Text>Actual status: { locationStatus }</Text>

    </View>
  )
}
