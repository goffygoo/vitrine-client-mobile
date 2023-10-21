import { createDrawerNavigator } from '@react-navigation/drawer';
import Space from './Space';

const Drawer = createDrawerNavigator();

export default function SpaceDrawer({ route, navigation }) {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Space 1" component={Space} />
        </Drawer.Navigator>
    )
}