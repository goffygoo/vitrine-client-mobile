import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from '../../../redux/settingReducer';
import { useMemo } from "react";
import colors from '../../../colors.json';
import SectionBlock from "./SectionBlock";
import ImageBlock from "./ImageBlock";
import TipModal from "../../../components/widgets/TipModal";

export default function ProfilePage({ route, navigation }) {
    const theme = useSelector(themeSelector)
    const styles = useMemo(() => generateStyles(theme), [theme]);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.pageScroll}>
                <View style={styles.center}>
                    <ImageBlock />
                    <View style={styles.pageContent}>
                        <SectionBlock
                            title="User Profile"
                            onEdit={() => undefined}
                        >
                            <View style={styles.sectionBlock}>
                                <View style={styles.sectionBlockRow}>
                                    <Text style={styles.sectionBlockRowTitle}>Name</Text>
                                    <Text style={styles.sectionBlockRowValue}>Kimi no Naewa</Text>
                                </View>

                                <View style={styles.sectionBlockRow}>
                                    <Text style={styles.sectionBlockRowTitle}>Name</Text>
                                    <Text style={styles.sectionBlockRowValue}>Kimi no Naewa</Text>
                                </View>

                            </View>
                        </SectionBlock>

                        <SectionBlock
                            title="Social Media"
                            onEdit={() => undefined}
                        >
                            <View style={styles.sectionBlockSocialMedia}>

                                <Image
                                    style={{
                                        height: 32,
                                        width: 32,
                                    }}
                                    source={require('../../../assets/LinkedIn.png')}
                                />
                                <Image
                                    style={{
                                        height: 32,
                                        width: 32,
                                    }}
                                    source={require('../../../assets/Instagram.png')}
                                />
                                <Image
                                    style={{
                                        height: 32,
                                        width: 32,
                                    }}
                                    source={require('../../../assets/Twitter.png')}
                                />
                            </View>

                        </SectionBlock>

                        <SectionBlock
                            title="One on One Settings"
                            onEdit={() => undefined}
                        >
                            <View style={styles.sectionBlock}>
                                <View style={styles.sectionBlockRow}>
                                    <Text style={styles.sectionBlockRowTitle}>Working Hours</Text>
                                    <Text style={styles.sectionBlockRowValue}>9 am - 5 pm</Text>
                                    <View style={styles.tipModal}>
                                        <TipModal text={"Set your working hours for every day of week."} />
                                    </View>
                                </View>

                                <View style={styles.sectionBlockRow}>
                                    <Text style={styles.sectionBlockRowTitle}>Off Days</Text>
                                    <Text style={styles.sectionBlockRowValue}>
                                        {`Sunday\nMonday`}
                                    </Text>
                                    <View style={styles.tipModal}>
                                        <TipModal text={"Choose which days you want to take off every week."} />
                                    </View>
                                </View>
                            </View>
                        </SectionBlock>

                        <SectionBlock
                            title={"About Me"}
                            onEdit={() => undefined}
                        >
                            <Text style={styles.aboutMeText}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                            </Text>
                        </SectionBlock>

                        <SectionBlock title="My Account">
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
                    </View>
                </View>
            </ScrollView>
        </View>
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
    aboutMeText: {
        fontSize: 16,
        fontWeight: '300',
        color: colors.TEXT_COLOR[THEME],
        padding: 16,
    },

})