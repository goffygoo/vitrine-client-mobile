import { Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from "../../redux/settingReducer";
import { useMemo } from "react";
import colors from '../../colors.json';

export default function Header() {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../../assets/Logo.png')}
                resizeMode="cover"
            />
            <View style={styles.heading}>
                <Text style={styles.headingTop}>Baljeetkode</Text>
                <Text style={styles.headingMain}>Community</Text>
            </View>
        </View>
    )
}

const generateStyles = THEME => StyleSheet.create({
    container: {
        height: 64,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    image: {
        height: 48,
        width: 48,
    },
    heading: {
        marginLeft: 16,
        justifyContent: 'center',
        height: 48,

    },
    headingTop: {
        color: colors.PRIMARY_COLOR,
        fontSize: 12,
        fontWeight: '300',
        marginBottom: 4,
        lineHeight: 12,
    },
    headingMain: {
        color: colors.PRIMARY_COLOR,
        fontSize: 28,
        lineHeight: 28,
        fontWeight: '700',
    },
})