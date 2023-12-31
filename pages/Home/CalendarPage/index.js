import { StyleSheet, Text, View } from "react-native";
import MonthCalendar from "../../../components/calendar/MonthCalendar";
import { useDispatch, useSelector } from "react-redux";
import { themeSelector } from '../../../redux/settingReducer'
import { useContext, useEffect, useMemo, useState } from "react";
import colors from '../../../colors.json';
import ToggleSwitch from "../../../components/widgets/input/ToggleSwitch";
import DayCalender from "../../../components/calendar/DayCalender";
import { calendarLastRequestSelector, calendarParsedEventsSelector, setAllEvents } from "../../../redux/calendarReducer";
import { ServiceContext } from "../../../util/context/serviceContext";
import { DAYS_LIST, MONTHS_LIST } from "../../../constants";

export default function CalendarPage({ route, navigation }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);
    const lastRequest = useSelector(calendarLastRequestSelector);
    const parsedEvents = useSelector(calendarParsedEventsSelector);
    const serviceContext = useContext(ServiceContext);
    const dispatch = useDispatch();

    const [dayView, setDayView] = useState(false);
    const [gotoDateData, setGotoDateData] = useState({});

    const toggleDayView = () => {
        setGotoDateData({});
        setDayView(val => !val);
    };

    useEffect(() => {
        if (lastRequest) return;
        serviceContext.request(
            'get',
            '/api/calendar/allEvents',
            {},
            ({ data }) => dispatch(setAllEvents(data.events)),
            () => undefined,
        )
    }, [])

    const getCalenderDataForDate = (year, month, date) => {
        const dateObject = new Date(year, month, date);
        const monthText = MONTHS_LIST[month];
        const daysText = `${date} ${monthText.slice(0, 3)}, ${DAYS_LIST[dateObject.getDay()].slice(0, 3)}`;
        return {
            year,
            month,
            date,
            monthText,
            daysText,
            title: daysText,
            fullSchedule: parsedEvents?.[year]?.[month]?.[date] ?? [],
        }
    }

    const getFullCalendar = (year, month) => {
        const now = new Date();

        let date = new Date(year, month, 1);
        let calendar = [], week = Array(7).fill(0).map(() => ({}));

        if (date.getDay() !== 0) {
            date.setDate(0);

            while (date.getDay() !== 6) {
                const index = date.getDay();
                week[index].date = date.getDate();
                week[index].isCurrent = false;
                week[index].isToday = (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate());
                week[index].events = (parsedEvents?.[year]?.[month]?.[week[index].date] ?? []).slice(0, 4).map(e => {
                    return {
                        title: e.title,
                        color: e.color,
                    }
                });

                date.setDate(date.getDate() - 1);
            }

            date = new Date(year, month, 1);
        }

        while (date.getMonth() === month) {
            const index = date.getDay();
            week[index].date = date.getDate();
            week[index].isCurrent = true;
            week[index].isToday = (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate());
            week[index].events = (parsedEvents?.[year]?.[month]?.[week[index].date] ?? []).slice(0, 4).map(e => {
                return {
                    title: e.title,
                    color: e.color,
                }
            });

            date.setDate(date.getDate() + 1);

            if (date.getDay() === 0) {
                calendar.push([...week]);
                week = Array(7).fill(0).map(() => ({}));
            }
        }

        if (date.getDay() !== 0) {
            while (date.getDay() !== 0) {
                const index = date.getDay();
                week[index].date = date.getDate();
                week[index].isCurrent = false;
                week[index].isToday = (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate());
                week[index].events = (parsedEvents?.[year]?.[month]?.[week[index].date] ?? []).slice(0, 4).map(e => {
                    return {
                        color: e.color,
                    }
                });

                date.setDate(date.getDate() + 1);
            }

            calendar.push([...week]);
        }

        return calendar;
    }

    const getCalenderData = (year, month) => {
        const monthText = MONTHS_LIST[month];
        return {
            year,
            month,
            title: `${monthText.slice(0, 3)}, ${year}`,
            fullCalendar: getFullCalendar(year, month),
        }
    }

    const handleMonthCellPress = ({
        date,
        month,
        year,
        isCurrent,
        rowIndex,
    }) => {
        const [derivedMonth, derivedYear] = isCurrent ?
            [month, year] : (
                rowIndex === 0 ? (
                    month === 0 ? [11, year - 1] : [month - 1, year]
                ) : (
                    month === 11 ? [0, year + 1] : [month + 1, year]
                )
            );
        setGotoDateData({
            gotoDate: date,
            gotoMonth: derivedMonth,
            gotoYear: derivedYear,
        });
        setDayView(val => !val);
    }

    return (
        <View style={styles.container}>
            {
                lastRequest ?
                    <>
                        <View style={styles.headerRow}>
                            <Text style={styles.headerRowText}>Daily View</Text>
                            <ToggleSwitch
                                value={dayView}
                                onValueChange={toggleDayView}
                            />
                        </View>
                        {
                            dayView ?
                                <DayCalender
                                    getCalenderData={getCalenderDataForDate}
                                    {...gotoDateData}
                                /> :
                                <MonthCalendar
                                    getCalenderData={getCalenderData}
                                    cellPress={handleMonthCellPress}
                                />
                        }
                    </>
                    : <Text style={styles.loader}>Loading</Text>
            }
        </View>
    )
}

const generateStyles = THEME => StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        paddingTop: 32,
        backgroundColor: colors.BG_COLOR[THEME],
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginBottom: 16,
    },
    headerRowText: {
        fontSize: 16,
        fontWeight: '500',
        marginHorizontal: 32,
        color: colors.TEXT_COLOR[THEME],
    },
    loader: {
        fontSize: 16,
        color: colors.TEXT_COLOR_LIGHT[THEME],
    },
})