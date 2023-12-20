import { View, StyleSheet, Pressable, Text, Image } from 'react-native';
import colors from '../../colors.json';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { themeSelector } from '../../redux/settingReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { showToast } from './Toast';
import { auth_request } from '../../util/service';
import { DEVICE, SECURE_STORAGE_KEY, STORAGE_KEY } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import {
    setAccessToken,
    setDataToken,
    setEmail,
    setProfileId,
    setRefreshToken,
    setType,
    setUserId,
} from '../../redux/authReducer';
import { setItem, setSecureItem } from '../../util/storage';

GoogleSignin.configure({
    webClientId: '719286156722-bs49veig3nkf65n7eel8jalb1j10taue.apps.googleusercontent.com',
    offlineAccess: true,
});

export default function GoogleLogin({ size }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);
    const width = useMemo(() => {
        return {
            "expand": '100%'
        }[size];
    }, [size]);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const signOut = async () => {
        await GoogleSignin.signOut();
    }

    const signIn = async () => {
        try {
            await signOut();
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const code = userInfo.serverAuthCode;
            auth_request(
                'post',
                '/api/auth/user/googleLogin',
                {
                    code,
                    device: DEVICE.ANDROID,
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
                    showToast("Something went wrong");
                }
            )

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                showToast("Login cancelled");
            } else if (error.code === statusCodes.IN_PROGRESS) {
                showToast("Login already in progress");
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                showToast("Please update your Google Play Services");
            } else {
                showToast("Something went wrong");
            }
        }
    };

    return (
        <View style={[styles.container, { ...(width && { width }) }]}>
            <Pressable style={[styles.pressable, { ...(width && { width }) }]} android_ripple={{ color: colors.BG_COLOR_SECONDARY[theme] }} onPress={signIn}>
                <Image style={styles.googleLogo} source={require('../../assets/Google_Logo.png')} />
                <Text style={styles.text}>Login With Google</Text>
            </Pressable>
        </View>
    )
}


const generateStyles = THEME => StyleSheet.create({
    container: {
        height: 50,
        width: 250,
        backgroundColor: colors.BG_COLOR_SHARP[THEME],
        borderWidth: 1,
        borderRadius: 4,
        overflow: 'hidden',
        borderColor: colors.TEXT_COLOR[THEME],
    },
    pressable: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 16,
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    text: {
        color: colors.TEXT_COLOR[THEME],
        fontSize: 16,
        fontWeight: '500',

    },
    googleLogo: {
        height: 25,
        width: 25,
    }
})