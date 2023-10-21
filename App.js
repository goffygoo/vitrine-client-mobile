import 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TestPage from './pages/TestPage'
import Home from './pages/Home'
import Space from './pages/Space'
import SpaceDrawer from './pages/SpaceDrawer'
import store from './redux/store'
import { Provider } from 'react-redux'

console.error = () => undefined
console.warn = () => undefined

const Stack = createNativeStackNavigator()

function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
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