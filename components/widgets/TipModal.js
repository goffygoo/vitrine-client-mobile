import { Image, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux';
import { themeSelector } from '../../redux/settingReducer';

export default function TipModal() {
    const theme = useSelector(themeSelector);
    // const styles = useMemo(() => generateStyles(theme), [theme]);
    const imageURI = theme === 'DARK' ? require('../../assets/InfoLight.png') : require('../../assets/InfoDark.png');

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={imageURI} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        height: 24,
        width: 24,
    },
    image: {
        height: 24,
        width: 24,
    }
})