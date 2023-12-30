import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from "../../redux/settingReducer";
import { useMemo } from "react";
import colors from '../../colors.json';
import { Entypo } from '@expo/vector-icons';

export default function SpaceCard({ pageData, space, navigation }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    return (
        <Pressable
            style={styles.container}
            onPress={() => navigation.navigate("SpacePreview", {
                spaceId: pageData.id
            })}
            android_ripple={{ color: colors.AND_RIPPLE[theme], foreground: true }}
        >
            <View style={styles.main}>
                <Image
                    style={styles.image}
                    source={{
                        uri: pageData.banner
                    }}
                    resizeMode="cover"
                />
                <View style={styles.content}>
                    <View style={styles.heading}>
                        <Image
                            style={styles.providerImage}
                            source={{
                                uri: pageData.profileImg
                            }}
                            resizeMode="cover"
                        />
                        <Text style={styles.title}>{pageData.heading}</Text>
                    </View>
                    <Text style={styles.description}>
                        {pageData.subHeading}
                    </Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Subscribers
                    <Text style={styles.footerTextValue}>  {space.consumer}</Text>
                </Text>
                <Text style={styles.footerText}>
                    <Entypo name="dot-single" />
                </Text>
                <Text style={styles.footerText}>
                    Posts
                    <Text style={styles.footerTextValue}>  {space.streams}</Text>
                </Text>
                <Text style={styles.footerText}>
                    <Entypo name="dot-single" />
                </Text>
                <Text style={styles.footerText}>
                    Price
                    <Text style={[styles.footerTextValue, space.price === 0 && styles.footerTextValueEmphasis]}>  {space.price || "FREE"}</Text>
                </Text>
            </View>
        </Pressable>
    )
}

const generateStyles = THEME => StyleSheet.create({
    container: {
        width: '100%',
        padding: 8,
        backgroundColor: colors.BG_COLOR_MODAL[THEME],
        borderRadius: 4,
    },
    main: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        height: 80,
        width: 120,
        marginRight: 8,
        borderRadius: 4,
    },
    content: {
        flex: 1,
        height: '100%',
    },
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    providerImage: {
        height: 32,
        width: 32,
        borderRadius: 16,
    },
    title: {
        color: colors.TEXT_COLOR[THEME],
        paddingHorizontal: 12,
        fontSize: 16,
        fontWeight: '600',
    },
    description: {
        fontSize: 12,
        fontWeight: '300',
        paddingTop: 4,
        color: colors.TEXT_COLOR[THEME],
    },
    footer: {
        backgroundColor: colors.FADE[THEME],
        borderRadius: 2,
        width: '100%',
        marginTop: 8,
        paddingVertical: 4,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    footerText: {
        fontSize: 12,
        color: colors.TEXT_COLOR[THEME],
        fontWeight: '300',
    },
    footerTextValue: {
        fontSize: 12,
        color: colors.TEXT_COLOR_ALT[THEME],
        fontWeight: '500',
    },
    footerTextValueEmphasis: {
        color: colors.PRIMARY_COLOR,
        fontWeight: '600',
    }
})