import { StyleSheet, Text, View } from "react-native";
import MonthCalendar from "./MonthCalendar";
import { useSelector } from "react-redux";
import { themeSelector } from '../../../redux/settingReducer'
import { useMemo, useState } from "react";
import colors from '../../../colors.json';
import ToggleSwitch from "../../../components/widgets/input/ToggleSwitch";
import DayCalender from "./DayCalender";

export default function CalendarPage({ route, navigation }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    const [dayView, setDayView] = useState(false);
    const toggleDayView = () => setDayView(val => !val);

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text>Daily View</Text>
                <ToggleSwitch
                    value={dayView}
                    onValueChange={toggleDayView}
                />
            </View>
            {
                dayView ? <DayCalender /> : <MonthCalendar />
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
        justifyContent: 'center',
        backgroundColor: colors.BG_COLOR[THEME],
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})