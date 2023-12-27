import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from "../../redux/settingReducer";
import { useContext, useEffect, useMemo, useState } from "react";
import colors from '../../colors.json';
import PrimaryButton from "../../components/widgets/buttons/PrimaryButton";
import SecondaryButton from "../../components/widgets/buttons/SecondaryButton";
import Divider from "../../components/widgets/Divider";
import ImageBlock from "./ImageBlock";
import { Entypo } from '@expo/vector-icons';
import { ServiceContext } from "../../util/context/serviceContext";

export default function SpacePreview({ route, navigation }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    const serviceContext = useContext(ServiceContext);
    const [spaceData, setSpaceData] = useState();

    const spaceId = '6581d1ee9243062f00e5e428';

    useEffect(() => {
        serviceContext.request(
            'get',
            '/api/space/page/get',
            {
                id: spaceId
            },
            ({ data }) => setSpaceData(data),
            () => undefined,
        )
    }, [])

    const handleJoin = () => {
        navigation.navigate("Checkout")
    }

    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.container}>
                <View style={styles.mainContent}>
                    <ImageBlock {...spaceData} />
                    <View style={[styles.hollowContainer, styles.spaceTitleContainer]}>
                        <Text style={styles.spaceTitle}>{spaceData?.pageData?.heading}</Text>
                        <Text style={styles.spaceDescription}>{spaceData?.pageData?.subHeading}</Text>
                        <Divider size={'m'} />
                        <View style={styles.spaceTitleButtonRow}>
                            <PrimaryButton
                                onClick={handleJoin}
                                text={"Join Now"}
                                height={36}
                                fontSize={20}
                                width={128}
                            />
                        </View>
                    </View>

                    <View style={styles.mainContentTextBlock}>
                        <View style={styles.textBlockSection}>
                            <Text style={styles.textBlockHeading}>Highlights</Text>
                            <View style={styles.textBlockInfoTextContainer}>
                                {spaceData?.pageData?.highlights?.map(highlight => {
                                    return (
                                        <Text style={styles.textBlockInfoText}><Entypo name="dot-single" />{highlight}</Text>
                                    )
                                })}
                            </View>
                        </View>
                        <View style={styles.textBlockHorizontalDivider} />
                        <View style={styles.textBlockSection}>
                            <Text style={styles.textBlockHeading}>Description</Text>
                            <View style={styles.textBlockInfoTextContainer}>
                                <Text style={styles.textBlockInfoText}>{spaceData?.pageData?.description}</Text>
                            </View>

                        </View>
                    </View>
                    <Divider size={'l'} />
                    <View style={styles.mainContentPricingBlock}>
                        <View style={styles.pricingBlockDescriptionContainer}>
                            <Text style={styles.pricingBlockDescriptionData}>{spaceData?.space?.consumer}</Text>
                            <Text style={styles.pricingBlockDescription}>Subscribers</Text>
                        </View>
                        <View style={styles.pricingBlockDescriptionContainer}>
                            <Text style={styles.pricingBlockDescriptionData}>{spaceData?.space?.streams}</Text>
                            <Text style={styles.pricingBlockDescription}>Posts</Text>
                        </View>
                        <View style={[styles.hollowContainer, styles.pricingBlockPriceContainer]}>
                            <Text style={styles.pricingBlockPrice}>
                                <Text style={styles.pricingBlockPriceValue}>₹ {spaceData?.space?.price}</Text>
                            </Text>
                        </View>
                        <Text style={styles.pricingBlockCancelAnytime}>Cancel Anytime.</Text>
                        <PrimaryButton
                            onClick={handleJoin}
                            text={"Join Now"}
                            height={36}
                            fontSize={20}
                            width={128}
                        />
                        <Divider size={'m'} />
                    </View>
                </View>
                <Divider size={'xl'} />
                <SecondaryButton
                    onClick={() => undefined}
                    text={"Share"}
                    height={36}
                    fontSize={20}
                    width={128}
                />
                <View style={[styles.hollowContainer, styles.socialMediaContainer]}>
                    <Text style={styles.socialMediaContainerHeading}>Follow me on</Text>
                    <View style={styles.socialMediaIconContainer}>
                        <Pressable
                            android_ripple={{ color: colors.AND_RIPPLE[theme], foreground: true }}
                        >
                            <Image
                                style={styles.socialMediaIcon}
                                source={require('../../assets/LinkedIn.png')}
                                resizeMode="cover"
                            />
                        </Pressable>
                        <Pressable
                            android_ripple={{ color: colors.AND_RIPPLE[theme], foreground: true }}
                        >
                            <Image
                                style={styles.socialMediaIcon}
                                source={require('../../assets/Instagram.png')}
                                resizeMode="cover"
                            />
                        </Pressable>
                        <Pressable
                            android_ripple={{ color: colors.AND_RIPPLE[theme], foreground: true }}
                        >
                            <Image
                                style={styles.socialMediaIcon}
                                source={require('../../assets/Twitter.png')}
                                resizeMode="cover"
                            />
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={styles.footerContainer}>
                <Image
                    style={styles.footerImage}
                    source={require('../../assets/Logo.png')}
                    resizeMode="cover"
                />
                <View style={styles.footerHeading}>
                    <Text style={styles.footerHeadingTop}>Powered By</Text>
                    <Text style={styles.footerHeadingMain}><Text style={styles.footerHeadingMainCapital}>B</Text>ALJEETKODE</Text>
                </View>
                <View style={styles.footerCopyright}>
                    <Text style={styles.footerCopyrightText}>Copyright ©{'\n'}baljeetkode.com{'\n'}2023</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const generateStyles = THEME => StyleSheet.create({
    scroll: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: colors.BG_COLOR[THEME],
    },
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    hollowContainer: {
        borderColor: colors.TEXT_COLOR_ALT[THEME],
        borderWidth: 1,
        borderRadius: 8,
    },
    spaceTitleContainer: {
        alignItems: 'center',
        marginVertical: 16,
        padding: 16,
    },
    spaceTitle: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        color: colors.TEXT_COLOR[THEME],
    },
    spaceDescription: {
        fontSize: 16,
        textAlign: 'center',
        color: colors.TEXT_COLOR[THEME],
        paddingVertical: 8,
    },
    spaceTitleButtonRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
    },
    mainContent: {
        width: '100%',
    },
    mainContentTextBlock: {
        borderRadius: 8,
        backgroundColor: colors.BG_COLOR_MODAL[THEME],
        alignItems: 'center',
        padding: 12,
    },
    mainContentPricingBlock: {
        borderRadius: 8,
        padding: 12,
        backgroundColor: colors.BG_COLOR_MODAL[THEME],
        width: '100%',
        alignItems: 'center',
    },
    textBlockSection: {
        width: '100%',
    },
    textBlockHeading: {
        color: colors.TEXT_COLOR[THEME],
        fontWeight: '500',
    },
    textBlockInfoTextContainer: {
        paddingVertical: 8,
    },
    textBlockInfoText: {
        color: colors.TEXT_COLOR[THEME],
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBlockHorizontalDivider: {
        width: '100%',
        height: 1,
        marginVertical: 8,
        backgroundColor: colors.TEXT_COLOR_ALT[THEME],
    },
    pricingBlockDescriptionContainer: {
        flexDirection: 'row',
        width: '100%',
        marginLeft: '50%',
        paddingVertical: 4,
    },
    pricingBlockDescription: {
        color: colors.TEXT_COLOR_LIGHT[THEME],
        fontSize: 18,
        fontWeight: '400',
    },
    pricingBlockDescriptionData: {
        width: 64,
        fontSize: 18,
        fontWeight: '700',
        color: colors.PRIMARY_COLOR,
    },
    pricingBlockPriceContainer: {
        width: '70%',
        paddingVertical: 8,
        marginTop: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pricingBlockPrice: {
        color: colors.TEXT_COLOR_LIGHT[THEME],
        fontSize: 20,
        fontWeight: '700',
    },
    pricingBlockPriceValue: {
        width: 64,
        fontSize: 20,
        fontWeight: '700',
        color: colors.PRIMARY_COLOR,
    },
    pricingBlockCancelAnytime: {
        color: colors.TEXT_COLOR_LIGHT[THEME],
        fontSize: 14,
        fontWeight: '300',
        marginTop: 4,
        marginBottom: 16,
    },
    socialMediaContainer: {
        width: '100%',
        marginVertical: 32,
    },
    socialMediaContainerHeading: {
        color: colors.TEXT_COLOR_LIGHT[THEME],
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        marginVertical: 8,
    },
    socialMediaIconContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 16,
    },
    socialMediaIcon: {
        height: 32,
        width: 32,
    },
    footerContainer: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: colors.BG_COLOR_MODAL[THEME],
        height: 64,
        alignItems: 'center',
    },
    footerImage: {
        height: 48,
        width: 48,
        marginHorizontal: 8,
    },
    footerHeading: {
        height: '100%',
        justifyContent: 'center',
    },
    footerHeadingTop: {
        color: colors.TEXT_COLOR_ALT[THEME],
        fontSize: 14,
        lineHeight: 14,
        marginBottom: 4,
        fontWeight: '300',
    },
    footerHeadingMain: {
        color: colors.PRIMARY_COLOR,
        fontSize: 16,
        lineHeight: 28,
        fontWeight: '500',
    },
    footerHeadingMainCapital: {
        fontSize: 28,
        lineHeight: 28,
    },
    footerCopyright: {
        justifyContent: 'flex-end',
        marginHorizontal: 8,
        paddingBottom: 8,
        height: '100%',
        flex: 1,
    },
    footerCopyrightText: {
        color: colors.TEXT_COLOR_ALT[THEME],
        fontWeight: '300',

        textAlign: 'right',
        paddingLeft: 8,
    },
})