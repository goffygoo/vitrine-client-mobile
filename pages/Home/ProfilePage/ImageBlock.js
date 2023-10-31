import { Image, ImageBackground, Pressable, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from '../../../redux/settingReducer';
import { useMemo } from "react";
import colors from '../../../colors.json';
import GlassButton from "../../../components/widgets/buttons/GlassButton";

export default function ImageBlock() {
    const theme = useSelector(themeSelector)
    const styles = useMemo(() => generateStyles(theme), [theme]);

    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <ImageBackground
                    source={require('../../../assets/profileCover.jpg')}
                    style={styles.bannerImage}
                    resizeMode="cover"
                >
                    <GlassButton
                        text={"Change Banner"}
                        onClick={() => undefined}
                        height={24}
                        fontSize={12}
                    />
                </ImageBackground>
            </View>
            <View style={styles.profileImageContainer}>
                <Pressable
                    android_ripple={{ color: colors.AND_RIPPLE[theme], foreground: true }}
                    onPress={() => undefined}
                >
                    <Image
                        source={require('../../../assets/avatar_a.jpg')}
                        style={styles.profileImage}
                    />
                </Pressable>
            </View>
        </View>
    )
}

const generateStyles = THEME => StyleSheet.create({
    container: {
        width: '90%',
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
        alignItems: 'flex-end',
        paddingRight: 8,
        paddingTop: 8,
        justifyContent: 'flex-start',
    },
    profileImageContainer: {
        height: 100,
        width: 100,
        borderRadius: 100,
        marginTop: -50,
        borderColor: colors.SHADE_1,
        borderWidth: 2,
        overflow: 'hidden',
    },
    profileImage: {
        height: 100,
        width: 100,
        resizeMode: 'cover',
    },
})