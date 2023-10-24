import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '719286156722-bs49veig3nkf65n7eel8jalb1j10taue.apps.googleusercontent.com',
    offlineAccess: true,
});

export default function LoginPage({ route, navigation }) {
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
        <View style={styles.container}>
            <Text>Login Page</Text>
            <Button text={"Click"} onPress={() => navigation.navigate('SignupPage')} />
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={signIn}
                disabled={false}
            />
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