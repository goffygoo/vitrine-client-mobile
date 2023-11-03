import { Children, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { themeSelector } from '../../../redux/settingReducer'
import colors from '../../../colors.json';

export default function SectionBlock({ children, title, onEdit }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);
    const imageURI = theme === 'DARK' ? require('../../../assets/EditLight.png') : require('../../../assets/EditDark.png');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                {
                    onEdit ?
                        <Pressable
                            style={styles.editPressable}
                            android_ripple={{ color: colors.AND_RIPPLE[theme], foreground: true }}
                            onPress={onEdit}
                        >
                            <Image style={styles.editImage} source={imageURI} />
                        </Pressable>
                        : null
                }
            </View>
            {Children.map(children, child => child)}
        </View>
    )
}

const generateStyles = THEME => StyleSheet.create({
    container: {
        width: '100%',
        borderColor: colors.TEXT_COLOR_ALT[THEME],
        borderWidth: 1,
        borderRadius: 8,
        marginVertical: 16,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleBox: {
        paddingHorizontal: 16,
        justifyContent: 'center',
        backgroundColor: colors.SHADE_1,
        height: 32,
        borderBottomEndRadius: 8,
    },
    editPressable: {
        height: 32,
        width: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    editImage: {
        height: 28,
        width: 28,
    },
    title: {
        color: colors.TEXT_COLOR.LIGHT,
        fontSize: 14,
        fontWeight: '600',
    },
})