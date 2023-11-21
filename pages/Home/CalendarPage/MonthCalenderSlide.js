import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { themeSelector } from '../../../redux/settingReducer';
import { useMemo } from "react";
import colors from '../../../colors.json';

export default function MonthCalenderSlide({ year, month, fullCalendar }) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <View style={styles.headerFirstCell}>
                    <Text style={styles.headerCellText}>
                        Sun
                    </Text>
                </View>
                <View style={styles.headerCell}>
                    <Text style={styles.headerCellText}>
                        Mon
                    </Text>
                </View>
                <View style={styles.headerCell}>
                    <Text style={styles.headerCellText}>
                        Tue
                    </Text>
                </View>
                <View style={styles.headerCell}>
                    <Text style={styles.headerCellText}>
                        Wed
                    </Text>
                </View>
                <View style={styles.headerCell}>
                    <Text style={styles.headerCellText}>
                        Thu
                    </Text>
                </View>
                <View style={styles.headerCell}>
                    <Text style={styles.headerCellText}>
                        Fri
                    </Text>
                </View>
                <View style={styles.headerCell}>
                    <Text style={styles.headerCellText}>
                        Sat
                    </Text>
                </View>
            </View>
            {
                fullCalendar.map((row, rowIndex) => {
                    return (
                        <View style={styles.tableRow}>
                            {
                                row.map((cell, cellIndex) => {
                                    return (
                                        <View
                                            style={[
                                                cellIndex === 0 ? styles.tableFirstCell : styles.tableCell, 
                                            ]}
                                        >
                                            <Text 
                                            style={[
                                                styles.tableCellText,
                                                !cell.isCurrent ? styles.tableCellTextFade : {},
                                                cell.isToday ? styles.tableCellTextToday : {},
                                            ]}
                                            >
                                                {cell.date}
                                            </Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    )
                })
            }
        </View>
    )
}

const generateStyles = THEME => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    headerRow: {
        height: 48,
        width: '100%',
        flexDirection: 'row',
    },
    tableRow: {
        height: 64,
        width: '100%',
        flexDirection: 'row',
    },
    headerFirstCell: {
        flex: 1,
        borderTopWidth: 1,
        borderColor: colors.BG_COLOR_MODAL[THEME],
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerCell: {
        flex: 1,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderColor: colors.BG_COLOR_MODAL[THEME],
        alignItems: 'center',
        justifyContent: 'center',
    },
    tableFirstCell: {
        flex: 1,
        borderTopWidth: 1,
        borderColor: colors.BG_COLOR_MODAL[THEME],
        alignItems: 'flex-end',
    },
    tableCell: {
        flex: 1,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderColor: colors.BG_COLOR_MODAL[THEME],
        alignItems: 'flex-end',
    },
    headerCellText: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.TEXT_COLOR[THEME],
    },
    tableCellText: {
        fontSize: 14,
        fontWeight: '500',
        padding: 2,
        color: colors.TEXT_COLOR[THEME],
    },
    tableCellTextFade: {
        color: colors.TEXT_COLOR_LIGHT[THEME],
    },
    tableCellTextToday: {
        color: colors.PRIMARY_COLOR,
        fontWeight: '700',
    }
})