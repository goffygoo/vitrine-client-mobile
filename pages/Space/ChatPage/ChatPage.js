import { Image, Pressable, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from "../../../redux/settingReducer";
import { useMemo, useState } from "react";
import { activeSpaceSelector } from "../../../redux/spacesReducer";
import colors from '../../../colors.json';
import HeaderAndScroll from "../components/HeaderAndScroll";
import TextInputArea from "../../../components/widgets/input/TextInputArea";
import ChatCard from "./ChatCard";
import { chatSelector } from "../../../redux/chatReducer";
import { emit } from "../../../util/socketIO";
import { SOCKET_EVENTS } from "../../../constants";

export default function ChatPage({ route, navigation }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    const activeSpace = useSelector(activeSpaceSelector);
    const messages = useSelector(chatSelector(activeSpace));

    const [chatText, setChatText] = useState('');

    const handleSend = () => {
        emit(SOCKET_EVENTS.MESSAGE_SEND, { message: chatText, spaceId: activeSpace });
        setChatText('');
    }

    return (
        <View style={styles.container}>
            <HeaderAndScroll
                navigation={navigation}
                hasRightDrawer
                scrollToEnd
            >
                <View style={styles.scrollInner}>
                    <View style={styles.chatWrapper}>
                        {
                            messages?.map(message => {
                                return (
                                    <ChatCard
                                        message={message}
                                    />
                                )
                            })
                        }
                    </View>
                </View>
            </HeaderAndScroll>
            <View style={styles.footer}>
                <View style={styles.inputWrapper}>
                    <TextInputArea
                        value={chatText}
                        onChange={(e) => setChatText(e)}
                        maxHeight={96}
                        fontSize={16}
                        placeholder={"Write something good ..."}
                        type={"light"}
                    />
                </View>
                <Pressable
                    onPress={handleSend}
                    style={styles.sendButtonWrapper}
                    android_ripple={{ color: colors.AND_RIPPLE[theme], foreground: true }} >
                    <Image
                        source={require('../../../assets/Send.png')}
                        resizeMode="contain"
                        style={styles.sendButton}
                    />
                </Pressable>
            </View>
        </View>
    )
}

const generateStyles = THEME => StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: colors.BG_COLOR[THEME],
    },
    scrollInner: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    chatWrapper: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 16,
    },
    footer: {
        width: '100%',
        backgroundColor: colors.BG_COLOR_MODAL[THEME],
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        borderTopWidth: 0.5,
        borderColor: colors.TEXT_COLOR_LIGHT[THEME],
        backgroundColor: colors.BG_COLOR_MODAL[THEME],
    },
    inputWrapper: {
        width: '80%',
        flex: 1,
        paddingHorizontal: 4,
    },
    sendButtonWrapper: {
        width: 48,
        height: 48,
        marginHorizontal: 8,
        marginBottom: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendButton: {
        width: 40,
        height: 40,
        paddingHorizontal: 8,
    }
})