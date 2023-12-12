import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from "../../../redux/settingReducer";
import { useMemo } from "react";
import colors from '../../../colors.json';

export default function PrimaryButton({ text, onClick, height = 48, width="auto", fontSize = 24, fontWeight = '600' }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    return (
        <View style={[styles.container, {height, width}]}>
            <Pressable
                style={styles.pressable}
                android_ripple={{ color: colors.PRIMARY_COLOR_LIGHT }}
                onPress={onClick}
            >
                <Text style={[styles.text, {fontSize, fontWeight}]}>{text}</Text>
            </Pressable>
        </View>
    )
}

const generateStyles = THEME => StyleSheet.create({
    container: {
        height: 48,
        backgroundColor: colors.PRIMARY_COLOR,
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
        color: colors.BG_COLOR[THEME],
    },
})