import { Image, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from '../../redux/settingReducer';
import { useMemo } from "react";
import colors from '../../colors.json';

export default function ImageBlock() {
    const theme = useSelector(themeSelector)
    const styles = useMemo(() => generateStyles(theme), [theme]);
    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <Image
                    source={require('../../assets/profileCover.jpg')}
                    style={styles.bannerImage}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.profileImageContainer}>
                <Image
                    source={require('../../assets/avatar_a.jpg')}
                    style={styles.profileImage}
                />
            </View>
        </View >
    )
}

const generateStyles = THEME => StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    banner: {
        height: 126,
        width: '100%',
        borderRadius: 8,
        overflow: "hidden",
    },
    bannerImage: {
        height: 126,
        width: '100%',
    },
    profileImageContainer: {
        height: 100,
        width: 100,
        borderRadius: 100,
        marginTop: -50,
        borderColor: colors.FADE[THEME],
        borderWidth: 2,
        overflow: 'hidden',
    },
    profileImage: {
        height: 100,
        width: 100,
        resizeMode: 'cover',
    },
})