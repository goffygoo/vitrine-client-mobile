import { StyleSheet, View } from "react-native";

export default function Divider({ size }) {
    const height = {
        "s": 4,
        "m": 8,
        "l": 16,
        "xl": 32,
    }[size];

    return (
        <View style={[styles.container, {...(height && {height})}]}></View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 2,
        width: '100%',
    },
})