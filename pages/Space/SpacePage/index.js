import { StyleSheet, View } from "react-native";
import { WebView } from 'react-native-webview';
import { useSelector } from "react-redux";
import { activeSpaceDataSelector } from "../../../redux/spacesReducer";
import { themeSelector } from "../../../redux/settingReducer";
import { useMemo } from "react";
import colors from '../../../colors.json';
import ImageHeader from "./ImageHeader";
import HeaderAndScroll from "../components/HeaderAndScroll";

export default function SpacePage({ route, navigation }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    const spaceData = useSelector(activeSpaceDataSelector);
    const { title, color, boxes } = spaceData;

    return (
        <View style={styles.container}>
            <HeaderAndScroll
                navigation={navigation}
            >
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
            </HeaderAndScroll>
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
    webView: {
        width: 300,
        height: 400,
    },
})