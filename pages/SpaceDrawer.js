import { createDrawerNavigator } from '@react-navigation/drawer';
import Space from './Space';
import { ImageBackground, ImageComponent, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { activeSpaceSelector, setActiveSpace, spacesListSelector } from '../redux/spacesReducer';
import { themeSelector } from '../redux/settingReducer';
import { useMemo } from 'react';
import colors from '../colors.json';

const Drawer = createDrawerNavigator();

function DrawerContent({ navigation }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    const spacesList = useSelector(spacesListSelector);
    const activeSpace = useSelector(activeSpaceSelector);

    const dispatch = useDispatch();

    const handlePress = spaceId => {
        dispatch(setActiveSpace(spaceId));
        navigation.navigate('Page');
    }

    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.scrollInner}>
                {
                    spacesList.map((space) => {
                        return (
                            <View style={styles.spaceIconContainer}>
                                <ImageBackground
                                    source={require('../assets/profileCover.jpg')}
                                    style={[styles.spaceIcon, space.id === activeSpace ? styles.spaceIconActive : {}]}
                                    resizeMode="cover"
                                >
                                    <Pressable
                                        style={styles.spaceIconPressable}
                                        android_ripple={{ color: colors.AND_RIPPLE[theme], foreground: true }}
                                        onPress={() => handlePress(space.id)}
                                    >
                                    </Pressable>
                                </ImageBackground>
                                <Text
                                    style={[styles.spaceIconTitle, space.id === activeSpace ? styles.spaceIconTitleActive : {}]}
                                >{space.title}</Text>
                                <View style={space.id === activeSpace ? styles.spaceIconArtifact : {}} />
                            </View>
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}


const generateStyles = THEME => StyleSheet.create({
    scroll: {
        backgroundColor: colors.BG_COLOR_SECONDARY[THEME],
        width: '100%',
    },
    scrollInner: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 12,
    },
    spaceIconContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 12,
    },
    spaceIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        borderWidth: 2,
        borderColor: colors.INPUT_TEXT_COLOR_LIGHT[THEME],
        overflow: 'hidden',
    },
    spaceIconPressable: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    spaceIconTitle: {
        marginTop: 4,
        paddingHorizontal: 8,
        fontSize: 12,
        fontWeight: '500',
        color: colors.TEXT_COLOR_LIGHT[THEME],
        textAlign: 'center',
    },
    spaceIconActive: {
        borderColor: colors.PRIMARY_COLOR,
    },
    spaceIconTitleActive: {
        color: colors.TEXT_COLOR[THEME],
    },
    spaceIconArtifact: {
        position: 'absolute',
        right: 0,
        height: '100%',
        width: 4,
        borderTopStartRadius: 4,
        borderBottomStartRadius: 4,
        backgroundColor: colors.PRIMARY_COLOR,
    },
})

export default function SpaceDrawer({ route, navigation }) {
    return (
        <Drawer.Navigator
            drawerContent={DrawerContent}
            screenOptions={() => ({
                headerShown: false,
                drawerStyle: {
                    width: 112,
                }
            })}
        >
            <Drawer.Screen
                name={"Page"}
                component={Space}
            />
        </Drawer.Navigator>
    )
}