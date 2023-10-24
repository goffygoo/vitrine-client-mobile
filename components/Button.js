import { View, StyleSheet, Pressable, Text } from 'react-native'

export default function Button({ onPress, text }) {
    return (
        <View style={styles.container}>
            <Pressable style={styles.pressable} android_ripple={{ color: '#232323' }} onPress={() => onPress()}>
                <Text style={styles.text}>{text}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: 50,
        backgroundColor: '#121212',
    },
    pressable: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    text: {
        color: '#f2f2f2',
    }
})
