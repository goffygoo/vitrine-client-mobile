import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { themeSelector } from "../../../redux/settingReducer";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import colors from '../../../colors.json';

export default function CheckBox({ checked, onChange, text }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);
    const imageSource = theme === 'DARK' ? require('../../../assets/TickDark.png') : require('../../../assets/TickLight.png');

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.pressableContainer}
                onPress={() => onChange(!checked)}
            >
                <View style={styles.checkbox}>
                    <Pressable
                        style={[styles.pressable, { ...(checked && styles.pressableChecked) }]}
                        android_ripple={{ color: colors.AND_RIPPLE[theme] }}
                        onPress={() => onChange(!checked)}
                    >
                        {
                            checked ?
                                <Image
                                    style={styles.image}
                                    source={imageSource}
                                    resizeMode="center"
                                /> : null
                        }
                    </Pressable>
                </View>
                <Text style={styles.text}>{text}</Text>
            </Pressable>
        </View>
    )
}

const generateStyles = THEME => StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 112,
    },
    pressableContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 112,
        padding: 4,
    },
    checkbox: {
        height: 24,
        width: 24,
        borderRadius: 4,
        marginRight: 8,
        overflow: 'hidden',
    },
    pressable: {
        height: 24,
        width: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: colors.ACCENT_1,
    },
    pressableChecked: {
        backgroundColor: colors.ACCENT_1,
    },
    image: {
        height: 14,
        width: 16,
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.TEXT_COLOR[THEME],
    },
})