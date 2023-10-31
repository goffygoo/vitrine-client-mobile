import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { themeSelector, toggleTheme } from "../redux/settingReducer";

export default function TestPage({ route, navigation }) {
    const dispatch = useDispatch();
    const theme = useSelector(themeSelector);

    return (
        <View style={styles.container}>
            <Text>Test Page</Text>
            <Text>{theme} THEME</Text>
            <View style={{ height: '50%', justifyContent: 'space-evenly' }}>
                <Button text={"Home"} onPress={() => navigation.navigate('Home')} />
                <Button text={"Login Page"} onPress={() => navigation.navigate('LoginPage')} />
                <Button text={"Forget pass"} onPress={() => navigation.navigate('ForgetPasswordPage')} />
                <Button text={"Reset pass"} onPress={() => navigation.navigate('ResetPasswordPage')} />
                <Button text={"toggle theme"} onPress={() => dispatch(toggleTheme())} />
            </View>
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