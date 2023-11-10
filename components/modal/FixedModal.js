import { Children, useMemo } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from "../../redux/settingReducer";
import colors from '../../colors.json';

export default function FixedModal({ children, visible, close }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    return (
        <Modal
            visible={visible}
            onRequestClose={() => close()}
            transparent
        >
            <View style={styles.fade}>
                <View style={styles.modal}>
                    {Children.map(children, child => child)}
                </View>
            </View>
        </Modal>
    )
}

const generateStyles = THEME => StyleSheet.create({
    fade: {
        flex: 1,
        backgroundColor: colors.FADE[THEME],
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        width: '75%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: colors.BG_COLOR_MODAL[THEME],
    }
})