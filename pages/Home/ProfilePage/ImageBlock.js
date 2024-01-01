import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { themeSelector } from '../../../redux/settingReducer';
import { useContext, useMemo, useState } from "react";
import colors from '../../../colors.json';
import ImagePicker from 'react-native-image-crop-picker';
import PrimaryButton from "../../../components/widgets/buttons/PrimaryButton";
import SecondaryButton from "../../../components/widgets/buttons/SecondaryButton";
import { file_server_request } from "../../../util/service";
import { profilePictureSelector, setProfilePicture } from "../../../redux/profileReducer";
import { getFileUrl } from "../../../util/helper";
import { ServiceContext } from "../../../util/context/serviceContext";

export default function ImageBlock() {
    const theme = useSelector(themeSelector)
    const styles = useMemo(() => generateStyles(theme), [theme]);
    const serviceContext = useContext(ServiceContext);
    const dispatch = useDispatch();

    const profilePicture = useSelector(profilePictureSelector);
    const [img, setImg] = useState();
    const [imgMime, setImgMime] = useState();

    const openImageUploadPopUp = () => {
        ImagePicker.openPicker({
            width: 600,
            height: 600,
            cropping: true,
            cropperToolbarWidgetColor: colors.PRIMARY_COLOR,
            cropperStatusBarColor: colors.BG_COLOR[theme],
            cropperToolbarColor: colors.BG_COLOR[theme],
            cropperToolbarWidgetColor: colors.PRIMARY_COLOR,
            cropperTintColor: colors.PRIMARY_COLOR,
            showCropGuidelines: false,
            cropperActiveWidgetColor: colors.PRIMARY_COLOR,
            compressImageMaxHeight: 600,
            compressImageMaxWidth: 600,
        }).then(image => {
            setImg(image.path);
            setImgMime(image.mime);
        });
    }


    const handleDiscard = () => {
        setImg(undefined);
    }

    const updateProfile = (filename) => {
        serviceContext.request(
            'post',
            '/api/consumer/profile/update',
            {
                profilePicture: filename
            },
            ({ data }) => {
                dispatch(setProfilePicture(filename));
                setImg(undefined);
            },
            () => undefined,
        )
    }

    const handleSubmit = () => {
        if (!img) return;

        const formData = new FormData();
        formData.append('file', {
            name: 'temp' + img.slice(img.lastIndexOf('.')),
            type: imgMime,
            uri: img,
        });

        file_server_request(
            "post",
            "/uploadFile",
            formData,
            ({ data: { filename } }) => updateProfile(filename),
            () => undefined
        );
    }

    return (
        <View style={styles.container}>
            {img && (<Text style={styles.warnText}>Pending Changes</Text>)}

            <View style={styles.profileImageContainer}>
                <Pressable
                    android_ripple={{ color: colors.AND_RIPPLE[theme], foreground: true }}
                    onPress={openImageUploadPopUp}
                >
                    <Image
                        source={
                            img ?
                                { uri: img } :
                                { uri: getFileUrl(profilePicture) } 
                        }
                        style={styles.profileImage}
                    />
                </Pressable>
            </View>
            {img && (
                <View style={styles.buttonRow}>
                    <SecondaryButton
                        onClick={handleDiscard}
                        text={'Discard'}
                        fontSize={14}
                        height={32}
                    />
                    <PrimaryButton
                        onClick={handleSubmit}
                        text={'Change Picture'}
                        fontSize={14}
                        height={32}
                    />
                </View>
            )}
        </View>
    )
}

const generateStyles = THEME => StyleSheet.create({
    container: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    warnText: {
        color: colors.WARNING_COLOR,
        paddingBottom: 8,
        fontSize: 16,
        fontWeight: '300',
    },
    banner: {
        height: 126,
        width: '100%',
        borderRadius: 8,
        overflow: "hidden",
    },
    bannerImage: {
        height: 126,
        alignItems: 'flex-end',
        paddingRight: 8,
        paddingTop: 8,
        justifyContent: 'flex-start',
    },
    profileImageContainer: {
        height: 100,
        width: 100,
        borderRadius: 100,
        borderColor: colors.FADE[THEME],
        borderWidth: 2,
        overflow: 'hidden',
    },
    profileImage: {
        height: 100,
        width: 100,
        resizeMode: 'cover',
    },
    buttonRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        paddingVertical: 8,
    }
})