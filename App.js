import 'react-native-gesture-handler'
import { LogBox, StyleSheet } from 'react-native'
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
import { Provider } from 'react-redux'

// dev env only
console.warn = () => undefined;
console.error = () => undefined;

const Stack = createNativeStackNavigator();

function App() {
  LogBox.ignoreAllLogs(true); // dev env only
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="SignupPage" component={SignupPage} />
        <Stack.Screen name="ForgetPasswordPage" component={ForgetPasswordPage} />
        <Stack.Screen name="ResetPasswordPage" component={ResetPasswordPage} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Space" component={SpaceDrawer} />
        <Stack.Screen name="TestPage" component={TestPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
})

export default function Wrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}