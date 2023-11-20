import { Text, View } from "react-native"

export default function DayCalenderSlide({
    year, month, date, monthText, daysText, title, fullSchedule
}) {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Text>{date + '/' + month}</Text>
        </View>
    )
}