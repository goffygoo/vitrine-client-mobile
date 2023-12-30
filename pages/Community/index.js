import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from "../../redux/settingReducer";
import { useContext, useEffect, useMemo, useState } from "react";
import colors from '../../colors.json';
import Header from "./Header";
import TextInputBox from "../../components/widgets/input/TextInputBox";
import PrimaryButton from "../../components/widgets/buttons/PrimaryButton";
import { FontAwesome } from '@expo/vector-icons';
import SpaceCard from "./SpaceCard";
import Divider from "../../components/widgets/Divider";
import { ServiceContext } from "../../util/context/serviceContext";
import { showToast } from "../../components/widgets/Toast";
import GlassButton from "../../components/widgets/buttons/GlassButton";

export default function Community({ route, navigation }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    const [searchText, setSearchText] = useState('');
    const [featured, setFeatured] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchTriggered, setSearchTriggered] = useState(false);

    const serviceContext = useContext(ServiceContext);

    useEffect(() => {
        serviceContext.request(
            'get',
            '/api/community/space/featured',
            {},
            ({ data }) => setFeatured(data),
            () => undefined,
        )
    }, [])

    const handleSearch = () => {
        if (searchText <= 3) {
            showToast('Enter more than 3 letters');
            return;
        };
        serviceContext.request(
            'get',
            '/api/community/space/search',
            {
                query: searchText
            },
            ({ data }) => {
                setSearchTriggered(true);
                setSearchResults(data);
            },
            () => undefined,
        )
    }

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
                            onSubmitEditing={() => handleSearch(searchText)}
                        />
                    </View>
                    <PrimaryButton
                        onClick={handleSearch}
                        text={<FontAwesome name="search" size={24} />}
                        height={40}
                        width={64}
                    />
                </View>
                <View style={styles.searchResultsContainer}>
                    {
                        searchTriggered === true ?
                            <>
                                {
                                    searchResults.map(page => {
                                        return (
                                            <>
                                                <Divider size={'m'} />
                                                <SpaceCard
                                                    navigation={navigation}
                                                    {...page}
                                                />
                                                <Divider size={'m'} />
                                            </>
                                        )
                                    })
                                }
                                {
                                    searchResults.length === 0 &&
                                    <View style={styles.searchResultsDescriptionContainer}>
                                        <Image
                                            style={styles.searchResultsDescriptionImage}
                                            source={require('../../assets/sad.png')}
                                            resizeMode="cover"
                                        />
                                        <Text style={styles.searchResultsDescription}>No results found</Text>
                                        <Divider size={'l'} />
                                        <GlassButton
                                            onClick={() => setSearchTriggered(false)}
                                            text={"Show featured"}
                                            height={24}
                                            fontSize={14}
                                        />
                                    </View>
                                }
                            </> :
                            <>
                                <Text style={styles.searchResultsHeading}>Featured</Text>
                                {
                                    featured.map(page => {
                                        return (
                                            <>
                                                <Divider size={'m'} />
                                                <SpaceCard
                                                    navigation={navigation}
                                                    {...page}
                                                />
                                                <Divider size={'m'} />
                                            </>
                                        )
                                    })
                                }
                            </>
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
    searchResultsDescriptionContainer: {
        alignItems: 'center',
    },
    searchResultsDescriptionImage: {
        height: 64,
        width: 64,
    },
    searchResultsDescription: {
        fontSize: 20,
        marginTop: 16,
        fontWeight: '500',
        color: colors.TEXT_COLOR_ALT[THEME],
    },
})