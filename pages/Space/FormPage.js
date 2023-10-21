import { StyleSheet, Text, View } from "react-native";
import Button from "../../components/Button";

export default function FormPage({ route, navigation }) {
    return (
        <View style={styles.container}>
            <Text>Form Page</Text>
            <Button text={"Click"} onPress={() => navigation.navigate('TestPage')} />
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