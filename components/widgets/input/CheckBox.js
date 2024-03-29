import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { themeSelector } from "../../../redux/settingReducer";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import colors from '../../../colors.json';

export default function CheckBox({ checked, onChange, text, width = "100%" }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);
    const imageSource = theme === 'DARK' ? require('../../../assets/TickDark.png') : require('../../../assets/TickLight.png');

    return (
        <View style={[styles.container, { width }]}>
            <Pressable
                style={styles.pressableContainer}
                onPress={() => onChange(!checked)}
            >
                    <View
                        style={[styles.icon, { ...(checked && styles.iconChecked) }]}
                    >
                        {
                            checked ?
                                <Image
                                    style={styles.image}
                                    source={imageSource}
                                    resizeMode="center"
                                /> : null
                        }
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
    icon: {
        height: 24,
        width: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        borderWidth: 2,
        marginRight: 8,
        overflow: 'hidden',
        borderColor: colors.PRIMARY_COLOR,
    },
    iconChecked: {
        backgroundColor: colors.PRIMARY_COLOR,
    },
    image: {
        height: 14,
        width: 16,
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.TEXT_COLOR_LIGHT[THEME],
    },
})