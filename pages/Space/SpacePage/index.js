import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { WebView } from 'react-native-webview';
import { useSelector } from "react-redux";
import { activeSpaceDataSelector } from "../../../redux/spacesReducer";
import { themeSelector } from "../../../redux/settingReducer";
import { useMemo } from "react";
import colors from '../../../colors.json';
import { AntDesign } from '@expo/vector-icons';
import ImageHeader from "./ImageHeader";

export default function SpacePage({ route, navigation }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    const spaceData = useSelector(activeSpaceDataSelector);
    const { title, color, boxes } = spaceData;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable
                    onPress={() => navigation.openDrawer()}
                >
                    <AntDesign name="menufold" size={24} color={colors.TEXT_COLOR_LIGHT[theme]} />
                </Pressable>
                <Text style={styles.headerHeading}>{title}</Text>
            </View>
            <ScrollView style={styles.scroll}>
                <View style={styles.scrollInner}>
                    <ImageHeader />
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
                    <WebView
                        source={{ uri: 'https://reactnative.dev/img/header_logo.svg' }}
                        style={styles.webView}
                    />
                </View>
            </ScrollView>
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
    scroll: {
        flex: 1,
        height: '100%',
        width: '100%',
        paddingTop: 48,
    },
    scrollInner: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    header: {
        position: 'absolute',
        width: '100%',
        height: 48,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 16,
        backgroundColor: colors.FADE[THEME],
        borderBottomColor: colors.TEXT_COLOR_ALT[THEME],
        borderBottomWidth: 1,
        zIndex: 2,
    },
    headerHeading: {
        marginLeft: 16,
        fontSize: 20,
        fontWeight: '600',
        color: colors.TEXT_COLOR[THEME],
    },
    webView: {
        width: 300,
        height: 400,
    },
})