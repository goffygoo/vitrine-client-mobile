import { Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Animated, { Easing, runOnJS, useSharedValue, withTiming } from "react-native-reanimated";
import { Directions, Gesture, GestureDetector } from "react-native-gesture-handler";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { themeSelector } from "../../redux/settingReducer";
import colors from '../../colors.json';

const WIDTH = 350;
const HORIZONTAL_MARGIN = 50;
const VERTICAL_MARGIN = 10;

export default function CalenderSlider({
    SliderChild,
    cellPress = () => undefined,
    sliderData,
    addItemFront,
    addItemBack,
    squareOne,
    edgesFill,
    HEIGHT = 400,
    INNER_HEIGHT,
}) {
    const theme = useSelector(themeSelector);
    const styles = useMemo(() => generateStyles(theme), [theme]);

    const translateX = useSharedValue(0);
    const [activeAnimation, setActiveAnimation] = useState(false);
    const [leftCoordinate, setLeftCoordinate] = useState([-(HORIZONTAL_MARGIN + WIDTH), 0, (HORIZONTAL_MARGIN + WIDTH)])

    const rightCallback = (fill) => {
        setLeftCoordinate(arr => {
            const newArr = [...arr];
            const newValue = newArr[0] - (WIDTH + HORIZONTAL_MARGIN);
            newArr.unshift(newValue);
            newArr.pop();
            return newArr;
        })

        if (fill) edgesFill();
        else addItemFront();

        setActiveAnimation(false);
    }

    const leftCallback = (fill) => {
        setLeftCoordinate(arr => {
            const newArr = [...arr];
            const newValue = newArr[2] + (WIDTH + HORIZONTAL_MARGIN);
            newArr.push(newValue);
            newArr.shift();
            return newArr;
        })

        if (fill) edgesFill();
        else addItemBack();

        setActiveAnimation(false);
    }

    const moveRight = (fill) => {
        if (activeAnimation) return;
        setActiveAnimation(true);

        translateX.value = withTiming(translateX.value + (WIDTH + HORIZONTAL_MARGIN), {
            duration: 500,
            easing: Easing.linear
        }, () => {
            runOnJS(rightCallback)(fill)
        })
    }

    const moveLeft = (fill) => {
        if (activeAnimation) return;
        setActiveAnimation(true);

        translateX.value = withTiming(translateX.value - (WIDTH + HORIZONTAL_MARGIN), {
            duration: 500,
            easing: Easing.linear
        }, () => {
            runOnJS(leftCallback)(fill)
        })
    }

    const rightFling = Gesture.Fling().direction(Directions.RIGHT)
        .onStart(runOnJS(_e => moveRight()));
    const leftFling = Gesture.Fling().direction(Directions.LEFT)
        .onStart(runOnJS(_e => moveLeft()));
    const flingGesture = Gesture.Simultaneous(rightFling, leftFling);

    const moveToToday = () => {
        const swipeLeftDirection = squareOne();

        if (swipeLeftDirection === undefined) return;

        if (swipeLeftDirection) moveLeft(true)
        else moveRight(true);
    }

    return (
        <View>
            <GestureDetector gesture={flingGesture}>
                <View style={{
                    height: HEIGHT + 2 * VERTICAL_MARGIN,
                    width: WIDTH,
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}>
                    <View
                        style={{
                            height: HEIGHT,
                            width: 0,
                        }}
                    >
                        {
                            leftCoordinate.map((left, index) => {
                                return (
                                    <Animated.View
                                        style={{
                                            ...(INNER_HEIGHT && { height: INNER_HEIGHT }),
                                            width: WIDTH,
                                            position: 'absolute',
                                            borderColor: colors.BG_COLOR_MODAL[theme],
                                            borderWidth: 2,
                                            borderRadius: 8,
                                            overflow: 'hidden',
                                            left,
                                            top: 0,
                                            transform: [{ translateX: translateX }],
                                        }}
                                    >
                                        <View style={styles.cardHeaderRow}>
                                            <Pressable onPress={() => moveRight()}>
                                                <AntDesign name="left" size={24} color={colors.TEXT_COLOR[theme]} />
                                            </Pressable>
                                            <Text style={styles.cardHeaderText}>{sliderData[index].title}</Text>
                                            <Pressable onPress={() => moveLeft()}>
                                                <AntDesign name="right" size={24} color={colors.TEXT_COLOR[theme]} />
                                            </Pressable>
                                            <View style={styles.todayButton}>
                                                <Pressable
                                                    style={styles.todayButtonPressable}
                                                    onPress={() => moveToToday()}
                                                >
                                                    <Text style={styles.todayButtonText}>Today</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                        <SliderChild {...sliderData[index]} cellPress={cellPress} />
                                    </Animated.View>
                                )
                            })
                        }
                    </View>
                </View>
            </GestureDetector>
        </View>
    )
}

const generateStyles = THEME => StyleSheet.create({
    cardHeaderRow: {
        flexDirection: 'row',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardHeaderText: {
        fontSize: 16,
        paddingHorizontal: 16,
        fontWeight: '500',
        color: colors.TEXT_COLOR[THEME],
    },
    todayButton: {
        width: 96,
        height: 48,
        overflow: 'hidden',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        right: 0,
    },
    todayButtonPressable: {
        width: 64,
        height: 28,
        borderWidth: 2,
        borderRadius: 2,
        borderColor: colors.BG_COLOR_MODAL[THEME],
        justifyContent: 'center',
        alignItems: 'center',
    },
    todayButtonText: {
        color: colors.PRIMARY_COLOR,
        fontSize: 12,
        fontWeight: '500',
    },
})
