import { useState } from "react";
import Popup from "./Popup";
import TextInputBox from "../../../../components/widgets/input/TextInputBox";
import { StyleSheet, View } from "react-native";
import Divider from "../../../../components/widgets/Divider";

export default function SocialMediaPopup({ close }) {
    const [linkedin, setLinkedin] = useState('');
    const [instagram, setInstagram] = useState('');
    const [twitter, setTwitter] = useState('');

    return (
        <Popup
            close={close}
            title={'Update Socials'}
            onSubmit={() => undefined}
        >
            <View style={styles.popupContent}>
                <Divider size={'m'} />
                <TextInputBox
                    label={"LinkedIn"}
                    value={linkedin}
                    onChange={(e) => setLinkedin(e)}
                    placeholder={"vineet-oli"}
                    size={"expand"}
                    type={'light'}
                />
                <Divider size={'m'} />
                <TextInputBox
                    label={"Instagram"}
                    value={instagram}
                    onChange={(e) => setInstagram(e)}
                    placeholder={"oli.vineet"}
                    size={"expand"}
                    type={'light'}
                />
                <Divider size={'m'} />
                <TextInputBox
                    label={"Twitter"}
                    value={twitter}
                    onChange={(e) => setTwitter(e)}
                    placeholder={"baljeetkode"}
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