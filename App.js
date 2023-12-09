import 'react-native-gesture-handler'
import { LogBox, SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TestPage from './pages/TestPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ForgetPasswordPage from './pages/ForgetPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import Home from './pages/Home'
import SpaceDrawer from './pages/SpaceDrawer'
import store from './redux/store'
import { Provider, useSelector } from 'react-redux'
import { themeSelector } from './redux/settingReducer';
import colors from './colors.json'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging';

// dev env only
console.warn = () => undefined;
console.error = () => undefined;

const Stack = createNativeStackNavigator();

function App() {
  LogBox.ignoreAllLogs(true); // dev env only
  const theme = useSelector(themeSelector);
  return (
    <>
      <StatusBar backgroundColor={colors.BG_COLOR[theme]} barStyle={`${theme === 'DARK' ? 'light' : 'dark'}-content`} />
      <SafeAreaView style={styles.container}>
        <NavigationContainer style={styles.container}>
          <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
            <Stack.Screen name="TestPage" component={TestPage} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="SignupPage" component={SignupPage} />
            <Stack.Screen name="ForgetPasswordPage" component={ForgetPasswordPage} />
            <Stack.Screen name="ResetPasswordPage" component={ResetPasswordPage} />
            <Stack.Screen name="Space" component={SpaceDrawer} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
})

const saveTokenToDatabase = (token) => {
  console.log("New Token ", token)
}

export default function Wrapper() {
  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        return saveTokenToDatabase(token);
      });

    return messaging().onTokenRefresh(token => {
      saveTokenToDatabase(token);
    });
  }, []);


  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <App />
      </GestureHandlerRootView>
    </Provider>
  )
}