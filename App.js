import 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TestPage from './pages/TestPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Home from './pages/Home'
import SpaceDrawer from './pages/SpaceDrawer'
import store from './redux/store'
import { Provider } from 'react-redux'

const Stack = createNativeStackNavigator()

function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="SignupPage" component={SignupPage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="TestPage" component={TestPage} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Space" component={SpaceDrawer} />
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