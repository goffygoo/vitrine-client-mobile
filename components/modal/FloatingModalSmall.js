import { Children, useMemo } from "react";
import { Modal, Pressable, StyleSheet, View, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from "../../redux/settingReducer";
import colors from '../../colors.json';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function FloatingModalSmall({ children, visible, closeModal }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    return (
        <Modal
            visible={visible}
            onRequestClose={() => closeModal()}
            transparent
        >
            <View style={styles.modal}>
                {Children.map(children, child => child)}
            </View>
            <Pressable
                style={styles.pressableFade}
                onPress={() => closeModal()}
            />
        </Modal>
    )
}

const generateStyles = THEME => StyleSheet.create({
    pressableFade: {
        flex: 1,
        backgroundColor: colors.FADE[THEME],
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        position: 'absolute',
        width: 216,
        marginTop: windowHeight/2 - 128,
        marginLeft: windowWidth/2 - 108,
        zIndex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: colors.BG_COLOR_MODAL[THEME],
    }
})