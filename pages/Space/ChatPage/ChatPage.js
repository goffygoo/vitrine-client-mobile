import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from "../../../redux/settingReducer";
import { useMemo, useState } from "react";
import { activeSpaceDataSelector } from "../../../redux/spacesReducer";
import colors from '../../../colors.json';
import HeaderAndScroll from "../components/HeaderAndScroll";
import TextInputArea from "../../../components/widgets/input/TextInputArea";

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
                    {
                        Array(boxes).fill(1).map(() => {
                            return (
                                <View
                                    style={{
                                        width: 50,
                                        height: 50,
                                        margin: 16,
                                        backgroundColor: color,
                                    }}
                                ></View>
                            )
                        })
                    }
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
    footer: {
        width: '100%',
        backgroundColor: colors.BG_COLOR_MODAL[THEME],
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
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