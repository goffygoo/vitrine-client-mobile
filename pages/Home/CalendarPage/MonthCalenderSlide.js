import { Text, View } from "react-native"

export default function MonthCalenderSlide({ year, month, fullCalendar }) {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Text>{month + '/' + year}</Text>
        </View>
    )
}
