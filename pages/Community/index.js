import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from "../../redux/settingReducer";
import { useMemo, useState } from "react";
import colors from '../../colors.json';
import Header from "./Header";
import TextInputBox from "../../components/widgets/input/TextInputBox";
import PrimaryButton from "../../components/widgets/buttons/PrimaryButton";
import { FontAwesome } from '@expo/vector-icons';
import SpaceCard from "./SpaceCard";
import Divider from "../../components/widgets/Divider";

export default function Community({ route, navigation }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    const [searchText, setSearchText] = useState('');

    const handleSearch = () => { }

    return (
        <ScrollView style={styles.scroll}>
            <Header />
            <View style={styles.container}>
                <View style={styles.searchRow}>
                    <View style={styles.searchBar}>
                        <TextInputBox
                            value={searchText}
                            onChange={(v) => setSearchText(v)}
                            placeholder={'Search Spaces'}
                            type={'alt'}
                        />
                    </View>
                    <PrimaryButton
                        onClick={handleSearch}
                        text={<FontAwesome name="search" size={24} />}
                        height={40}
                    />
                </View>
                <View style={styles.searchResultsContainer}>
                    <Text style={styles.searchResultsHeading}>Featured</Text>
                    <Divider size={'m'} />
                    {
                        Array(6).fill(1).map(() => {
                            return (
                                <>
                                    <Divider size={'m'} />
                                    <SpaceCard
                                        navigation={navigation}
                                    />
                                    <Divider size={'m'} />
                                </>
                            )
                        })
                    }
                    <Divider size={'m'} />
                </View>
            </View>
        </ScrollView>
    )
}

const generateStyles = THEME => StyleSheet.create({
    scroll: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: colors.BG_COLOR[THEME],
    },
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    searchRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
    },
    searchBar: {
        flex: 1,
        backgroundColor: 'pink',
        height: 40,
        justifyContent: 'center',
        backgroundColor: colors.BG_COLOR_MODAL[THEME],
        marginHorizontal: 8,
        paddingHorizontal: 16,
        borderRadius: 24,
    },
    searchResultsContainer: {
        width: '100%',
        borderColor: colors.TEXT_COLOR_ALT[THEME],
        borderWidth: 1,
        borderRadius: 8,
        marginVertical: 16,
        padding: 16,
        overflow: 'hidden',
    },
    searchResultsHeading: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.TEXT_COLOR[THEME],
    },
})