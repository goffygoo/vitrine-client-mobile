import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import SpacesPage from './SpacesPage';
import LandingPage from './LandingPage';
import ProfilePage from './ProfilePage';
import CalendarPage from './CalendarPage';
import { useContext, useEffect } from "react";
import { ServiceContext } from "../../util/context/serviceContext";
import { useDispatch } from "react-redux";
import { setSpacesList, setSpacesListLoading } from "../../redux/spacesReducer";

const BottomTab = createBottomTabNavigator();

export default function Home({ route, navigation }) {
    const serviceContext = useContext(ServiceContext);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSpacesListLoading());
        serviceContext.request(
            'get',
            '/api/consumer/getAllSpaces',
            {},
            ({ data }) => dispatch(setSpacesList(data.spaces)),
            () => undefined
        )
    }, [])
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
                initialRouteName='LandingPage'
                backBehavior='initialRoute'
            >
                <BottomTab.Screen
                    name="SpacesPage"
                    component={SpacesPage}
                    options={{
                        tabBarIcon: (({ focused, color, size }) => {
                            let iconName = focused ? 'albums' : 'albums-outline';
                            return <Ionicons name={iconName} size={size} color={color} />
                        })
                    }}
                />

                <BottomTab.Screen
                    name="LandingPage"
                    component={LandingPage}
                    options={{
                        tabBarIcon: (({ focused, color, size }) => {
                            let iconName = focused ? 'home' : 'home-outline';
                            return <Ionicons name={iconName} size={size} color={color} />
                        })
                    }}
                />

                <BottomTab.Screen
                    name="ProfilePage"
                    component={ProfilePage}
                    options={{
                        tabBarIcon: (({ focused, color, size }) => {
                            let iconName = focused ? 'person' : 'person-outline';
                            return <Ionicons name={iconName} size={size} color={color} />
                        })
                    }}
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