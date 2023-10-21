import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import ChatPage from './ChatPage';
import { Text } from 'react-native';

const Drawer = createDrawerNavigator();


function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <Text>● Captain Baljeet</Text>
        <Text>● Crazy Alina</Text>
        <Text>● Baljeet Badmash</Text>
        <Text>● Jaggu Bander</Text>
      </DrawerContentScrollView>
    );
  }

export default function SpaceDrawer({ route, navigation }) {
    return (
        <Drawer.Navigator drawerContent={CustomDrawerContent} screenOptions={{
            drawerPosition: 'right',
            headerShown: false,
        }}>
            <Drawer.Screen name={"Chat"} component={ChatPage} />
        </Drawer.Navigator>
    )
}