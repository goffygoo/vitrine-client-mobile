import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from "../../../redux/settingReducer";
import { useMemo } from "react";
import colors from '../../../colors.json';

export default function GlassButton({ text, onClick, height = 48, width, fontSize = 24 }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    return (
        <View style={[styles.container, {height, width}]}>
            <Pressable
                style={styles.pressable}
                android_ripple={{ color: colors.BG_COLOR_MODAL[theme] }}
                onPress={onClick}
            >
                <Text style={[styles.text, {fontSize}]}>{text}</Text>
            </Pressable>
        </View>
    )
}

const generateStyles = THEME => StyleSheet.create({
    container: {
        backgroundColor: colors.AND_RIPPLE[THEME],
        borderRadius: 4,
        overflow: 'hidden',
    },
    pressable: {
        flex: 1,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: '600',
        color: colors.TEXT_COLOR[THEME],
    },
})