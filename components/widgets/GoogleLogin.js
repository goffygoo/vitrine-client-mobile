import { View, StyleSheet, Pressable, Text, Image } from 'react-native';
import colors from '../../colors.json';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { themeSelector } from '../../redux/settingReducer';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';


GoogleSignin.configure({
    webClientId: '719286156722-bs49veig3nkf65n7eel8jalb1j10taue.apps.googleusercontent.com',
    offlineAccess: true,
});

export default function GoogleLogin({size}) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);
    const width = useMemo(() => {
        return {
            "expand": '100%'
        }[size];
    }, [size]);


    const signIn = async () => {
        try {
            await signOut();
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log({ userInfo });
        } catch (error) {
            console.log(JSON.stringify(error, null, 2));
            //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            //     // user cancelled the login flow
            //   } else if (error.code === statusCodes.IN_PROGRESS) {
            //     // operation (e.g. sign in) is in progress already
            //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            //     // play services not available or outdated
            //   } else {
            //     // some other error happened
            //   }
        }
    };

    const signOut = async () => {
        await GoogleSignin.signOut();
    }

    return (
        <View style={[styles.container, {...(width && {width})}]}>
            <Pressable style={styles.pressable} android_ripple={{ color: colors.BG_COLOR_SECONDARY[theme] }} onPress={signIn}>
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
        paddingHorizontal: 16,
        borderColor: colors.TEXT_COLOR[THEME],
    },
    pressable: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
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