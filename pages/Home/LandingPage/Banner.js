import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../../redux/settingReducer';
import { useMemo } from 'react';
import colors from '../../../colors.json';

export default function Banner() {
    const theme = useSelector(themeSelector)
    const styles = useMemo(() => generateStyles(theme), [theme]);

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.pressable}
                android_ripple={{ color: colors.AND_RIPPLE[theme], foreground: true }}
            >
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../../../assets/EventCover.png')} />
                </View>
                <View style={styles.description}>
                    <View style={styles.descriptionDateTime}>
                        <View style={styles.descriptionDateTimeInner}>
                            <Text style={styles.descriptionDate}>25 Oct</Text>
                            <Text style={styles.descriptionTime}>7:00 pm</Text>
                        </View>
                    </View>
                    <View style={styles.descriptionDivider} />
                    <View style={styles.descriptionName}>
                        <View style={styles.descriptionNameInner}>
                            <Text style={styles.descriptionHeading}>Art Fest City of Harrisburgh</Text>
                            <Text style={styles.descriptionSubheading}>Cultural Pennsylvania</Text>
                        </View>
                    </View>
                </View>
            </Pressable>

        </View>
    )
}


const generateStyles = THEME => StyleSheet.create({
    container: {
        height: 184,
        width: '90%',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: colors.TEXT_COLOR[THEME],
    },
    pressable: {
        flex: 1,
    },
    imageContainer: {
        height: 128,
        width: '100%',
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    description: {
        flexDirection: 'row',
        height: 56,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.PRIMARY_COLOR,
    },
    descriptionDateTime: {
        height: '100%',
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    descriptionDateTimeInner: {
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    descriptionDivider: {
        backgroundColor: colors.TEXT_COLOR.LIGHT,
        width: 1,
        height: 40,
    },
    descriptionName: {
        height: '100%',
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    descriptionNameInner: {
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    descriptionDate: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.TEXT_COLOR.DARK,
    },
    descriptionTime: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.TEXT_COLOR.LIGHT,
    },
    descriptionHeading: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.TEXT_COLOR.LIGHT,
    },
    descriptionSubheading: {
        fontSize: 14,
        fontWeight: '300',
        color: colors.TEXT_COLOR.LIGHT,
    },
})