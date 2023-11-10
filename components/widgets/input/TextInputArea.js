import { useMemo } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from "../../../redux/settingReducer";
import colors from '../../../colors.json';

export default function TextInputArea({ label, placeholder, value, onChange, type, size }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);
    const width = useMemo(() => {
        return {
            "expand": '100%'
        }[size];
    }, [size]);
    const changeBackground = useMemo(() => {
        return {
            'light': { backgroundColor: colors.BG_COLOR[theme], color: colors.TEXT_COLOR[theme] }
        }[type];
    }, [type, theme]);

    return (
        <View style={[styles.container, { ...(width && { width }) }]}>
            {label ? <Text style={styles.label}>{label}</Text> : null}
            <TextInput
                multiline
                numberOfLines={6}
                value={value}
                placeholder={placeholder}
                placeholderTextColor={colors.INPUT_TEXT_COLOR_LIGHT[theme]}
                style={[styles.input, { ...(changeBackground) }]}
                onChangeText={onChange}
            />
        </View>
    )
}

const generateStyles = THEME => StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginVertical: 8,
    },
    input: {
        fontSize: 20,
        paddingHorizontal: 8,
        paddingVertical: 8,
        width: '100%',
        maxHeight: 240,
        backgroundColor: colors.INPUT_BG_COLOR[THEME],
        color: colors.INPUT_TEXT_COLOR[THEME],
        fontWeight: '600',
        borderRadius: 4,
        textAlignVertical: 'top',
    },
    label: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        color: colors.TEXT_COLOR_DARK[THEME],
        fontWeight: '500',
    }
})
