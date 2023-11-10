import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from "../../../redux/settingReducer";
import colors from '../../../colors.json';
import { Picker } from "@react-native-picker/picker";

const SelectInput = ({ placeholder, value, items, onChange, styles, theme, changeBackground }) => {
    return (
        <View style={styles.wrapperContainer}>
            <Picker
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
                mode="dropdown"
                style={[styles.picker, { ...(changeBackground) }]}
                dropdownIconRippleColor={colors.INPUT_TEXT_COLOR_LIGHT[theme]}
                dropdownIconColor={colors.INPUT_TEXT_COLOR_LIGHT[theme]}
            >
                {value === '' ? <Picker.Item style={[styles.pickerPlaceholder, { ...(changeBackground) }]} value='' label={placeholder} /> : null}
                {
                    items.map(({ label, value }) => <Picker.Item style={[styles.picker, { ...(changeBackground) }]} label={label} value={value} />)
                }
            </Picker>
        </View>
    )
}

export default function Select({ label, placeholder, value, items, onChange, type, size }) {
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
            <SelectInput placeholder={placeholder} value={value} items={items} onChange={onChange} styles={styles} theme={theme} changeBackground={changeBackground} />
        </View>
    )
}

const generateStyles = THEME => StyleSheet.create({
    picker: {
        flex: 1,
        width: '100%',
        fontSize: 16,
        color: colors.INPUT_TEXT_COLOR[THEME],
        backgroundColor: colors.INPUT_BG_COLOR[THEME],
    },
    pickerPlaceholder: {
        flex: 1,
        width: '100%',
        fontSize: 16,
        color: colors.INPUT_TEXT_COLOR_LIGHT[THEME],
        backgroundColor: colors.INPUT_BG_COLOR[THEME],
    },
    wrapperContainer: {
        width: '100%',
        height: 50,
        borderRadius: 4,
        overflow: 'hidden',
    },
    container: {
        flexDirection: 'column',
        width: '70%',
        borderRadius: 4,
        marginVertical: 8,
    },
    label: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        color: colors.TEXT_COLOR_DARK[THEME],
        fontWeight: '500',
    }
})
