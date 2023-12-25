import { View, StyleSheet, Text, Pressable, Image } from 'react-native'
import colors from '../../../colors.json';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../../redux/settingReducer';
import { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function CommunityCard() {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.pressable}
                android_ripple={{ color: colors.AND_RIPPLE[theme], foreground: true }}
                onPress={() => navigation.navigate('Community')}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.heading}>
                        Explore Community
                    </Text>
                </View>
            </Pressable>
        </View>
    )
}

const generateStyles = THEME => StyleSheet.create({
    container: {
        height: 64,
        width: 240,
        backgroundColor: colors.BG_COLOR_MODAL[THEME],
        borderRadius: 4,
        marginVertical: 32,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: colors.TEXT_COLOR[THEME],
    },
    pressable: {
        flex: 1,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    heading: {
        color: colors.TEXT_COLOR_LIGHT[THEME],
        fontSize: 20,
        fontWeight: '300',
        textAlign: 'center',
    },
})
