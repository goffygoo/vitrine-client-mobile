import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from '../../../redux/settingReducer';
import { useMemo } from "react";
import colors from '../../../colors.json';
import SectionBlock from "./SectionBlock";
import ImageBlock from "./ImageBlock";
import TipModal from "../../../components/widgets/TipModal";

export default function ProfilePage({ route, navigation }) {
    const theme = useSelector(themeSelector)
    const styles = useMemo(() => generateStyles(theme), [theme]);

    return (
        <View style={styles.container}>
            <ImageBlock />
            <View style={styles.pageContent}>
                <SectionBlock
                    title="User Profile"
                >
                    <TipModal />
                </SectionBlock>

                <SectionBlock
                    title="One on One Settings"
                >
                    <TipModal />
                </SectionBlock>
            </View>

        </View>
    )
}

const generateStyles = THEME => StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 16,
        backgroundColor: colors.BG_COLOR[THEME],
    },
    pageContent: {
        width: '80%',
        paddingTop: 16,
    }
})