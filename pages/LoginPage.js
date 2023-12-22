import { Dimensions, NativeModules, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { themeSelector } from "../redux/settingReducer";
import colors from './../colors.json';
import GoogleLogin from "../components/widgets/GoogleLogin";
import { useMemo, useState } from "react";
import TextInputBox from "../components/widgets/input/TextInputBox";
import { AntDesign } from "@expo/vector-icons";
import Divider from "../components/widgets/Divider";
import { auth_request } from "../util/service";
import { showToast } from "../components/widgets/Toast";
import { DEVICE, SECURE_STORAGE_KEY, STORAGE_KEY } from "../constants";
import { getItem, setItem, setSecureItem } from "../util/storage";
import {
    setAccessToken,
    setDataToken,
    setEmail,
    setProfileId,
    setRefreshToken,
    setType,
    setUserId,
} from "../redux/authReducer";

const { StatusBarManager: { HEIGHT: statusBarHeight } } = NativeModules;
const windowHeight = Dimensions.get('window').height;

export default function LoginPage({ route, navigation }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    const [email, setEmailState] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const handleLogin = async () => {
        const fcmToken = await getItem(STORAGE_KEY.FCM_TOKEN);
        auth_request(
            'post',
            '/api/auth/user/login',
            {
                email,
                password,
                device: DEVICE.ANDROID,
                fcmToken
            },
            async ({ data }) => {
                const {
                    userId,
                    accessToken,
                    dataToken,
                    profileId,
                    refreshToken,
                    type,
                    email
                } = data;
                try {
                    if (accessToken) {
                        await setSecureItem(SECURE_STORAGE_KEY.ACCESS_TOKEN, accessToken);
                        dispatch(setAccessToken(accessToken));
                    };
                    if (dataToken) {
                        await setItem(STORAGE_KEY.DATA_TOKEN, dataToken);
                        dispatch(setDataToken(dataToken));
                    };
                    if (refreshToken) {
                        await setSecureItem(SECURE_STORAGE_KEY.REFRESH_TOKEN, refreshToken);
                        dispatch(setRefreshToken(refreshToken));
                    };
                    if (userId) {
                        await setItem(STORAGE_KEY.USER_ID, userId);
                        dispatch(setUserId(userId));
                    };
                    if (profileId) {
                        await setItem(STORAGE_KEY.PROFILE_ID, profileId);
                        dispatch(setProfileId(profileId));
                    };
                    if (type) {
                        await setItem(STORAGE_KEY.TYPE, type);
                        dispatch(setType(type));
                    };
                    if (email) {
                        await setItem(STORAGE_KEY.EMAIL, email);
                        dispatch(setEmail(email));
                    };
                } catch (e) { }
                navigation.reset({
                    index: 0,
                    routes: [
                        { name: 'Home' },
                    ],
                });
            },
            () => {
                showToast("Invalid Credentials")
            }
        )
    }

    return (
        <View style={styles.container} >
            <View style={styles.overlay} >
                <GoogleLogin size={'expand'} />
                <View style={styles.inputColumn}>
                    <Divider size={'m'} />
                    <TextInputBox label={"Email"} value={email} placeholder={'Email goes here'} onChange={e => setEmailState(e)} size={'expand'} />
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
                            onPress={handleLogin}
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