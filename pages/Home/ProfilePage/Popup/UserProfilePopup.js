import { useContext, useState } from "react";
import Popup from "./Popup";
import TextInputBox from "../../../../components/widgets/input/TextInputBox";
import { StyleSheet, View } from "react-native";
import Divider from "../../../../components/widgets/Divider";
import { useDispatch, useSelector } from "react-redux";
import { profileNameSelector, setProfileName } from "../../../../redux/profileReducer";
import { ServiceContext } from "../../../../util/context/serviceContext";

export default function UserProfilePopup({ close }) {
    const serviceContext = useContext(ServiceContext);
    const dispatch = useDispatch();
    const prevName = useSelector(profileNameSelector);
    const [name, setName] = useState(prevName);

    const updateProfile = () => {
        serviceContext.request(
            'post',
            '/api/consumer/profile/update',
            {
                name
            },
            ({ data }) => {
                dispatch(setProfileName(name));
                close();
            },
            () => undefined,
        )
    }


    return (
        <Popup
            close={close}
            title={'Update Profile'}
            onSubmit={updateProfile}
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