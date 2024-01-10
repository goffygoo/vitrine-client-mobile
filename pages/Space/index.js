import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ChatPage from './ChatPage';
import SpacePage from './SpacePage';
import CalendarPage from './CalendarPage';
import { useContext, useEffect } from "react";
import { ServiceContext } from "../../util/context/serviceContext";
import { useDispatch, useSelector } from "react-redux";
import { activeSpaceSelector, setSpacePosts, spaceRequestSelector } from "../../redux/spacesReducer";

const BottomTab = createBottomTabNavigator();

export default function Space({ route, navigation }) {
    const dispatch = useDispatch();
    const serviceContext = useContext(ServiceContext);

    const spaceId = useSelector(activeSpaceSelector);
    const lastRequest = useSelector(spaceRequestSelector(spaceId));

    useEffect(() => {
        if ((Date.now() - lastRequest) <= 1000 * 60 * 3) return;
        serviceContext.request(
            'post',
            '/api/space/stream/getPosts',
            {
                spaceId
            },
            ({ data }) => {
                dispatch(setSpacePosts({ spaceId, posts: data.posts }));
            },
            () => undefined
        )
    }, [spaceId]);

    return (
        <View style={styles.container}>
            <BottomTab.Navigator
                screenOptions={() => ({
                    tabBarActiveTintColor: 'white',
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: {
                        borderColor: 'white',
                        backgroundColor: 'black',
                    },
                    headerShown: false,
                    tabBarShowLabel: false,
                })}
                initialRouteName='SpacePage'
                backBehavior='initialRoute'
            >
                <BottomTab.Screen
                    name="ChatPage"
                    component={ChatPage}
                    options={{
                        tabBarIcon: (({ focused, color, size }) => {
                            let iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                            return <Ionicons name={iconName} size={size} color={color} />
                        })
                    }}
                    initialParams={route.params}
                />

                <BottomTab.Screen
                    name="SpacePage"
                    component={SpacePage}
                    options={{
                        tabBarIcon: (({ focused, color, size }) => {
                            let iconName = focused ? 'ios-reader' : 'ios-reader-outline';
                            return <Ionicons name={iconName} size={size} color={color} />
                        })
                    }}
                    initialParams={route.params}
                />

                <BottomTab.Screen
                    name="CalendarPage"
                    component={CalendarPage}
                    options={{
                        tabBarIcon: (({ focused, color, size }) => {
                            let iconName = focused ? 'calendar' : 'calendar-outline';
                            return <Ionicons name={iconName} size={size} color={color} />
                        })
                    }}
                    initialParams={route.params}
                />
            </BottomTab.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})