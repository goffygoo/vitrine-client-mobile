import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { themeSelector } from "../../../redux/settingReducer";
import { useMemo } from "react";
import colors from '../../../colors.json';
import Tile from "./Tile";
import _ from 'lodash'
import Loader from "../../../components/widgets/Loader";
import { setActiveSpace, spacesListLoadingSelector, spacesListSelector } from "../../../redux/spacesReducer";

export default function SpacesPage({ route, navigation }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    const dispatch = useDispatch();
    const spaces = useSelector(spacesListSelector);
    const spacesLoading = useSelector(spacesListLoadingSelector);

    return (
        <ScrollView style={styles.scrollContainer}>
            {
                spacesLoading ?
                    <View style={{ height: 300, justifyContent: 'flex-end' }}>
                        <Loader />
                    </View>
                    :
                    <View style={styles.container}>
                        <Text style={styles.heading}>My Spaces</Text>
                        {
                            _.chunk(spaces, 2).map(chunk => {
                                return (
                                    <View style={styles.tileRow}>
                                        {
                                            chunk.map(space =>
                                                <Tile
                                                    {...space}
                                                    onClick={() => {
                                                        dispatch(setActiveSpace(space._id));
                                                        navigation.navigate('Space');
                                                    }}
                                                />
                                            )
                                        }
                                    </View>
                                )
                            })
                        }
                    </View>
            }
        </ScrollView>
    )
}

const generateStyles = THEME => StyleSheet.create({
    scrollContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: colors.BG_COLOR[THEME],
    },
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        paddingHorizontal: '5%',
        paddingVertical: 16,
        backgroundColor: colors.BG_COLOR[THEME],
    },
    heading: {
        fontSize: 28,
        marginVertical: 8,
        fontWeight: '600',
        color: colors.TEXT_COLOR[THEME],
    },
    tileRow: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 16,
        justifyContent: 'space-between',
    }
})