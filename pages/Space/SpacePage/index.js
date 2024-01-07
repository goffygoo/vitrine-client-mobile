import { StyleSheet, View } from "react-native";
import { WebView } from 'react-native-webview';
import { useSelector } from "react-redux";
import { activeSpaceDataSelector, activeSpacePostSelector } from "../../../redux/spacesReducer";
import { themeSelector } from "../../../redux/settingReducer";
import { useMemo } from "react";
import colors from '../../../colors.json';
import ImageHeader from "./ImageHeader";
import HeaderAndScroll from "../components/HeaderAndScroll";

export default function SpacePage({ route, navigation }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    const spaceData = useSelector(activeSpaceDataSelector);
    const postData = useSelector(activeSpacePostSelector);

    return (
        <View style={styles.container}>
            <HeaderAndScroll
                navigation={navigation}
            >
                <View style={styles.scrollInner}>
                    <ImageHeader />
                    {
                        Array(postData?.length).fill(1).map(() => {
                            return (
                                <View
                                    style={{
                                        width: 50,
                                        height: 50,
                                        margin: 16,
                                        backgroundColor: 'red',
                                    }}
                                ></View>
                            )
                        })
                    }
                    {/* <WebView
                        source={{ uri: 'https://reactnative.dev/img/header_logo.svg' }}
                        style={styles.webView}
                    /> */}

                    <WebView
                        source={{ uri: 'http://192.168.1.42:3000/webview' }}
                        injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);`}
                        scalesPageToFit={true}
                        allowsFullscreenVideo={true}
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
        height: 600,
        resizeMode: 'cover',
    },
})