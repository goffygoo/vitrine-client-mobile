import { Dimensions, NativeModules, Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from "../redux/settingReducer";
import colors from './../colors.json';
import GoogleLogin from "../components/widgets/GoogleLogin";
import { useMemo, useState } from "react";
import TextInputBox from "../components/widgets/input/TextInputBox";
import { AntDesign } from "@expo/vector-icons";
import Divider from "../components/widgets/Divider";

const { StatusBarManager: { HEIGHT: statusBarHeight } } = NativeModules;
const windowHeight = Dimensions.get('window').height;

export default function LoginPage({ route, navigation }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container} >
            <View style={styles.overlay} >
                <GoogleLogin size={'expand'} />
                <View style={styles.inputColumn}>
                    <Divider size={'m'} />
                    <TextInputBox label={"Email"} value={email} placeholder={'Email goes here'} onChange={e => setEmail(e)} size={'expand'} />
                    <Divider size={'m'} />
                    <TextInputBox label={"Password"} value={password} placeholder={'Enter your password'} onChange={e => setPassword(e)} size={'expand'} secureTextEntry />
                    <Divider size={'m'} />
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
                    android_ripple={{ color: colors.PRIMARY_COLOR_LIGHT }}
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
        paddingHorizontal: '15%',
        borderBottomStartRadius: 200,
        zIndex: 2,
        elevation: 5,
        backgroundColor: colors.BG_COLOR[THEME],
    },
    inputColumn: {
        width: '100%',
        marginVertical: 16,
    },
    buttonContainer: {
        height: windowHeight * 0.5,
        width: '100%',
        marginTop: -300,
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