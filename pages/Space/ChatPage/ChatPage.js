import { Image, Pressable, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from "../../../redux/settingReducer";
import { useMemo, useState } from "react";
import { activeSpaceDataSelector } from "../../../redux/spacesReducer";
import colors from '../../../colors.json';
import HeaderAndScroll from "../components/HeaderAndScroll";
import TextInputArea from "../../../components/widgets/input/TextInputArea";
import ChatCard from "./ChatCard";

export default function ChatPage({ route, navigation }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    const spaceData = useSelector(activeSpaceDataSelector);
    const { title, color, boxes } = spaceData;

    const [chatText, setChatText] = useState('')

    return (
        <View style={styles.container}>
            <HeaderAndScroll
                navigation={navigation}
                hasRightDrawer
            >
                <View style={styles.scrollInner}>
                    <View style={styles.chatWrapper}>
                        {
                            Array(3).fill(1).map(() => {
                                return (
                                    <ChatCard
                                        person={{
                                            name: 'Sunilium',
                                            isAdmin: false,
                                        }}
                                        time="21 Oct 12:31"
                                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                                    />
                                )
                            })
                        }
                        <ChatCard
                            person={{
                                name: 'Captain Baljeet',
                                isAdmin: true,
                            }}
                            time="21 Oct 12:31"
                            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                        />
                        {
                            Array(7).fill(1).map(() => {
                                return (
                                    <ChatCard
                                        person={{
                                            name: 'Crazy Alina',
                                            isAdmin: false,
                                        }}
                                        time="21 Oct 12:31"
                                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
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
                <Pressable style={styles.sendButtonWrapper} android_ripple={{ color: colors.AND_RIPPLE[theme], foreground: true }} >
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