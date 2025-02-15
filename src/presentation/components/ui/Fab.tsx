import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';


interface Props {
    iconName: string;
    style?: StyleProp<ViewStyle>;
    onPress: () => void;
}


export const Fab = ({ iconName, onPress, style }: Props) => {
    return (
        <View style={[styles.btn, style]}>

            <Pressable onPress={ onPress}>
                <Icon name={ iconName } size={30} color="white" />
            </Pressable>

        </View>
    )
}


const styles = StyleSheet.create({
    btn: {
        zIndex: 1,
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 0.27,
            width: 4.5
        }
    }
})