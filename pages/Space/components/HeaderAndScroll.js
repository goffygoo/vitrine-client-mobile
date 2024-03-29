import { useMemo, Children, useRef } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux';
import { themeSelector } from '../../../redux/settingReducer';
import { AntDesign } from '@expo/vector-icons';
import colors from '../../../colors.json';
import Divider from '../../../components/widgets/Divider';

export default function HeaderAndScroll({ children, navigation, hasRightDrawer, scrollToEnd }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    const ref = useRef();

    const openLeftDrawer = () => {
        if (hasRightDrawer) navigation.getParent().openDrawer();
        else navigation.openDrawer();
    }

    const openRightDrawer = () => {
        navigation.openDrawer();
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable
                    style={styles.navIconLeft}
                    onPress={openLeftDrawer}
                >
                    <AntDesign name="menufold" size={24} color={colors.TEXT_COLOR_LIGHT[theme]} />
                </Pressable>
                <Text style={styles.headerHeading}>{'title'}</Text>
                {
                    hasRightDrawer &&
                    <Pressable
                        style={styles.navIconRight}

                        onPress={openRightDrawer}
                    >
                        <AntDesign name="menuunfold" size={24} color={colors.TEXT_COLOR_LIGHT[theme]} />
                    </Pressable>}
            </View>
            <ScrollView
                ref={ref}
                style={styles.scroll}
                overScrollMode='never'
                removeClippedSubviews={true}
                {...(scrollToEnd &&
                    { onContentSizeChange: () => ref.current.scrollToEnd({ animated: true }) }
                )}
            >
                <Divider size={'xl'} />
                <Divider size={'l'} />
                {Children.map(children, child => child)}
            </ScrollView>
        </View>
    )
}


const generateStyles = THEME => StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    scroll: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    header: {
        position: 'absolute',
        width: '100%',
        paddingHorizontal: 16,
        height: 48,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: colors.FADE[THEME],
        borderBottomColor: colors.TEXT_COLOR_ALT[THEME],
        borderBottomWidth: 1,
        zIndex: 2,
    },
    headerHeading: {
        fontSize: 20,
        fontWeight: '600',
        color: colors.TEXT_COLOR[THEME],
    },
    navIconLeft: {
        marginRight: 16,
    },
    navIconRight: {
        right: 0,
        marginLeft: 'auto',
    }
})