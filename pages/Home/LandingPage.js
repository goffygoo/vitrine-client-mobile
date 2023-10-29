import { Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from '../../redux/settingReducer';
import { useMemo } from "react";
import colors from '../../colors.json';
import UpcomingTile from "../../components/LandingPage/UpcomingTile";
import Banner from "../../components/LandingPage/Banner";

export default function LandingPage({ route, navigation }) {
    const theme = useSelector(themeSelector)
    const styles = useMemo(() => generateStyles(theme), [theme]);

    return (
        <View style={styles.container}>
            <View style={styles.bannerContainer}>
                <Text style={styles.bannerStatus}>Live Now</Text>
                <Banner />
            </View>

            <View style={styles.upcomingSection}>
                <Text style={styles.heading}>Upcoming Events</Text>

                <View style={styles.upcomingSectionRow}>
                    <UpcomingTile />
                    <UpcomingTile />
                </View>
                <View style={styles.upcomingSectionRow}>
                    <UpcomingTile />
                    <UpcomingTile />
                </View>
            </View>
        </View>
    )
}

const generateStyles = THEME => StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: colors.BG_COLOR[THEME],
        justifyContent: 'space-evenly',
    },
    bannerContainer: {
        alignItems: 'flex-end',
    },
    bannerStatus: {
        marginBottom: 4,
        marginRight: 4,
        paddingVertical: 4,
        paddingHorizontal: 8,
        fontSize: 16,
        fontWeight: '700',
        color: colors.WARNING_COLOR,
        backgroundColor: colors.BG_COLOR_MODAL[THEME],
        borderRadius: 2,
        elevation: 2,
        shadowColor: colors.TEXT_COLOR[THEME],
    },
    upcomingSection: {
        width: '90%',
    },
    upcomingSectionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: '600',
        color: colors.TEXT_COLOR[THEME],
    }
})