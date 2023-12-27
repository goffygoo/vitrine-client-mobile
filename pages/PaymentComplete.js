import { Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from "../redux/settingReducer";
import colors from './../colors.json';
import { useMemo } from "react";

export default function PaymentComplete({ route, navigation }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    return (
        <View style={styles.container}>
            <Image style={styles.gif} source={require('../assets/success.gif')} />
            <Text style={styles.heading}>Great Success !!</Text>
            <Text style={styles.description}>Thank you for your purchase</Text>
        </View>
    )
}

const generateStyles = THEME => StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.BG_COLOR[THEME],
    },
    gif: {
        height: 144,
        width: 144,
        resizeMode: 'contain',
    },
    heading: {
        color: colors.TEXT_COLOR[THEME],
        fontSize: 24,
        marginTop: 48,
        fontWeight: '500',
    },
    description: {
        fontSize: 16,
        fontWeight: '300',
        textAlign: 'center',
        marginTop: 8,
        color: colors.TEXT_COLOR_LIGHT[THEME],
    },
})
