import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { themeSelector, toggleTheme } from "../redux/settingReducer";

export default function SignupPage({ route, navigation }) {
    const dispatch = useDispatch();
    const theme = useSelector(themeSelector);

    return (
        <View style={styles.container}>
            <Text>Signup Page</Text>
            <Text>{theme}</Text>
            <Button text={"Click"} onPress={() => navigation.navigate('LoginPage')} />
            <Button text={"Toggle"} onPress={() => dispatch(toggleTheme())} />
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