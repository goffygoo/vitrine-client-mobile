import { StyleSheet, Text, View } from "react-native";

export default function CalendarPage({ route, navigation }) {
    return (
        <View style={styles.container}>
            <Text>Calendar Page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
})