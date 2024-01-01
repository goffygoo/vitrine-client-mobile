import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { themeSelector, toggleTheme } from '../../../redux/settingReducer';
import { useContext, useEffect, useMemo, useState } from "react";
import colors from '../../../colors.json';
import SectionBlock from "./SectionBlock";
import ImageBlock from "./ImageBlock";
import TipModal from "../../../components/widgets/TipModal";
import PrimaryButton from "../../../components/widgets/buttons/PrimaryButton";
import WarnButton from "../../../components/widgets/buttons/WarnButton";
import UserProfilePopup from "./Popup/UserProfilePopup";
import SocialMediaPopup from "./Popup/SocialMediaPopup";
import AboutMePopup from "./Popup/AboutMePopup";
import OneOnOnePopup from "./Popup/OneOnOnePopup";
import ToggleSwitch from "../../../components/widgets/input/ToggleSwitch";
import { resetAuthData } from "../../../redux/authReducer";
import { removeItem, removeSecureItem } from "../../../util/storage";
import { SECURE_STORAGE_KEY, STORAGE_KEY } from "../../../constants";
import { ServiceContext } from "../../../util/context/serviceContext";
import { profileNameSelector, setProfileName, setProfilePicture, setProfileSpaces } from "../../../redux/profileReducer";

export default function ProfilePage({ route, navigation }) {
    const theme = useSelector(themeSelector)
    const styles = useMemo(() => generateStyles(theme), [theme]);
    const serviceContext = useContext(ServiceContext);
    const dispatch = useDispatch();

    const profileName = useSelector(profileNameSelector);
    const [showPoupup, setShowPopup] = useState(false);

    const toggle = () => {
        dispatch(toggleTheme());
    }

    const handleLogout = async () => {
        try {
            dispatch(resetAuthData());
            await removeSecureItem(SECURE_STORAGE_KEY.ACCESS_TOKEN);
            await removeItem(STORAGE_KEY.DATA_TOKEN);
            await removeSecureItem(SECURE_STORAGE_KEY.REFRESH_TOKEN);
            await removeItem(STORAGE_KEY.USER_ID);
            await removeItem(STORAGE_KEY.PROFILE_ID);
            await removeItem(STORAGE_KEY.TYPE);
            await removeItem(STORAGE_KEY.EMAIL);
        } catch (e) { }
        navigation.reset({
            index: 0,
            routes: [
                { name: 'LoginPage' },
            ],
        });
    }

    useEffect(() => {
        serviceContext.request(
            'get',
            '/api/consumer/profile/view',
            {},
            ({ data }) => {
                dispatch(setProfileName(data.name))
                dispatch(setProfilePicture(data.profilePicture))
                dispatch(setProfileSpaces(data.spaces))
            },
            () => undefined,
        )
    }, [])

    return (
        <View style={styles.container}>
            {showPoupup === 'userProfile' ? <UserProfilePopup close={() => setShowPopup(false)} /> : null}
            {showPoupup === 'socialMedia' ? <SocialMediaPopup close={() => setShowPopup(false)} /> : null}
            {showPoupup === 'aboutMe' ? <AboutMePopup close={() => setShowPopup(false)} /> : null}
            {showPoupup === 'oneOnOne' ? <OneOnOnePopup close={() => setShowPopup(false)} /> : null}
            <ScrollView style={styles.pageScroll}>
                <View style={styles.center}>
                    <ImageBlock />
                    <View style={styles.pageContent}>
                        <SectionBlock
                            title="User Profile"
                            onEdit={() => setShowPopup('userProfile')}
                        >
                            <View style={styles.sectionBlock}>
                                <View style={styles.sectionBlockRow}>
                                    <Text style={styles.sectionBlockRowTitle}>Name</Text>
                                    <Text style={styles.sectionBlockRowValue}>{profileName}</Text>
                                </View>
                            </View>
                        </SectionBlock>

                        <SectionBlock
                            title="My Account"
                        >
                            <View style={styles.sectionBlock}>
                                <View style={styles.sectionBlockRow}>
                                    <Text style={styles.sectionBlockRowTitle}>Email</Text>
                                    <Text style={[styles.sectionBlockRowValue, { color: colors.TEXT_COLOR_ALT[theme] }]} numberOfLines={1}>cutebaljeet6969@bmail.com</Text>
                                    <View style={styles.tipModal}>
                                        <TipModal text={"cutebaljeet6969@bmail.com"} />
                                    </View>
                                </View>

                                <View style={styles.sectionBlockRow}>
                                    <Text style={styles.sectionBlockRowTitle}>Account Type</Text>
                                    <Text style={[styles.sectionBlockRowValue, { color: colors.TEXT_COLOR_ALT[theme] }]}>Consumer</Text>
                                </View>
                            </View>
                        </SectionBlock>

                        <SectionBlock
                            title="Preferences"
                        >
                            <View style={styles.sectionBlock}>
                                <View style={styles.preferenceRow}>
                                    <Text style={styles.themeText}>Dark Theme</Text>
                                    <ToggleSwitch
                                        onValueChange={toggle}
                                        value={theme === 'DARK'}
                                    />
                                </View>
                            </View>
                        </SectionBlock>
                    </View>
                </View>
                <View style={styles.buttonRow}>
                    <PrimaryButton
                        onClick={() => undefined}
                        text={"Reset Password"}
                        fontSize={16}
                        height={40}
                    />
                    <WarnButton
                        onClick={handleLogout}
                        text={"Logout"}
                        fontSize={16}
                        height={40}
                    />
                </View>
            </ScrollView>
        </View >
    )
}

const generateStyles = THEME => StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 16,
        backgroundColor: colors.BG_COLOR[THEME],
    },
    pageScroll: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 8,
    },
    pageContent: {
        width: '100%',
        paddingTop: 16,
        paddingHorizontal: '7%',
        alignItems: 'center',
    },
    center: {
        alignItems: 'center',
    },
    sectionBlock: {
        paddingVertical: 8,
    },
    sectionBlockSocialMedia: {
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    sectionBlockRow: {
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderWidth: 1,
        borderRadius: 2,
        borderBottomColor: colors.SHADE_2,
        flexDirection: 'row',
        marginHorizontal: 12,
        marginVertical: 8,
        paddingVertical: 8,
    },
    sectionBlockRowTitle: {
        width: '40%',
        fontSize: 16,
        fontWeight: '500',
        color: colors.TEXT_COLOR[THEME],
    },
    sectionBlockRowValue: {
        width: '50%',
        fontSize: 16,
        fontWeight: '300',
        color: colors.TEXT_COLOR[THEME],
    },
    tipModal: {
        marginLeft: 'auto',
        marginRight: 8,
    },
    socialMediaIcon: {
        height: 32,
        width: 32,
    },
    aboutMeText: {
        fontSize: 16,
        fontWeight: '300',
        color: colors.TEXT_COLOR[THEME],
        padding: 16,
    },
    buttonRow: {
        paddingHorizontal: '7%',
        paddingVertical: 16,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    preferenceRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    themeText: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.TEXT_COLOR[THEME],
        padding: 16,
    }
})