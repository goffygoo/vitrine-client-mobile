import { Dimensions, Image, NativeModules, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from "../redux/settingReducer";
import colors from './../colors.json';
import { useMemo, useState } from "react";
import PrimaryButton from "../components/widgets/buttons/PrimaryButton";
import TextInputBox from "../components/widgets/input/TextInputBox";
import Divider from "../components/widgets/Divider";

const { StatusBarManager: { HEIGHT: statusBarHeight } } = NativeModules;
const windowHeight = Dimensions.get('window').height;

export default function ResetPasswordPage({ route, navigation }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    return (
        <View style={styles.container}>
            <View style={styles.modal}>
                <Image style={styles.lockLogo} source={require('../assets/lock.png')} />
                <Text style={styles.heading}>Reset Password</Text>
                <Text style={styles.description}>Please enter the new password which you would like to set</Text>
                <TextInputBox
                    value={password}
                    onChange={e => setPassword(e)}
                    placeholder={'new password'}
                    type={'light'}
                    size={'expand'}
                    secureTextEntry
                />
                <TextInputBox
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e)}
                    placeholder={'confirm password'}
                    type={'light'}
                    size={'expand'}
                    secureTextEntry
                />
                <Divider size={'m'} />
                <PrimaryButton
                    text={'Reset Password'}
                    onPress={() => undefined}
                    size={'expand'}
                />
            </View>
        </View>
    )
}

const generateStyles = THEME => StyleSheet.create({
    container: {
        flex: 1,
        height: windowHeight,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.BG_COLOR[THEME],
    },
    modal: {
        height: windowHeight * 0.64,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8%',
        backgroundColor: colors.BG_COLOR_MODAL[THEME],
        elevation: 5,
        borderRadius: 8,
    },
    lockLogo: {
        height: 96,
        width: 96,
        resizeMode: 'contain',
    },
    heading: {
        color: colors.TEXT_COLOR[THEME],
        fontSize: 28,
        marginVertical: 32,
        fontWeight: '600',
    },
    description: {
        textAlign: 'center',
        color: colors.TEXT_COLOR_LIGHT[THEME],
        marginBottom: 32,
    },
})
