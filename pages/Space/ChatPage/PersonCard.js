import { Image, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../../redux/settingReducer';
import { useMemo } from 'react';
import colors from '../../../colors.json';

export default function PersonCard({ name, online, isAdmin }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    return (
        <View style={[styles.container, !online && styles.offline]}>
            <Image
                source={require('../../../assets/avatar_b.jpg')}
                resizeMode='cover'
                style={styles.image}
            />
            <Text style={styles.name}>{name}</Text>
            {isAdmin && < Image
                source={require('../../../assets/adminMark.png')}
                resizeMode='cover'
                style={styles.mark}
            />}
        </View>
    )
}

const generateStyles = THEME => StyleSheet.create({
    offline: {
        opacity: 0.4,
    },
    container: {
        width: '100%',
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    name: {
        flex: 1,
        fontSize: 16,
        color: colors.TEXT_COLOR[THEME],
        paddingHorizontal: 8,
    },
    mark: {
        width: 24,
        height: 24,
        marginLeft: 'auto',
    }
})