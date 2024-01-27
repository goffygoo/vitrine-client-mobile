import { Image, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../../redux/settingReducer';
import { useMemo } from 'react';
import colors from '../../../colors.json';
import { USER_TYPES } from '../../../constants';
import { membersSelector } from '../../../redux/chatReducer';
import { getDateStamp, getFileUrl, getTimeStamp } from '../../../util/helper';

export default function ChatCard({ message }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);
    const {
        createdAt,
        message: textMessage,
        sender,
        senderType,
        spaceId
    } = message;
    const members = useSelector(membersSelector(spaceId));
    const { name, profilePicture } = members?.[sender] || {};
    const date = new Date(createdAt);

    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: getFileUrl(profilePicture)
                }}
                resizeMode='cover'
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{name}</Text>
                    {(senderType === USER_TYPES.PROVIDER) && <Image
                        source={require('../../../assets/adminMark.png')}
                        resizeMode='contain'
                        style={styles.mark}
                    />}
                </View>
                <Text style={styles.time}>{`${getDateStamp(date)} • ${getTimeStamp(date)}`}</Text>
                <Text style={styles.messageText}>{textMessage}</Text>
            </View>
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
})