import { Image, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { themeSelector } from "../redux/settingReducer";
import colors from './../colors.json';
import { useEffect, useMemo } from "react";
import { getSecureItem, getItem } from "../util/storage";
import {
    setAccessToken,
    setDataToken,
    setEmail,
    setProfileId,
    setRefreshToken,
    setType,
    setUserId,
} from "../redux/authReducer";
import { SECURE_STORAGE_KEY, STORAGE_KEY } from "../constants";

let loading = true;
let redirectInstantly = false;
let isLoggedIn = false;

export default function BrandPage({ route, navigation }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);
    const dispatch = useDispatch();

    const initAppData = async () => {
        loading = true;
        try {
            const accessToken = await getSecureItem(SECURE_STORAGE_KEY.ACCESS_TOKEN);
            const dataToken = await getItem(STORAGE_KEY.DATA_TOKEN);
            const refreshToken = await getSecureItem(SECURE_STORAGE_KEY.REFRESH_TOKEN);
            const userId = await getItem(STORAGE_KEY.USER_ID);
            const profileId = await getItem(STORAGE_KEY.PROFILE_ID);
            const type = await getItem(STORAGE_KEY.TYPE);
            const email = await getItem(STORAGE_KEY.EMAIL);

            if (accessToken) isLoggedIn = true;

            if (accessToken) dispatch(setAccessToken(accessToken));
            if (dataToken) dispatch(setDataToken(dataToken));
            if (refreshToken) dispatch(setRefreshToken(refreshToken));
            if (userId) dispatch(setUserId(userId));
            if (profileId) dispatch(setProfileId(profileId));
            if (type) dispatch(setType(type));
            if (email) dispatch(setEmail(email));
        } catch (err) { }
        if (redirectInstantly) redirect();
        loading = false;
    }

    const redirect = () => {
        navigation.reset({
            index: 0,
            routes: [
                { name: isLoggedIn ? 'Home' : 'LoginPage' },
            ],
        });
    }

    useEffect(() => {
        initAppData()
        setTimeout(() => {
            if (loading) {
                redirectInstantly = true;
            } else {
                redirect();
            }
        }, 1000)
    }, [])

    return (
        <View style={styles.container} >
            <Image
                source={require('../assets/Logo.png')}
                style={styles.image}
                resizeMode="cover"
            />
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
    image: {
        height: 128,
        width: 128
    }
})