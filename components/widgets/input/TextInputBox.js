import { useMemo } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from "../../../redux/settingReducer";
import colors from '../../../colors.json';

export default function TextInputBox({
    label, placeholder, value, onChange, secureTextEntry, type,
    fontWeight = '400',
    width = '100%',
    fontSize = 20,
    onSubmitEditing = () => undefined,
}) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);
    const changeBackground = useMemo(() => {
        return {
            'light': { backgroundColor: colors.BG_COLOR[theme], color: colors.TEXT_COLOR_LIGHT[theme] },
            'alt': { backgroundColor: colors.BG_COLOR_MODAL[theme], color: colors.TEXT_COLOR[theme] },
        }[type];
    }, [type, theme]);

    return (
        <View style={[styles.container, { ...(width && { width }) }]}>
            {label ? <Text style={styles.label}>{label}</Text> : null}
            <TextInput
                value={value}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                placeholderTextColor={colors.INPUT_PLACEHOLDER[theme]}
                style={[
                    styles.input,
                    {
                        fontWeight,
                        fontSize,
                        width
                    }, { ...(changeBackground) }]}
                onChangeText={onChange}
                onSubmitEditing={onSubmitEditing}
            />
        </View>
    )
}

const generateStyles = THEME => StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    input: {
        fontSize: 20,
        paddingHorizontal: 8,
        paddingVertical: 4,
        width: '100%',
        backgroundColor: colors.INPUT_BG_COLOR[THEME],
        color: colors.INPUT_TEXT_COLOR[THEME],
        borderRadius: 4,
    },
    label: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        color: colors.TEXT_COLOR_DARK[THEME],
        fontWeight: '500',
    }
})
