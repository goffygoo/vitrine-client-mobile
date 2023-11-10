import { Children, useMemo } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import FixedModal from '../../../../components/modal/FixedModal'
import { useSelector } from 'react-redux'
import { themeSelector } from '../../../../redux/settingReducer'
import colors from '../../../../colors.json';
import PrimaryButton from '../../../../components/widgets/buttons/PrimaryButton'

export default function Popup({ children, close, title, onSubmit }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    const crossUrl = theme === 'DARK' ? require('../../../../assets/CrossLight.png') : require('../../../../assets/CrossDark.png');

    return (
        <FixedModal
            visible={true}
            close={close}
        >
            <View style={styles.container}>
                <Pressable
                    style={styles.crossContainer}
                    onPress={close}
                >
                    <Image
                        style={styles.image}
                        source={crossUrl}
                    />
                </Pressable>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.inputSection}>
                    {Children.map(children, child => child)}
                </View>
                <View style={styles.submitButton}>
                    <PrimaryButton
                        text={"Submit"}
                        onClick={onSubmit}
                        width={144}
                        height={32}
                        fontSize={16}
                    />
                </View>
            </View>
        </FixedModal>
    )
}

const generateStyles = THEME => StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    crossContainer: {
        padding: 8,
        marginLeft: 'auto',
    },
    image: {
        height: 24,
        width: 24,
    },
    title: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: '600',
        color: colors.TEXT_COLOR[THEME],
        marginTop: 8,
    },
    inputSection: {
        width: '100%',
        paddingHorizontal: 16,
    },
    submitButton: {
        marginVertical: 16,
    },
})

