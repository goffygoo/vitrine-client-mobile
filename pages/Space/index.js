import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import FormPage from './FormPage';
import ChatPage from './ChatPage';
import SpacePage from './SpacePage';
import ShelfPage from './ShelfPage';
import CalendarPage from './CalendarPage';

const BottomTab = createBottomTabNavigator();

export default function Space({ route, navigation }) {
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
                    name="FormPage"
                    component={FormPage}
                    options={{
                        tabBarIcon: (({ focused, color, size }) => {
                            let iconName = focused ? 'document' : 'document-outline';
                            return <Ionicons name={iconName} size={size} color={color} />
                        })
                    }}
                    initialParams={route.params}
                />

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
                    name="ShelfPage"
                    component={ShelfPage}
                    options={{
                        tabBarIcon: (({ focused, color, size }) => {
                            let iconName = focused ? 'file-tray-full' : 'file-tray-full-outline';
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