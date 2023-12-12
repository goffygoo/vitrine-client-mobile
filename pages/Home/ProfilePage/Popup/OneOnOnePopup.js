import { useState } from "react";
import Popup from "./Popup";
import Select from "../../../../components/widgets/input/Select";
import { StyleSheet, View } from "react-native";
import CheckBox from "../../../../components/widgets/input/CheckBox";

export default function OneOnOnePopup({ close }) {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [days, setDays] = useState([true, true, false, false, false, false, false])

    const daysStateChange = index => val => {
        return setDays(([...arr]) => {
            arr[index] = val;
            return arr;
        })
    }

    return (
        <Popup
            close={close}
            title={'One on One Settings'}
            onSubmit={() => undefined}
        >
            <View style={styles.popupContent}>
                <Select label={"Start Time"} value={endTime} placeholder={"Placeholder"} items={[
                    { label: '9:00am', value: '9:00am' },
                    { label: '9:30am', value: '9:30am' },
                    { label: '10:00am', value: '10:00am' },
                    { label: '10:30am', value: '10:30am' },
                    { label: '11:00am', value: '11:00am' },
                ]}
                    onChange={value => setEndTime(value)}
                    size={'expand'}
                    type={'light'}
                />
                <Select label={"End Time"} value={startTime} placeholder={"Placeholder"} items={[
                    { label: '9:00am', value: '9:00am' },
                    { label: '9:30am', value: '9:30am' },
                    { label: '10:00am', value: '10:00am' },
                    { label: '10:30am', value: '10:30am' },
                    { label: '11:00am', value: '11:00am' },
                ]}
                    onChange={value => setStartTime(value)}
                    size={'expand'}
                    type={'light'}
                />
                <View style={styles.checkBoxRow}>
                    <CheckBox checked={days[0]} onChange={val => daysStateChange(0)(val)} text={"Saturday"} width={112} />
                    <CheckBox checked={days[1]} onChange={val => daysStateChange(1)(val)} text={"Sunday"} width={112} />
                </View>
                <View style={styles.checkBoxRow}>
                    <CheckBox checked={days[2]} onChange={val => daysStateChange(2)(val)} text={"Monday"} width={112} />
                    <CheckBox checked={days[3]} onChange={val => daysStateChange(3)(val)} text={"Tuesday"} width={112} />
                </View>
                <View style={styles.checkBoxRow}>
                    <CheckBox checked={days[4]} onChange={val => daysStateChange(4)(val)} text={"Wednesday"} width={112} />
                    <CheckBox checked={days[5]} onChange={val => daysStateChange(5)(val)} text={"Thursday"} width={112} />
                </View>
                <View style={styles.checkBoxRow}>
                    <CheckBox checked={days[6]} onChange={val => daysStateChange(6)(val)} text={"Friday"} width={112} />
                </View>
            </View>
        </Popup>
    )
}

const styles = StyleSheet.create({
    popupContent: {
        alignItems: 'center',
        marginVertical: 16,
    },
    checkBoxRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 6,
    }
})