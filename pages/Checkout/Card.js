import { Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from "../../redux/settingReducer";
import { useMemo } from "react";
import colors from '../../colors.json';
import { getFileUrl } from "../../util/helper";

export default function Card(pageData) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    const { heading, subHeading, banner } = pageData;
    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: getFileUrl(banner)
                }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.textContainer}>
                <Text style={styles.heading}>{heading}</Text>
                <Text style={styles.subHeading}>{subHeading}</Text>
            </View>
        </View>
    )
}

const generateStyles = THEME => StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: colors.TEXT_COLOR_ALT[THEME],
        padding: 8,
        marginVertical: 16,
    },
    image: {
        height: 80,
        width: 128,
        borderRadius: 4,
    },
    textContainer: {
        flex: 1,
        paddingLeft: 8,
    },
    heading: {
        textAlign: 'left',
        flex: 1,
        color: colors.TEXT_COLOR[THEME],
        fontWeight: '500',
        fontSize: 16,
    },
    subHeading: {
        textAlign: 'left',
        flex: 1,
        color: colors.TEXT_COLOR_LIGHT[THEME],
        fontSize: 14,
    },
})