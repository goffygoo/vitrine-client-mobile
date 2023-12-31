import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from '../../redux/settingReducer';
import { useMemo } from "react";
import colors from '../../colors.json';
import { getTimeStamp } from "../../util/helper";

export default function DayCalenderSlide({
    year, month, date, monthText, daysText, title, fullSchedule
}) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                <View style={styles.scrollContainer}>
                    {fullSchedule?.map(event => {
                        return (
                            <View style={styles.eventRow}>
                                <View style={[
                                    styles.colorBox,
                                    { backgroundColor: event.color }
                                ]} />
                                <View style={styles.eventRowText}>
                                    <Text style={styles.eventRowTitle}>{event.title}</Text>
                                    <Text style={styles.eventRowTiming}>{`${getTimeStamp(new Date(event.startTime))} - ${getTimeStamp(new Date(event.endTime))}`}</Text>
                                </View>
                            </View>
                        )
                    })}
                    {
                        !fullSchedule?.length && (
                            <Text style={styles.noEvents}>No Events</Text>
                        )
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const generateStyles = THEME => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    scroll: {
        width: '100%',
        height: 500,
        marginBottom: 16,
    },
    scrollContainer: {
        width: '100%',
        paddingHorizontal: '4%',
    },
    eventRow: {
        width: '100%',
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    colorBox: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    eventRowText: {
        paddingLeft: 16,
    },
    eventRowTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.TEXT_COLOR[THEME],
    },
    eventRowTiming: {
        fontSize: 14,
        fontWeight: '400',
        color: colors.INPUT_PLACEHOLDER[THEME],
    },
    noEvents: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 64,
        fontWeight: '300',
        color: colors.TEXT_COLOR_LIGHT[THEME],
    }
})