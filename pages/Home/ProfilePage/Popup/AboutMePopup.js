import { useState } from "react";
import Popup from "./Popup";
import TextInputArea from "../../../../components/widgets/input/TextInputArea";
import { StyleSheet, View } from "react-native";

export default function AboutMePopup({ close }) {
    const [bio, setBio] = useState('');

    return (
        <Popup
            close={close}
            title={'Update Bio'}
            onSubmit={() => undefined}
        >
            <View style={styles.popupContent}>
                <TextInputArea
                    label={"About Me"}
                    value={bio}
                    onChange={(e) => setBio(e)}
                    placeholder={"Write something about yourself..."}
                    size={"expand"}
                    type={'light'}
                />
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