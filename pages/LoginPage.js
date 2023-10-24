import { Dimensions, NativeModules, Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from "../redux/settingReducer";
import colors from './../colors.json';
import GoogleLogin from "../components/buttons/GoogleLogin";
import { useMemo, useState } from "react";
import TextInputBox from "../components/inputs/TextInputBox";
import { AntDesign } from "@expo/vector-icons";

const { StatusBarManager: { HEIGHT: statusBarHeight } } = NativeModules;
const windowHeight = Dimensions.get('window').height;

export default function LoginPage({ route, navigation }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.overlay}>
                <GoogleLogin />
                <View style={styles.inputColumn}>
                    <TextInputBox label={"Email"} value={email} placeholder={'Email goes here'} onChange={e => setEmail(e)} />
                    <TextInputBox label={"Password"} value={password} placeholder={'Enter your password'} onChange={e => setPassword(e)} secureTextEntry />
                </View>
                <View style={styles.actionRow}>
                    <Text style={styles.primaryText}>Login</Text>
                    <View style={styles.primaryButton}>
                        <Pressable
                            style={styles.primaryButtonInner}
                            android_ripple={{ color: colors.PRIMARY_COLOR_LIGHT }}
                        >
                            <AntDesign name="arrowright" size={40} color={colors.BG_COLOR[theme]} />
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable
                    style={styles.buttonContainerPressable}
                    onPress={() => navigation.navigate('SignupPage')}
                >
                    <Text style={styles.buttonContainerText}>Create an Account</Text>
                </Pressable>
            </View>
        </View>
    )
}

const generateStyles = THEME => StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.PRIMARY_COLOR,

    },
    overlay: {
        height: windowHeight * 0.8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomStartRadius: 200,
        zIndex: 2,
        elevation: 5,
        backgroundColor: colors.BG_COLOR[THEME],
    },
    inputColumn: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 16,
    },
    buttonContainer: {
        height: windowHeight * 0.2,
        width: '100%',
        backgroundColor: colors.PRIMARY_COLOR,
    },
    buttonContainerPressable: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    buttonContainerText: {
        marginBottom: 48,
        fontSize: 24,
        fontWeight: '600',
        color: colors.BG_COLOR[THEME],
    },
    actionRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryText: {
        fontSize: 48,
        fontWeight: '600',
        marginRight: 32,
        color: colors.PRIMARY_COLOR,
    },
    primaryButton: {
        height: 64,
        width: 64,
        backgroundColor: colors.PRIMARY_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 64,
        overflow: 'hidden',
    },
    primaryButtonInner: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})