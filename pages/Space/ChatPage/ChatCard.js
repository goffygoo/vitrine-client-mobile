import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../../redux/settingReducer';
import { useMemo } from 'react';
import colors from '../../../colors.json';

export default function ChatCard({ person, time, text }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    const { name, isAdmin } = person;

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/avatar_b.jpg')}
                resizeMode='cover'
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{name}</Text>
                    {isAdmin && <Image
                        source={require('../../../assets/adminMark.png')}
                        resizeMode='contain'
                        style={styles.mark}
                    />}
                </View>
                <Text style={styles.time}>{time}</Text>
                <Text style={styles.messageText}>{text}</Text>
            </View>
            <Pressable
                style={styles.deleteWrapper}
                android_ripple={{ color: colors.AND_RIPPLE[theme], foreground: true }}
            >
                <Image
                    source={require('../../../assets/Delete.png')}
                    resizeMode='contain'
                    style={styles.delete}
                />
            </Pressable>

        </View >
    )
}

const generateStyles = THEME => StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 8,
        flexDirection: 'row',
        padding: 8,
        borderRadius: 4,
        alignItems: 'flex-start',
        backgroundColor: colors.BG_COLOR_MODAL[THEME],
    },
    image: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    textContainer: {
        flex: 1,
        paddingHorizontal: 4,
        flexDirection: 'column',
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.TEXT_COLOR[THEME],
    },
    mark: {
        width: 16,
        height: 16,
        marginLeft: 8,
    },
    time: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
        color: colors.INPUT_PLACEHOLDER[THEME],
    },
    messageText: {
        fontSize: 14,
        color: colors.TEXT_COLOR_LIGHT[THEME],
    },
    deleteWrapper: {
        width: 32,
        height: 40,
        marginTop: -8,
        marginRight: -8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    delete: {
        width: 24,
        height: 24,
    },
})