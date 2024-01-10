import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { WebView } from 'react-native-webview';
import { useSelector } from "react-redux";
import { activeSpaceDataSelector, activeSpacePostSelector } from "../../../redux/spacesReducer";
import { themeSelector } from "../../../redux/settingReducer";
import { useMemo, useState } from "react";
import colors from '../../../colors.json';
import ImageHeader from "./ImageHeader";
import HeaderAndScroll from "../components/HeaderAndScroll";
import Post from "./Post";

export default function SpacePage({ route, navigation }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    const spaceData = useSelector(activeSpaceDataSelector);
    const postData = useSelector(activeSpacePostSelector);

    const closeButton = theme === 'DARK' ? require('../../../assets/CrossLight.png') : require('../../../assets/CrossDark.png');

    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState({});

    const showModal = (data) => {
        setModalData(data);
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false)
    }

    return (
        <View style={styles.container}>
            <Modal
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalHeader}>
                    <Pressable
                        onPress={closeModal}
                        style={styles.crossBtn}
                    >
                        <Image
                            source={closeButton}
                            style={styles.crossBtnImg}
                            resizeMode="cover"
                        />
                    </Pressable>

                    <Text style={styles.modalHeaderTitle}>{modalData.title}</Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        padding: 8,
                        backgroundColor: colors.INPUT_BG_COLOR.LIGHT
                    }}
                >
                    <WebView
                        source={{ uri: modalData.uri }}
                        scalesPageToFit={true}
                        style={{
                            flex: 1,
                            backgroundColor: colors.INPUT_BG_COLOR.LIGHT
                        }}
                    />
                </View>

            </Modal>

            <HeaderAndScroll
                navigation={navigation}
            >
                <View style={styles.scrollInner}>
                    <ImageHeader
                        displayPicture={spaceData.displayPicture}
                        coverPicture={spaceData.coverPicture}
                        title={spaceData.title}
                        description={spaceData.description}
                    />
                    {
                        postData?.map((post) => {
                            return (
                                <Post
                                    post={post}
                                    showModal={showModal}
                                />
                            )
                        })
                    }
                </View>
            </HeaderAndScroll>
        </View>
    )
}

const generateStyles = THEME => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BG_COLOR[THEME],
    },
    scrollInner: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 64
    },
    modalHeader: {
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
    },
    crossBtn: {
        height: 48,
        width: 48,
        marginHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    crossBtnImg: {
        height: 32,
        width: 32,
    },
    modalHeaderTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: colors.TEXT_COLOR[THEME],
    },
})