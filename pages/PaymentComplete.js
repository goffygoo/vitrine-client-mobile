import { Image, StyleSheet, Text, View, BackHandler, Alert } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from "../redux/settingReducer";
import colors from './../colors.json';
import { useMemo, useEffect } from "react";
import { showToast } from "../components/widgets/Toast";


export default function PaymentComplete({ route, navigation }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    useEffect(() => {
        const backAction = () => {
            showToast('Please wait')
          return true;
        };
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );
        return () => backHandler.remove();
      }, []);

    useEffect(() => {
        setTimeout(() => {
            navigation.reset({
                index: 1,
                routes: [
                    {
                        name: 'Home',
                        params: {
                            screen: 'LandingPage'
                        }
                    },
                    {
                        name: 'Home',
                        params: {
                            screen: 'SpacesPage'
                        }
                    },
                ],
            })
        }, 5000);
    }, [])

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
