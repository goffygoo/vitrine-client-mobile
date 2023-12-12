import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux';
import { themeSelector } from '../../redux/settingReducer';
import { useMemo, useState } from 'react';
import colors from '../../colors.json';
import FloatingModalSmall from '../modal/FloatingModalSmall';

export default function TipModal({ text }) {
    const theme = useSelector(themeSelector);
    const imageURI = theme === 'DARK' ? require('../../assets/InfoLight.png') : require('../../assets/InfoDark.png');
    const styles = useMemo(() => generateStyles(theme), [theme]);
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <FloatingModalSmall
                visible={showModal}
                closeModal={() => setShowModal(false)}
            >
                <Text style={styles.text}>{text}</Text>
            </FloatingModalSmall>
            <View style={styles.container}>
                <Pressable
                    style={styles.image}
                    onPress={() => setShowModal(true)}
                >
                    <Image style={styles.image} source={imageURI} />
                </Pressable>
            </View>
        </>
    )
}


const generateStyles = THEME => StyleSheet.create({
    container: {
        height: 24,
        width: 24,
    },
    image: {
        height: 24,
        width: 24,
    },
    text: {
        color: colors.TEXT_COLOR[THEME],
        fontSize: 24,
        fontWeight: '300',
        padding: 16,
    }
})