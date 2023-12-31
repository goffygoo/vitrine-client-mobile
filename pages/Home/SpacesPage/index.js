import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from "../../../redux/settingReducer";
import { useContext, useEffect, useMemo, useState } from "react";
import colors from '../../../colors.json';
import Tile from "./Tile";
import { ServiceContext } from "../../../util/context/serviceContext";
import _ from 'lodash'

export default function SpacesPage({ route, navigation }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);
    const serviceContext = useContext(ServiceContext);

    const [spaces, setSpaces] = useState([])

    useEffect(() => {
        serviceContext.request(
            'get',
            '/api/consumer/getAllSpaces',
            {},
            ({ data }) => setSpaces(data.spaces),
            () => undefined
        )
    }, [])


    return (
        <ScrollView style={styles.scrollContainer}>
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
                                            onClick={() => navigation.navigate('Space')}
                                        />
                                    )
                                }
                            </View>
                        )
                    })
                }
            </View>
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