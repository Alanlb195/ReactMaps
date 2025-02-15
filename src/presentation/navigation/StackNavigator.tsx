import { createStackNavigator } from '@react-navigation/stack';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { MapScreen } from '../screens/maps/MapScreen';
import { PermissionsScreen } from '../screens/permissions/PermissionsScreen';


export type RootStackParams = {
    LoadingScreen: undefined;
    MapScreen: undefined;
    PermissionsScreen: undefined;
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
        initialRouteName='LoadingScreen'
        // initialRouteName='PermissionsScreen'
        screenOptions={{
            animation: 'slide_from_right',
            headerShown: false,
            cardStyle: {
                backgroundColor: 'white',
            }
        }}
    >
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
    </Stack.Navigator>
  );
}