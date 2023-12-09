import { useState } from "react";
import Popup from "./Popup";
import TextInputBox from "../../../../components/widgets/input/TextInputBox";
import { StyleSheet, View } from "react-native";
import Divider from "../../../../components/widgets/Divider";

export default function UserProfilePopup({ close }) {
    const [name, setName] = useState('');
    const [nameNew, setNameNew] = useState('');

    return (
        <Popup
            close={close}
            title={'Update Profile'}
            onSubmit={() => undefined}
        >
            <View style={styles.popupContent}>
                <Divider size={'m'} />
                <TextInputBox
                    label={"Name"}
                    value={name}
                    onChange={(e) => setName(e)}
                    placeholder={"Enter new name"}
                    size={"expand"}
                    type={'light'}
                />
                <Divider size={'m'} />
                <TextInputBox
                    label={"Name"}
                    value={nameNew}
                    onChange={(e) => setNameNew(e)}
                    placeholder={"Enter new name"}
                    size={"expand"}
                    type={'light'}
                />
                <Divider size={'m'} />
            </View>
        </Popup>
    )
}

const styles = StyleSheet.create({
    popupContent: {
        alignItems: 'center',
        marginVertical: 16,
    },
})