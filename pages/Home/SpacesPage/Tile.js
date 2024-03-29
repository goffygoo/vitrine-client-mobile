import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../../redux/settingReducer';
import { useMemo } from 'react';
import colors from '../../../colors.json';
import { getFileUrl } from '../../../util/helper';

export default function Tile({ onClick, ...space }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    const {
        _id,
        coverPicture,
        displayPicture,
        title,
        description,
    } = space;

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.pressable}
                android_ripple={{ color: colors.AND_RIPPLE[theme], foreground: true }}
                onPress={onClick}
            >
                <Image
                    style={styles.bannerImage}
                    source={{
                        uri: getFileUrl(coverPicture)
                    }}
                    resizeMode='cover'
                />
                <View style={styles.profileImageContainer}>
                    <Image
                        style={styles.profileImage}
                        source={{
                            uri: getFileUrl(displayPicture)
                        }}
                        resizeMode='contain' />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.heading}>{title}</Text>
                    <Text style={styles.subHeading}>{description}</Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}><Text style={styles.footerTextEmphasis}>7</Text> new messages</Text>
                </View>
            </Pressable>
        </View>
    )
}

const generateStyles = THEME => StyleSheet.create({
    container: {
        width: '45%',
        backgroundColor: 'red',
        backgroundColor: colors.BG_COLOR_MODAL[THEME],
        borderRadius: 8,
        elevation: 4,
        shadowColor: colors.TEXT_COLOR[THEME],
        overflow: 'hidden',
    },
    pressable: {
        flex: 1,
    },
    bannerImage: {
        height: 64,
        width: '100%',
    },
    profileImageContainer: {
        backgroundColor: 'green',
        alignItems: 'flex-end',
        justifyContent: 'center',
        borderRadius: 2,
        borderColor: colors.SHADE_1,
        height: 0,
    },
    profileImage: {
        height: 64,
        width: 64,
        marginRight: 16,
        borderRadius: 200,
        borderWidth: 2,
        borderColor: colors.SHADE_1,
    },
    infoContainer: {
        marginTop: 32,
        padding: 8,
        width: '100%',
    },
    heading: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.TEXT_COLOR[THEME],
    },
    subHeading: {
        marginTop: 4,
        fontSize: 14,
        fontWeight: '400',
        color: colors.TEXT_COLOR[THEME],
    },
    footer: {
        height: 32,
        width: '100%',
        backgroundColor: colors.BG_COLOR_SECONDARY[THEME],
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerText: {
        color: colors.TEXT_COLOR[THEME],
        fontSize: 12,
        fontWeight: '300',
    },
    footerTextEmphasis: {
        fontWeight: '600',
    }
})