import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { themeSelector } from "../../../redux/settingReducer";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import colors from '../../../colors.json';

export default function RadioInput({ selected, onChange, text, width = "100%" }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);
    const imageSource = theme === 'DARK' ? require('../../../assets/TickDark.png') : require('../../../assets/TickLight.png');

    return (
        <View style={[styles.container, { width }]}>
            <Pressable
                style={styles.pressableContainer}
                onPress={() => onChange(!selected)}
            >
                <View style={styles.icon}>
                    <View
                        style={[styles.iconInner, { ...(selected && styles.iconSelected) }]}
                    />
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
    },
    pressableContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
    },
    selected: {
        height: 24,
        width: 24,
        borderRadius: 12,
        marginRight: 8,
        overflow: 'hidden',
    },
    icon: {
        height: 24,
        width: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        borderWidth: 2,
        marginRight: 8,
        overflow: 'hidden',
        borderColor: colors.PRIMARY_COLOR,
    },
    iconInner: {
        height: 14,
        width: 14,
        borderRadius: 14,
    },
    iconSelected: {
        backgroundColor: colors.PRIMARY_COLOR,
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.TEXT_COLOR_LIGHT[THEME],
    },
})